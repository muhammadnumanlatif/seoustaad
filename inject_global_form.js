const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const indexHtmlPath = path.join(srcDir, 'index.html');
const cityTemplatePath = path.join(srcDir, 'city-template.html');
const serviceTemplatePath = path.join(srcDir, 'service-template.html');

// Read index.html to extract the global form
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract the form column
const formStartMarker = '<!-- Multi-step Form Column — order 2 on all screens -->';
const formEndMarker = '<!-- Mobile-only CTA + Ratings — order 3, hidden on desktop -->';

const startIndex = indexHtml.indexOf(formStartMarker);
const endIndex = indexHtml.indexOf(formEndMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Failed to find form markers in index.html');
    process.exit(1);
}

const globalFormContent = indexHtml.substring(startIndex, endIndex).trim();

function replaceFormInTemplate(templatePath) {
    if (!fs.existsSync(templatePath)) return;
    
    let content = fs.readFileSync(templatePath, 'utf8');
    
    // In city-template and service-template, the old form starts with the formStartMarker and ends just before </header>
    // Wait, let's just find formStartMarker, and find the index of </header>.
    // The form is inside a <div class="row"> inside a <div class="container">.
    // Actually, let's just use a greedy regex up to the </div></div></div> before </header>
    
    const startIdx = content.indexOf(formStartMarker);
    if (startIdx !== -1) {
        // Find the end of the row div
        const endHeaderIdx = content.indexOf('</header>');
        if (endHeaderIdx !== -1) {
            // We want to keep the closing tags for row, container, header.
            // Let's find the `</div>\n        </div>\n    </div>\n</header>`
            const replaceRegex = /<!-- Multi-step Form Column — order 2 on all screens -->[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*<\/header>)/;
            
            content = content.replace(replaceRegex, globalFormContent + '\n        </div>');
            fs.writeFileSync(templatePath, content, 'utf8');
            console.log(`Successfully injected global form into ${path.basename(templatePath)}`);
        }
    } else {
        // Fallback for older version if it still has 5-Step WhatsApp Form
        const oldFormRegex = /<!-- 5-Step WhatsApp Form -->[\s\S]*?<\/form>\s*<\/div>\s*<\/div>/;
        if (oldFormRegex.test(content)) {
            content = content.replace(oldFormRegex, globalFormContent);
            fs.writeFileSync(templatePath, content, 'utf8');
            console.log(`Successfully injected global form into ${path.basename(templatePath)} (legacy)`);
        } else {
            console.log(`Could not find old form to replace in ${path.basename(templatePath)}`);
        }
    }
}

replaceFormInTemplate(cityTemplatePath);
replaceFormInTemplate(serviceTemplatePath);
