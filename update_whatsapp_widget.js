const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === '.claude' || file === 'components') continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html') && file !== 'whatsapp-widget.html') {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const rootDir = __dirname;
const htmlFiles = getAllHtmlFiles(rootDir);
const newWidgetHtml = fs.readFileSync(path.join(rootDir, 'components', 'whatsapp-widget.html'), 'utf8');

let processedCount = 0;

for (const file of htmlFiles) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        if (!content.includes('whatsapp-widget-container')) {
            continue;
        }

        const dom = new JSDOM(content);
        const document = dom.window.document;

        const oldWidget = document.querySelector('.whatsapp-widget-container');
        if (oldWidget) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newWidgetHtml;
            const newWidget = tempDiv.querySelector('.whatsapp-widget-container');
            
            if (newWidget) {
                oldWidget.parentNode.replaceChild(newWidget, oldWidget);
                fs.writeFileSync(file, dom.serialize(), 'utf8');
                processedCount++;
                console.log(`Updated WhatsApp widget in ${file.replace(rootDir, '')}`);
            }
        }
        
        dom.window.close();
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
}

console.log(`Successfully updated ${processedCount} files.`);
