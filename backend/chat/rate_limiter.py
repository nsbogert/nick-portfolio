"""DynamoDB-backed rate limiter with atomic increments and TTL."""

import hashlib
import time

import boto3
from botocore.exceptions import ClientError

SESSION_LIMIT = 10
DAILY_LIMIT = 50
SESSION_TTL_SECONDS = 3600  # 1 hour
DAILY_TTL_SECONDS = 86400  # 24 hours


def _hash_ip(ip: str) -> str:
    """SHA-256 hash an IP address for privacy."""
    return hashlib.sha256(ip.encode()).hexdigest()[:32]


class RateLimiter:
    def __init__(self, table_name: str):
        self.table = boto3.resource("dynamodb").Table(table_name)

    def check_and_increment(self, ip: str, session_id: str) -> dict:
        """Check rate limits and increment counters atomically.

        Returns dict with:
          - allowed: bool
          - reason: str if not allowed
          - remaining_session: int
          - remaining_daily: int
        """
        hashed_ip = _hash_ip(ip)
        now = int(time.time())

        # Check session limit
        session_count = self._increment(
            pk=f"session#{session_id}",
            sk="count",
            ttl=now + SESSION_TTL_SECONDS,
        )

        if session_count > SESSION_LIMIT:
            return {
                "allowed": False,
                "reason": "Session limit reached. Refresh or contact Nick directly.",
                "remaining_session": 0,
                "remaining_daily": -1,
            }

        # Check daily IP limit
        today = time.strftime("%Y-%m-%d", time.gmtime(now))
        daily_count = self._increment(
            pk=f"daily#{hashed_ip}",
            sk=today,
            ttl=now + DAILY_TTL_SECONDS,
        )

        if daily_count > DAILY_LIMIT:
            return {
                "allowed": False,
                "reason": "Daily limit reached. Please try again tomorrow.",
                "remaining_session": SESSION_LIMIT - session_count,
                "remaining_daily": 0,
            }

        return {
            "allowed": True,
            "reason": None,
            "remaining_session": SESSION_LIMIT - session_count,
            "remaining_daily": DAILY_LIMIT - daily_count,
        }

    def _increment(self, pk: str, sk: str, ttl: int) -> int:
        """Atomically increment a counter, creating the item if it doesn't exist."""
        try:
            response = self.table.update_item(
                Key={"pk": pk, "sk": sk},
                UpdateExpression="SET #count = if_not_exists(#count, :zero) + :one, #ttl = :ttl",
                ExpressionAttributeNames={"#count": "count", "#ttl": "ttl"},
                ExpressionAttributeValues={":zero": 0, ":one": 1, ":ttl": ttl},
                ReturnValues="UPDATED_NEW",
            )
            return int(response["Attributes"]["count"])
        except ClientError:
            # If DynamoDB fails, allow the request (fail open for availability)
            return 0
