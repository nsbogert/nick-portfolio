"""Lambda handler for the AI chat endpoint."""

import hashlib
import html
import json
import os
import re

import boto3

from knowledge_base import load_knowledge_base
from prompt import build_system_prompt
from rate_limiter import RateLimiter

# Initialize at cold start
KNOWLEDGE_BASE = load_knowledge_base()
SYSTEM_PROMPT = build_system_prompt(KNOWLEDGE_BASE)
TABLE_NAME = os.environ.get("RATE_LIMIT_TABLE", "nick-portfolio-rate-limits")
BEDROCK_MODEL = os.environ.get("BEDROCK_MODEL", "anthropic.claude-3-haiku-20240307-v1:0")
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")
MAX_MESSAGE_LENGTH = 500
MAX_HISTORY_LENGTH = 20

rate_limiter = RateLimiter(TABLE_NAME)
bedrock = boto3.client("bedrock-runtime", region_name="us-west-2")


def _cors_headers() -> dict:
    return {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
    }


def _response(status: int, body: dict) -> dict:
    return {
        "statusCode": status,
        "headers": {**_cors_headers(), "Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def _sanitize(text: str) -> str:
    """Sanitize user input: strip HTML, limit length, remove control chars."""
    text = html.escape(text.strip())
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)
    return text[:MAX_MESSAGE_LENGTH]


def _get_client_ip(event: dict) -> str:
    """Extract client IP from API Gateway event."""
    # HTTP API v2 format
    request_context = event.get("requestContext", {})
    http_info = request_context.get("http", {})
    ip = http_info.get("sourceIp", "unknown")
    return ip


def handler(event, context):
    """Main Lambda handler."""
    # Handle CORS preflight
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return _response(200, {})

    try:
        body = json.loads(event.get("body", "{}"))
    except json.JSONDecodeError:
        return _response(400, {"error": "Invalid JSON"})

    message = body.get("message", "").strip()
    session_id = body.get("session_id", "")
    history = body.get("history", [])

    if not message:
        return _response(400, {"error": "Message is required"})

    if not session_id:
        return _response(400, {"error": "Session ID is required"})

    # Sanitize
    message = _sanitize(message)
    if len(history) > MAX_HISTORY_LENGTH:
        history = history[-MAX_HISTORY_LENGTH:]

    # Rate limiting
    client_ip = _get_client_ip(event)
    rate_result = rate_limiter.check_and_increment(client_ip, session_id)

    if not rate_result["allowed"]:
        return _response(429, {
            "error": rate_result["reason"],
            "remaining_messages": 0,
        })

    # Build messages for Bedrock
    bedrock_messages = []
    for msg in history:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role in ("user", "assistant") and content:
            bedrock_messages.append({
                "role": role,
                "content": _sanitize(content) if role == "user" else content,
            })

    bedrock_messages.append({"role": "user", "content": message})

    # Call Bedrock
    try:
        response = bedrock.invoke_model(
            modelId=BEDROCK_MODEL,
            contentType="application/json",
            accept="application/json",
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1024,
                "system": SYSTEM_PROMPT,
                "messages": bedrock_messages,
            }),
        )

        result = json.loads(response["body"].read())
        assistant_text = result["content"][0]["text"]

        return _response(200, {
            "response": assistant_text,
            "session_id": session_id,
            "remaining_messages": rate_result["remaining_session"],
        })

    except Exception as e:
        print(f"Bedrock error: {e}")
        return _response(500, {"error": "AI service temporarily unavailable. Please try again."})
