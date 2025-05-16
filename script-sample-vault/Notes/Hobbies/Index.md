<%* tR = await tp.user.universal_frontmatter(tp) %>
# Hobbies Index

Central hub for all hobby and personal interest notes.

## Key Areas
- [[Active]]
- [[Projects]]
- [[Resources]]
- [[Archive]]

## Recent Hobby Notes
```dataview
LIST
FROM "Notes/Hobbies"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 5
```

## Active Projects
```dataview
TASK
FROM "Notes/Hobbies"
WHERE !completed
SORT due ASC
LIMIT 5
```

---

> **Tip:** Add new hobby notes and link them here for easy access. Track progress on projects and maintain a list of resources. 