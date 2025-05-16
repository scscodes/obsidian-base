<%*
const dt = tp.date.now("YYYYMMDDHHmm")
%>
---
id: <%* tR += dt %>
type: zettel
tags: #zettel
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

One focused idea in your own words.

## Links
- Related: [[Some Related Note]]
