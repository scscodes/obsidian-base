<%* tR = await tp.user.universal_frontmatter(tp) %>
# Journal Dashboard

## 📅 Recently Created Entries
```dataview
LIST
FROM "Journals"
WHERE class = "journal"
SORT file.ctime DESC
LIMIT 10
```

## 🗓️ This Week's Note Status
```dataview
TABLE file.link AS "Weekly Note", week
FROM "Journals/Weekly"
WHERE class = "journal" AND type = "weekly" AND contains(file.name, "2025-W19")
FLATTEN regexmatch("W(\\d{1,2})", file.name)[0] AS week
```

```button
name Create This Week's Weekly Note
type quickadd
action Create Weekly Note
color green
```

## 📆 This Month's Note Status
```dataview
TABLE file.link AS "Monthly Note"
FROM "Journals/Monthly"
WHERE class = "journal" AND type = "monthly" AND contains(file.name, "2025-05")
```

```button
name Create This Month's Monthly Note
type quickadd
action Create Monthly Note
color blue
```

## 📊 This Quarter's Note Status
```dataview
TABLE file.link AS "Quarterly Note", quarter
FROM "Journals/Quarterly"
WHERE class = "journal" AND type = "quarterly"
FLATTEN regexmatch("Q(\\d{1})", file.name)[0] AS quarter
WHERE quarter = 2
```

```button
name Create This Quarter's Quarterly Note
type quickadd
action Create Quarterly Note
color purple
```

## 📝 Recent Journal Entries
```dataview
LIST
FROM "Journals"
WHERE class = "journal" AND type = "daily"
SORT file.mtime DESC
LIMIT 5
```

## ✅ Recent Completed Tasks
```dataview
TASK
FROM "Journals"
WHERE completed
SORT completion DESC
LIMIT 5
```

---

> **Tip:** Use the appropriate templates for different types of journal entries. Keep your journal organized by using the correct metadata and tags.
