<%* tR = await tp.user.universal_frontmatter(tp) %>
# Miscellaneous Index

Central hub for all miscellaneous notes that don't fit into other categories.

## Key Areas
- [[Ideas]]
- [[References]]
- [[Temporary]]
- [[Archive]]

## Recent Misc Notes
```dataview
LIST
FROM "Notes/Misc"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 5
```

## Uncategorized Tasks
```dataview
TASK
FROM "Notes/Misc"
WHERE !completed
SORT due ASC
LIMIT 5
```

---

> **Tip:** Add miscellaneous notes here when they don't fit into other categories. Consider moving them to more appropriate sections if they develop into a specific category. 