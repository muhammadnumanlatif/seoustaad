const fs = require('fs');
const path = require('path');

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === '.claude') continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            // Include html, js, py, md
            if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.py') || file.endsWith('.md')) {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

const rootDir = __dirname;
const files = getAllFiles(rootDir);
let processedCount = 0;

for (const file of files) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Replace all variants
        content = content.replace(/923353453099/g, '923353453099');
        content = content.replace(/\+92 335 3453099/g, '+92 335 3453099');
        content = content.replace(/\+923353453099/g, '+923353453099');
        content = content.replace(/00923353453099/g, '00923353453099');
        content = content.replace(/0335 3453099/g, '0335 3453099');

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            processedCount++;
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
}

console.log(`Successfully updated ${processedCount} files with the new phone number.`);
