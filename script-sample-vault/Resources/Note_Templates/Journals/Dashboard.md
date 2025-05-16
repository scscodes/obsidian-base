<%*
const year = tp.date.now("YYYY");
const month = tp.date.now("MM");
const yearMonth = tp.date.now("YYYY-MM");
const week = tp.date.now("gggg-[W]WW");
const quarter = Math.ceil(parseInt(month) / 3);

// Construct the real content
tR = `
---
cssclass: dashboard
---

# 🧩 Journal Dashboard for ${year}

## 📅 Recently Created Entries

\`\`\`dataview
LIST
FROM "Journals/${year}"
WHERE class = "journal"
SORT file.ctime DESC
LIMIT 10
\`\`\`

---

## 🗓️ This Week's Note Status

\`\`\`dataview
TABLE file.link AS "Weekly Note", week
FROM "Journals/${year}/Weekly"
WHERE class = "journal" AND type = "weekly" AND contains(file.name, "${week}")
FLATTEN regexmatch("W(\\\\d{1,2})", file.name)[0] AS week
\`\`\`

\`\`\`button
name Create This Week's Weekly Note
type quickadd
action Create Weekly Note
color green
\`\`\`

---

## 📆 This Month's Note Status

\`\`\`dataview
TABLE file.link AS "Monthly Note"
FROM "Journals/${year}/Monthly"
WHERE class = "journal" AND type = "monthly" AND contains(file.name, "${yearMonth}")
\`\`\`

\`\`\`button
name Create This Month's Monthly Note
type quickadd
action Create Monthly Note
color blue
\`\`\`

---

## 📊 This Quarter's Note Status

\`\`\`dataview
TABLE file.link AS "Quarterly Note", quarter
FROM "Journals/${year}/Quarterly"
WHERE class = "journal" AND type = "quarterly"
FLATTEN regexmatch("Q(\\\\d{1})", file.name)[0] AS quarter
WHERE quarter = ${quarter}
\`\`\`

\`\`\`button
name Create This Quarter's Quarterly Note
type quickadd
action Create Quarterly Note
color purple
\`\`\`
`;
%>
