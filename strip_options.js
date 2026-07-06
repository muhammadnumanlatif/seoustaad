const fs = require('fs');

function processFile(filePath, selectNameOrIdMatches) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    selectNameOrIdMatches.forEach(match => {
        // Find the select tag and its closing tag
        const selectRegex = new RegExp(`(<select[^>]*?(?:name|id)="${match}"[^>]*>)([\\s\\S]*?)(</select>)`);
        content = content.replace(selectRegex, (fullMatch, openTag, optionsContent, closeTag) => {
            // Keep only the first option (which is usually the placeholder)
            const firstOptionMatch = optionsContent.match(/<option[^>]*>.*?<\/option>/);
            const firstOption = firstOptionMatch ? firstOptionMatch[0] : '';
            return `${openTag}\n                        ${firstOption}\n                    ${closeTag}`;
        });
    });

    fs.writeFileSync(filePath, content, 'utf8');
}

processFile('index.html', ['location']);
processFile('components/whatsapp-widget.html', ['waWidgetService', 'waWidgetLocation']);
console.log('Options stripped successfully.');
