<%* tR = await tp.user.universal_frontmatter(tp) %>
# Notes Dashboard

Central hub for all notes and content across different domains.

## 📂 Quick Access
- [[Assets|🏠 Assets & Property]]
- [[Finance|💰 Finance]]
- [[Hobbies|🎨 Hobbies]]
- [[Medical|🏥 Medical]]
- [[Professional|💼 Professional]]
- [[Profiles|👥 Profiles]]
- [[Misc|📦 Miscellaneous]]

## 📅 Recent Content
```dataview
TABLE WITHOUT ID
  file.link as "Note",
  choice(contains(file.folder, "Assets"), "🏠",
    choice(contains(file.folder, "Finance"), "💰",
      choice(contains(file.folder, "Hobbies"), "🎨",
        choice(contains(file.folder, "Medical"), "🏥",
          choice(contains(file.folder, "Professional"), "💼",
            choice(contains(file.folder, "Profiles"), "👥", "📦")))))) as "Category",
  file.mtime as "Last Modified"
FROM "Notes"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 10
```

## ⏰ Upcoming Tasks
```dataview
TASK
FROM "Notes"
WHERE !completed
SORT due ASC
LIMIT 10
```

## 📊 Domain Overview

### 🏠 Assets & Property
```dataview
LIST
FROM "Notes/Assets"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 3
```

### 💰 Finance
```dataview
LIST
FROM "Notes/Finance"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 3
```

### 🎨 Hobbies
```dataview
LIST
FROM "Notes/Hobbies"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 3
```

### 🏥 Medical
```dataview
LIST
FROM "Notes/Medical"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 3
```

### 💼 Professional
```dataview
LIST
FROM "Notes/Professional"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 3
```

### 👥 Profiles
```dataview
LIST
FROM "Notes/Profiles"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 3
```

---

> **Tip:** Use this dashboard to quickly access all your notes. Each domain has its own section with recent content and important information. 