---
title: Index
aliases: []
created: 2025-05-13
updated: 2025-05-13T20:24:01
class: misc
type: unspecified
tags: [misc, unspecified, needs-classification]
id: c69187e3-d741-4bf8-a81f-280acee5a713
---
# Master Dashboard

Central hub for all scheduling, tasks, and important information across the vault.

## 📅 Today's Schedule
```dataview
TABLE WITHOUT ID
  file.link as "Event",
  time as "Time",
  choice(contains(file.folder, "Medical"), "🏥",
    choice(contains(file.folder, "Professional"), "💼",
      choice(contains(file.folder, "Hobbies"), "🎨", "📝"))) as "Category",
  location as "Location"
FROM "Notes"
WHERE date = date(today)
SORT time ASC
```

## ⏰ Upcoming Appointments
```dataview
TABLE WITHOUT ID
  file.link as "Appointment",
  date as "Date",
  time as "Time",
  provider as "Provider",
  purpose as "Purpose"
FROM "Notes/Medical/Appointments"
WHERE date >= date(today)
SORT date ASC
LIMIT 5
```

## 📊 Task Overview
### Due Today
```dataview
TASK
FROM "Notes"
WHERE !completed AND due = date(today)
SORT priority DESC
```

### Due This Week
```dataview
TASK
FROM "Notes"
WHERE !completed AND due >= date(today) AND due <= date(today) + dur(7 days)
SORT due ASC
```

### Overdue
```dataview
TASK
FROM "Notes"
WHERE !completed AND due < date(today)
SORT due ASC
```

## 🏠 Home & Property
### Upcoming Maintenance
```dataview
TABLE WITHOUT ID
  file.link as "Task",
  due as "Due Date",
  priority as "Priority"
FROM "Notes/Assets"
WHERE !completed AND contains(file.name, "Maintenance")
SORT due ASC
LIMIT 5
```

## 💰 Financial
### Upcoming Payments
```dataview
TABLE WITHOUT ID
  file.link as "Payment",
  due as "Due Date",
  amount as "Amount"
FROM "Notes/Finance"
WHERE !completed AND contains(file.name, "Payment")
SORT due ASC
LIMIT 5
```

## 💼 Professional
### Upcoming Meetings
```dataview
TABLE WITHOUT ID
  file.link as "Meeting",
  date as "Date",
  time as "Time",
  location as "Location"
FROM "Notes/Professional/Meetings"
WHERE date >= date(today)
SORT date ASC
LIMIT 5
```

## 🎯 Project Status
```dataview
TABLE WITHOUT ID
  file.link as "Project",
  status as "Status",
  due as "Due Date",
  progress as "Progress"
FROM "Notes/Professional/Projects"
WHERE !completed
SORT due ASC
```

## 📝 Recent Updates
```dataview
TABLE WITHOUT ID
  file.link as "Note",
  file.mtime as "Last Modified",
  choice(contains(file.folder, "Assets"), "🏠",
    choice(contains(file.folder, "Finance"), "💰",
      choice(contains(file.folder, "Hobbies"), "🎨",
        choice(contains(file.folder, "Medical"), "🏥",
          choice(contains(file.folder, "Professional"), "💼",
            choice(contains(file.folder, "Profiles"), "👥", "📦")))))) as "Category"
FROM "Notes"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 10
```

---

> **Tip:** This dashboard provides a comprehensive overview of your schedule, tasks, and important information. Use the filters and links to navigate to specific areas. 