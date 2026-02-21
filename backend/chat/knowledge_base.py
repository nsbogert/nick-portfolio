"""Load and format knowledge base markdown files for injection into the system prompt."""

import os
from pathlib import Path

# Files to load (order matters for context coherence)
KB_FILES = [
    "bio.md",
    "experience.md",
    "projects.md",
    "principles.md",
    "career_strategy.md",
    "preferences.md",
    "goals.md",
    "guardrail_wa.md",
    "future_ideas.md",
]

# network_map.md is explicitly excluded — it contains private relationship data

_cached_kb: str | None = None


def load_knowledge_base() -> str:
    """Load all knowledge base files and return as a single formatted string.

    Results are cached after first load (Lambda cold start optimization).
    """
    global _cached_kb
    if _cached_kb is not None:
        return _cached_kb

    kb_dir = Path(os.environ.get("KB_PATH", os.path.join(os.path.dirname(__file__), "..", "knowledge_base")))
    sections: list[str] = []

    for filename in KB_FILES:
        filepath = kb_dir / filename
        if filepath.exists():
            content = filepath.read_text(encoding="utf-8").strip()
            sections.append(f"--- {filename} ---\n{content}")

    _cached_kb = "\n\n".join(sections)
    return _cached_kb
