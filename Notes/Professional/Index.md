<%* tR = await tp.user.universal_frontmatter(tp) %>
# Professional Index

Central hub for all work-related notes, projects, and meetings.

## Key Areas
- [[Projects]]
- [[Meetings]]
- [[Resources]]
- [[Career]]

## Recent Work Notes
```dataview
LIST
FROM "Notes/Professional"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 5
```

## Upcoming Work Tasks
```dataview
TASK
FROM "Notes/Professional"
WHERE !completed
SORT due ASC
LIMIT 5
```

## Upcoming Meetings
```dataview
TABLE file.link AS "Meeting", date, time
FROM "Notes/Professional/Meetings"
WHERE date >= date(today)
SORT date ASC
LIMIT 5
```

---

> **Tip:** Add new work notes and link them here for easy access. Keep track of important deadlines and meeting notes. 