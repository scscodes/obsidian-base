
---

# 🧩 Journal Dashboard for 2025

## 📅 Recently Created Entries

```dataview
LIST
FROM "Journals/2025"
WHERE class = "journal"
SORT file.ctime DESC
LIMIT 10
```

---

## 🗓️ This Week's Note Status

```dataview
TABLE file.link AS "Weekly Note", week
FROM "Journals/2025/Weekly"
WHERE class = "journal" AND type = "weekly" AND contains(file.name, "2025-W19")
FLATTEN regexmatch("W(\\d{1,2})", file.name)[0] AS week
```

```button
name Create This Week's Weekly Note
type quickadd
action Create Weekly Note
color green
```

---

## 📆 This Month's Note Status

```dataview
TABLE file.link AS "Monthly Note"
FROM "Journals/2025/Monthly"
WHERE class = "journal" AND type = "monthly" AND contains(file.name, "2025-05")
```

```button
name Create This Month's Monthly Note
type quickadd
action Create Monthly Note
color blue
```

---

## 📊 This Quarter's Note Status

```dataview
TABLE file.link AS "Quarterly Note", quarter
FROM "Journals/2025/Quarterly"
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

