<%* tR = await tp.user.universal_frontmatter(tp) %>
# Finance Index

Central hub for all financial notes, budgets, and transactions.

## Key Areas
- [[Budgets]]
- [[Transactions]]
- [[Investments]]
- [[Taxes]]

## Recent Financial Notes
```dataview
LIST
FROM "Notes/Finance"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 5
```

## Upcoming Financial Tasks
```dataview
TASK
FROM "Notes/Finance"
WHERE !completed
SORT due ASC
LIMIT 5
```

---

> **Tip:** Add new financial notes and link them here for easy access. Use the appropriate templates for different types of financial documents. 