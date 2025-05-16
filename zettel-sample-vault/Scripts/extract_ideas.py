#!/usr/bin/env python3
"""
Extracts lines prefixed with 'Idea:' or '💡' from a given daily note and
generates stub Zettelkasten notes with timestamp and placeholder content.
"""

import sys
import os
from datetime import datetime

VAULT_ROOT = "Zettelkasten"
PERMANENT_DIR = os.path.join(VAULT_ROOT, "02_Permanent")

def extract_ideas(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()

    ideas = [line.strip()[6:] for line in lines if line.strip().startswith("Idea:")]
    ideas += [line.strip()[2:] for line in lines if line.strip().startswith("💡")]

    for idea in ideas:
        ts = datetime.now().strftime("%Y%m%d%H%M")
        slug = idea.lower().replace(" ", "-")[:30]
        filename = f"{ts} {slug}.md"
        full_path = os.path.join(PERMANENT_DIR, filename)
        with open(full_path, "w") as f:
            f.write("---\n")
            f.write(f"id: {ts}\n")
            f.write("tags: [#zettel]\n")
            f.write(f"created: {datetime.now().date()}\n")
            f.write(f"linked-from: [[{os.path.basename(filepath).replace('.md', '')}]]\n")
            f.write("---\n\n")
            f.write(f"# {idea}\n\n")
            f.write("Draft note from daily entry.\n")

        print(f"Created: {filename}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python extract_ideas.py path/to/daily_note.md")
        sys.exit(1)

    extract_ideas(sys.argv[1])
