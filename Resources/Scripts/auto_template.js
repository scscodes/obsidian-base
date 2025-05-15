/**
 * Auto-template script that applies templates to new files based on their location
 * @param {App} app - The Obsidian app instance
 */
module.exports = async (app) => {
    // Register the file creation event
    app.vault.on('create', async (file) => {
        // Only process markdown files
        if (!(file instanceof TFile) || file.extension !== 'md') {
            return;
        }

        const path = file.path.toLowerCase();
        const fileName = file.basename.toLowerCase();
        
        // Determine template based on path and filename
        let templatePath = '';
        
        if (path.includes('journals')) {
            if (fileName.match(/^20\d{2}-w\d{1,2}$/)) {
                templatePath = 'Resources/Note_Templates/Journals/Weekly_Journal.md';
            } else if (fileName.match(/^20\d{2}-\d{2}$/)) {
                templatePath = 'Resources/Note_Templates/Journals/Monthly_Journal.md';
            } else {
                templatePath = 'Resources/Note_Templates/Journals/Daily_Journal.md';
            }
        } else if (path.includes('profiles')) {
            templatePath = 'Resources/Note_Templates/Profile_Note.md';
        } else if (path.includes('references')) {
            templatePath = 'Resources/Note_Templates/Reference_Note.md';
        } else if (path.includes('assets')) {
            templatePath = 'Resources/Note_Templates/Asset_Note.md';
        } else if (path.includes('finance')) {
            templatePath = 'Resources/Note_Templates/Finance_Note.md';
        } else if (path.includes('hobbies')) {
            templatePath = 'Resources/Note_Templates/Hobby_Note.md';
        } else if (path.includes('medical')) {
            templatePath = 'Resources/Note_Templates/Appointment_Note.md';
        } else {
            templatePath = 'Resources/Note_Templates/Misc_Note.md';
        }

        try {
            // Read the template
            const templateFile = app.vault.getAbstractFileByPath(templatePath);
            if (!templateFile) {
                console.error(`Template not found: ${templatePath}`);
                return;
            }
            
            const templateContent = await app.vault.read(templateFile);
            
            // Read the current file content
            const currentContent = await app.vault.read(file);
            
            // Check if file already has frontmatter
            if (currentContent.startsWith('---')) {
                console.log(`File ${file.path} already has frontmatter`);
                return;
            }
            
            // Apply the template
            const newContent = templateContent + '\n\n' + currentContent;
            await app.vault.modify(file, newContent);
            
            console.log(`Applied template to ${file.path}`);
        } catch (error) {
            console.error(`Error applying template to ${file.path}:`, error);
        }
    });
}; 