

## Overview

This setup supports a dual-mode note template strategy in Obsidian:

- **Mobile + Templater**: mobile/misc notes use static templates with minimal automation.
    
- **Desktop + JS (User Plugins)**: auto-template injection and frontmatter enforcement via JavaScript.
    
- **Dataview** tracks notes needing post-processing.
    

---

## Folder Strategy (Reflected from Screenshot)

```
.obsidian/
00_Dashboard/
  ├── Home_Dashboard.md
  ├── Schedule.md
  └── Index.md
Journals/2025/
  ├── Daily/
  ├── Monthly/
  ├── Quarterly/
  ├── Weekly/
  └── Index.md
Notes/
  ├── Assets/
  │   ├── Appliances/
  │   ├── Maintenance/
  │   └── Vehicles/
  ├── Finance/
  ├── Hobbies/
  │   └── Projects/
  ├── Medical/
  │   ├── Appointments/
  │   ├── Documents/
  │   └── General/
  ├── Misc/
  ├── Professional/
  │   ├── Meetings/
  │   └── Projects/
  └── Profiles/
      ├── Colleagues/
      ├── Family/
      └── Professional/
References/
  ├── Scripts/
  └── Templates/
```

---

## Mobile & Templater Strategy

### Template Mapping (Templater)

- Enable Templater plugin
    
- Configure Folder Template Settings:
    

```
Notes/Misc/     → References/Templates/misc_note.md
Notes/Mobile/   → References/Templates/mobile_note.md
```

### Example Frontmatter in mobile_note.md

```yaml
---
created: 2025-05-15
class: mobile-unclassified
source: mobile
flags: [needs-classification]
---
```

---

## Desktop & User Plugin Script

### Configuration: Directory-to-Template Map

Use a path-based or regex-matching map:

```js
const templateMap = [
  { pattern: /^Notes\/Assets\//, template: "References/Templates/assets_note.md" },
  { pattern: /^Notes\/Finance\//, template: "References/Templates/finance_note.md" },
  { pattern: /^Notes\/Hobbies\/Projects\//, template: "References/Templates/hobby_project_note.md" },
  { pattern: /^Notes\/Medical\//, template: "References/Templates/medical_note.md" },
  { pattern: /^Notes\/Professional\/Projects\//, template: "References/Templates/pro_project_note.md" },
  { pattern: /^Notes\/Professional\/Meetings\//, template: "References/Templates/meeting_note.md" },
  { pattern: /^Notes\/Profiles\//, template: "References/Templates/profile_note.md" },
  { pattern: /^Notes\/Misc\//, template: "References/Templates/misc_note.md" },
  { pattern: /^Notes\/Mobile\//, template: "References/Templates/mobile_note.md" },
];
```

### Script: Template Injector

```js
const { Plugin } = require("obsidian");

module.exports = class TemplateInjector extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.vault.on("create", async (file) => {
        if (!(file instanceof this.app.vault.constructor.TFile)) return;

        const path = file.path;
        const match = templateMap.find(({ pattern }) => pattern.test(path));
        if (!match) return;

        const templateFile = this.app.vault.getAbstractFileByPath(match.template);
        if (!(templateFile instanceof this.app.vault.constructor.TFile)) return;

        const content = await this.app.vault.read(templateFile);
        await this.app.vault.modify(file, content);
        console.log(`Injected template: ${match.template} into ${file.path}`);
      })
    );
  }
};
```

Place this in:

```
References/Scripts/template_injector.js
```

---

## Bonus Scripts

### 1. Metadata Linter (Post-Creation Cleanup)

Ensures notes have correct `class`, `type`, and removes classification flag.

```js
const fs = require("fs");
const path = require("path");

function lintFrontmatter(filePath, newClass) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return;

  const front = match[1].split("\n").reduce((acc, line) => {
    const [k, v] = line.split(":").map(s => s.trim());
    acc[k] = v;
    return acc;
  }, {});

  if (front.flags && front.flags.includes("needs-classification")) {
    front.class = newClass;
    delete front.flags;
  }

  const newFront = Object.entries(front).map(([k, v]) => `${k}: ${v}`).join("\n");
  const updated = `---\n${newFront}\n---\n` + content.replace(/^---[\s\S]*?---\n/, "");
  fs.writeFileSync(filePath, updated);
}
```

Run this via Node.js with folder scanning logic to apply `class` based on directory.

### 2. JSON Export for Triage

```js
const triageSummary = [];

function addNoteToTriage(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return;

  const metadata = Object.fromEntries(
    match[1].split("\n")
      .map(line => line.split(":").map(s => s.trim()))
      .filter(arr => arr.length === 2)
  );

  triageSummary.push({
    path: filePath,
    class: metadata.class,
    created: metadata.created,
    flags: metadata.flags
  });
}

fs.writeFileSync("triage.json", JSON.stringify(triageSummary, null, 2));
```

---

## Dataview: Query Mobile/Misc Notes

````dataview
## Unclassified Notes
```dataview
table file.name, class, created, flags
from "Notes/Mobile" or "Notes/Misc"
where contains(flags, "needs-classification")
sort file.ctime desc
````

## Notes by Folder Summary

```dataview
table class, count(rows) as note_count
from "Notes"
group by class
sort note_count desc
```

```

Add this to `00_Dashboard/Index.md` or a dedicated triage dashboard.

---

## Benefits

- ✅ Mobile notes have valid frontmatter out-of-the-box
- ✅ Desktop ensures scalable, structured metadata
- ✅ Easily query, triage, and manage new notes
- ✅ Minimal duplication or conflicting plugin logic

---

## Next Steps

- Set up your `References/Templates/` directory and ensure all frontmatter formats match
- Enable and configure Templater for `Notes/Mobile/` and `Notes/Misc/`
- Place the user plugin script into `References/Scripts/` and configure User Plugins
- Add the Dataview dashboard for triage
- Optionally run `lintFrontmatter` on new files for auto-fix and classification
- Optionally generate `triage.json` for external reviews

---

Let me know if you'd like the plugin bundled, or a dashboard note with the Dataview block included.

```