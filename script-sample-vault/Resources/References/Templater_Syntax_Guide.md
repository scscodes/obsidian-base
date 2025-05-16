---
tags:
  - reference
  - templater
  - guide
created: <% tp.file.creation_date() %>
modified: <% tp.file.last_modified_date() %>
---

# Templater Syntax Guide

Templater is a powerful template engine for Obsidian that allows you to create dynamic content using JavaScript. This reference covers the basic syntax and usage patterns for creating and implementing templates.

## Basic Syntax

Templater uses the following delimiters to execute JavaScript code:

```
<% %> - For executing JavaScript code
<%_ _%> - For executing JavaScript code with whitespace control
<%= %> - For executing JavaScript code and outputting the result
<%* %> - For executing JavaScript code during template execution time
```

## Common Variables and Functions

Templater provides several built-in variables and functions:

| Variable/Function | Description |
|-------------------|-------------|
| `tp.file.title` | Current file title |
| `tp.file.creation_date()` | File creation date |
| `tp.file.last_modified_date()` | Last modified date |
| `tp.date.now()` | Current date and time |
| `tp.date.tomorrow()` | Tomorrow's date |
| `tp.system.prompt()` | Prompt the user for input |
| `tp.system.suggester()` | Create a selection dropdown |
| `tp.file.cursor()` | Position the cursor |
| `tp.file.include()` | Include another template |

## Creating a New File with Templater

### Method 1: Using Template Hotkeys

1. Configure template hotkeys in Templater settings
2. Press the assigned hotkey
3. Select the template to use
4. Enter the new file name when prompted

### Method 2: Using the Templates Core Plugin

1. Use the "Create new note from template" command
2. Select your Templater template
3. Enter the new file name

### Method 3: Using the `tp.file.create_new()` Function

```javascript
<%*
// Create a new file based on a template
const newFilePath = "Path/To/New/File.md";
const templatePath = "Path/To/Template.md";
await tp.file.create_new(await tp.file.get_tfile(templatePath), newFilePath);
%>
```

## Implementing a Template into Another File

### Method 1: Using `tp.file.include()`

To include the contents of another template in your current file:

```javascript
<% tp.file.include("[[Template Name]]") %>
```

Or with relative path:

```javascript
<% tp.file.include("Resources/Section_Templates/template.md") %>
```

### Method 2: Nesting Templates

You can create modular templates by nesting them:

```javascript
<%* 
// In your main template
// This will insert the content of the header template
tR += await tp.file.include("[[Header Template]]");

// Your custom middle content can go here
tR += "## Custom Content\n\n";

// This will insert the content of the footer template
tR += await tp.file.include("[[Footer Template]]");
%>
```

### Method 3: Template Sections with Variables

Pass variables between templates for more dynamic content:

```javascript
<%*
// Define variables
let title = await tp.system.prompt("Enter title");
let category = await tp.system.suggester(["Work", "Personal", "Study"], ["work", "personal", "study"]);

// Include a template and pass variables to it
tR += await tp.file.include("[[Dynamic Section]]", {title, category});
%>
```

Then in the "Dynamic Section" template:

```javascript
<%*
// Access the passed variables
let { title, category } = tp.variables;
%>
# <%= title %>
Category: <%= category %>
```

## Tips for Effective Template Usage

1. **Modularity**: Break templates into small, reusable sections
2. **Variables**: Use variables to make templates flexible
3. **Comments**: Document complex code within templates using `<%* /* comments */ %>`
4. **Error Handling**: Use try/catch blocks for robust templates
5. **Testing**: Test templates thoroughly with different inputs

## Example: Complete Project Template

```javascript
<%*
// Project template example
const projectName = await tp.system.prompt("Project name");
const dueDate = await tp.system.prompt("Due date (YYYY-MM-DD)");
const priority = await tp.system.suggester(["High", "Medium", "Low"], ["high", "medium", "low"]);

// Format the title and filename
const fileName = `PRJ-${projectName.replace(/\s+/g, '-')}`;
await tp.file.rename(fileName);

// Generate front matter
tR += `---
type: project
status: active
priority: ${priority}
created: ${tp.date.now("YYYY-MM-DD")}
due: ${dueDate}
tags:
  - project
---

# ${projectName}

`;

// Include project sections
tR += await tp.file.include("[[Project Overview Section]]");
tR += "\n\n";
tR += await tp.file.include("[[Project Tasks Section]]");
tR += "\n\n";
tR += await tp.file.include("[[Project Resources Section]]");
%>
```

## Resources

- [Official Templater Documentation](https://silentvoid13.github.io/Templater/)
- [Templater GitHub Repository](https://github.com/SilentVoid13/Templater)
- [Obsidian Forum - Templater Tips & Tricks](https://forum.obsidian.md/tag/templater) 