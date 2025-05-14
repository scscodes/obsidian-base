<%* tR = await tp.user.universal_frontmatter(tp) %>
# Profiles Index

Central hub for all personal and professional profiles, contacts, and relationships.

## Key Areas
- [[Personal]]
- [[Professional]]
- [[Family]]
- [[Friends]]

## Recent Profile Updates
```dataview
LIST
FROM "Notes/Profiles"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 5
```

## Important Contacts
```dataview
TABLE contact, role, last-contact
FROM "Notes/Profiles"
WHERE file.name != "Index"
SORT last-contact DESC
LIMIT 5
```

---

> **Tip:** Add new profile notes and link them here for easy access. Keep contact information and relationship details up to date. 