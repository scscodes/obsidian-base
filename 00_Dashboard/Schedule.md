# Schedule Dashboard

## 📅 Upcoming Appointments
```dataview
TABLE 
  date as Date,
  time as Time,
  title as Event,
  file.folder as Location
FROM "02_Notes"
WHERE contains(tags, "appointment") 
  AND date >= date(today)
SORT date ASC, time ASC
```

## 🏥 Medical Appointments
```dataview
TABLE 
  date as Date,
  time as Time,
  title as Event,
  file.folder as Location
FROM "02_Notes/Health/Appointments"
WHERE date >= date(today)
SORT date ASC, time ASC
```

## 💼 Professional Meetings
```dataview
TABLE 
  date as Date,
  time as Time,
  title as Event,
  file.folder as Location
FROM "02_Notes/Professional"
WHERE contains(tags, "meeting") 
  AND date >= date(today)
SORT date ASC, time ASC
```

## 📅 Calendar View
- [[05_Journals/{{date:YYYY-MM-DD}}|Today's Journal]]
- [[05_Journals/{{date:YYYY-MM-DD}}|Tomorrow's Journal]]

## 🔄 Recurring Events
- Weekly Review: Every Sunday
- Monthly Review: First day of each month
- Quarterly Review: First day of each quarter

## 📌 Quick Links
- [[02_Notes/Health/Appointments/Index|Medical Appointments Index]]
- [[02_Notes/Professional/Meetings|Professional Meetings]]
- [[Home_Dashboard|Back to Home Dashboard]] 