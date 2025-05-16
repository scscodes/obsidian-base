<%* tR = await tp.user.universal_frontmatter(tp) %>
# Medical Dashboard

Central hub for all medical and health-related content.

## 📂 Quick Access
- [[Appointments|📅 Appointments]]
- [[Documents|📄 Documents]]

## 📅 Upcoming Appointments
```dataview
TABLE file.link AS "Appointment", date, time, provider, purpose
FROM "Notes/Medical/Appointments"
WHERE date >= date(today)
SORT date ASC
LIMIT 5
```

## 📄 Recent Medical Documents
```dataview
TABLE file.link AS "Document", type, date
FROM "Notes/Medical/Documents"
WHERE file.name != "Index"
SORT date DESC
LIMIT 5
```

## 🏥 Key Areas
- [[Insurance]]
- [[Prescriptions]]
- [[Test Results]]
- [[History]]
- [[Specialists]]

## ⏰ Upcoming Medical Tasks
```dataview
TASK
FROM "Notes/Medical"
WHERE !completed
SORT due ASC
LIMIT 5
```

## 📝 Recent Medical Notes
```dataview
LIST
FROM "Notes/Medical"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 5
```

---

> **Tip:** Use the Appointment Note template for new appointments and keep all medical documents organized in their respective folders. 