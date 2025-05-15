# Home Dashboard

## 📅 Today's Schedule
```dataview
TABLE 
  time as Time,
  title as Event,
  file.folder as Location
FROM "Notes"
WHERE contains(tags, "appointment") 
  AND date = date(today)
SORT time ASC
```

## 📋 Active Projects
```dataview
TABLE 
  status as Status,
  priority as Priority,
  modified as "Last Modified"
FROM "02_Notes"
WHERE contains(tags, "project") 
  AND status = "active"
SORT priority DESC, modified DESC
```

## 👥 Recent Profile Updates
```dataview
TABLE 
  category as Category,
  modified as "Last Updated"
FROM "02_Notes/Profiles"
WHERE type = "profile"
SORT modified DESC
LIMIT 5
```

## 🏠 Home & Property
- [[02_Notes/Home_Property/Index|Home Index]]
- [[02_Notes/Home_Property/Maintenance|Maintenance Schedule]]
- [[02_Notes/Home_Property/Finances|Property Finances]]

## 💼 Professional
- [[20_Notes/Professional/Index|Work Index]]
- [[02_Notes/Professional/Projects|Active Projects]]
- [[02_Notes/Professional/Meetings|Recent Meetings]]

## 🎨 Hobbies
- [[20_Notes/Hobbies/Index|Hobbies Index]]
- [[02_Notes/Hobbies/Active|Active Hobbies]]

## 👤 Profiles
- [[Contacts|Contacts Index]]
- [[02_Notes/Profiles/Family|Family]]
- [[02_Notes/Profiles/Colleagues|Colleagues]]

## 🏥 Health
- [[02_Notes/Health/Appointments/Index|Upcoming Appointments]]
- [[02_Notes/Health/Documents/Index|Medical Documents]]

## 📚 Quick Links
- [[Schedule|📅 Full Schedule]]
- [[01_Dashboard/Quick_Links|🔗 Quick Links]]
- [[01_Dashboard/Periodic_Reviews|📊 Reviews]]
- [[30_Journals/Index|📔 Journals]] 