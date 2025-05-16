<%* tR = await tp.user.universal_frontmatter(tp) %>
# Home & Property Index

Central hub for asset and property related notes.

## Key Areas
- [[Maintenance]]
- [[Finances]]
- [[Documents]]
- [[Inventory]]

## Recent Asset Notes
```dataview
LIST
FROM "Notes/Assets"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 5
```

## Upcoming Maintenance Tasks
```dataview
TASK
FROM "Notes/Assets"
WHERE !completed
SORT due ASC
LIMIT 5
```

---

> **Tip:** Add new property notes and link them here for easy access. Keep maintenance schedules and important documents up to date. 