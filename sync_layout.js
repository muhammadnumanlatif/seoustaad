const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const filesToProcess = ['legal.html', 'package-details.html', 'city-template.html', 'service-template.html'];

// 1. Read Master index.html
const indexHtml = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');

// 2. Extract Master Header (from <nav ... to </nav>)
const headerMatch = indexHtml.match(/<nav class="navbar[\s\S]*?<\/nav>/);
if (!headerMatch) {
    console.error("Could not find header in index.html");
    process.exit(1);
}
const masterHeader = headerMatch[0];

// 3. Extract Master Footer (from <!-- Comprehensive Footer --> to </body>)
const footerMatch = indexHtml.match(/(?:<!-- Comprehensive Footer -->[\s\S]*)?<(?:footer|!-- Comprehensive Footer --)[\s\S]*?<\/body>/);
if (!footerMatch) {
    console.error("Could not find footer in index.html");
    process.exit(1);
}
let masterFooter = footerMatch[0];

// 4. Inject into templates
filesToProcess.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace Header
    content = content.replace(/<nav class="navbar[\s\S]*?<\/nav>/, masterHeader);
    
    // Replace Footer (matches either Comprehensive Footer comment or just <footer to </body>)
    content = content.replace(/(?:<!-- Comprehensive Footer -->[\s\S]*)?<(?:footer|!-- Comprehensive Footer --)[\s\S]*?<\/body>/, masterFooter);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Synchronized Header and Footer into ${file}`);
});
