# Plugin Reference (TL;DR)

---

## QuickAdd
- **Purpose:** Quickly add new notes or content using macros, templates, and user prompts.
- **Common Use:**  
  - Create a macro to add a new note with a specific template:
    1. Open QuickAdd settings → Macros.
    2. Add an action: "Template".
    3. Select your template file.
    4. (Optional) Add user prompts for title, date, etc.
    5. Assign a hotkey or command palette entry.
  - **Example Macro:**  
    - Action: Template → `Resources/Note_Templates/Asset_Note.md`
    - Prompt: Note title
    - Result: New note with template applied and title filled in.

## Templater
- **Purpose:** Advanced templating with inline and JavaScript-powered dynamic content.
- **Inline Syntax Example:**  
  ```markdown
  <% tp.date.now("YYYY-MM-DD") %>
  ```
- **JS File Syntax Example:**  
  ```markdown
  <%* 
  tR = await tp.user.my_custom_function(tp)
  %>
  ```
- **Best Practices:**  
  - Use inline for simple date/variable insertion.
  - Use JS blocks for logic, API calls, or reusable functions.
  - Store custom JS functions in `Resources/Scripts/` for reuse.

## Dataview
- **Purpose:** Query, filter, and display note data (including frontmatter) as tables, lists, or tasks.
- **Common Use Cases:**
  - Summarize notes by tag, type, or metadata field
  - Create dashboards or overviews
- **Example Table Query:**
  ```dataview
  table file.name as "Note", model_year, make
  from "Assets"
  where model_year and make
  sort model_year desc
  ```
- **Example List Query:**
  ```dataview
  list from "Appointments" where contains(purpose, "Checkup")
  ```
- **Frontmatter Integration:**
  - Dataview reads YAML frontmatter (the metadata at the top of your notes)
  - Use Templater and scripts to ensure consistent frontmatter for reliable queries

## Other Key Plugins (One-liners)
- **Calendar:** Visual calendar for daily notes.
- **Metadata Menu:** Edit and manage frontmatter/metadata.
- **Mind Map:** Preview notes as mind maps.
- **Periodic Notes:** Manage daily/weekly/monthly notes.
- **Tasks:** Track and query tasks across your vault.

## Scripts Directory (`Resources/Scripts/`)
- **Purpose:** Store reusable JavaScript files for Templater automation.
- **Frontmatter Automation:**
  - Example: `universal_frontmatter.js` generates standard frontmatter for all new notes
  - Usage in templates:
    ```markdown
    <%* tR = await tp.user.universal_frontmatter(tp) %>
    ```
  - Ensures all notes have consistent, queryable metadata for Dataview and other plugins
- **Best Practice:**
  - Centralize logic in scripts for maintainability and scalability
  - Update scripts to propagate changes across all templates automatically 