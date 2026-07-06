const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const Terser = require('terser');
const { minify } = require('html-minifier-terser');
const { execSync } = require('child_process');

async function run() {
    console.log('Minifying CSS...');
    const cssContent = fs.readFileSync('style.css', 'utf8');
    const minifiedCss = new CleanCSS({}).minify(cssContent).styles;
    fs.writeFileSync('style.min.css', minifiedCss);
    
    console.log('Minifying JS...');
    const jsContent = fs.readFileSync('script.js', 'utf8');
    const minifiedJs = await Terser.minify(jsContent);
    fs.writeFileSync('script.min.js', minifiedJs.code);
    
    console.log('Running build.js...');
    execSync('node build.js', { stdio: 'inherit' });
    
    console.log('Minifying HTML files...');
    const htmlMinifierOptions = {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        continueOnParseError: true // Add this option just in case
    };
    
    async function walkDir(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                if (file !== 'node_modules' && file !== '.git' && file !== 'components') {
                    await walkDir(filePath);
                }
            } else if (file.endsWith('.html')) {
                const content = fs.readFileSync(filePath, 'utf8');
                try {
                    const minified = await minify(content, htmlMinifierOptions);
                    fs.writeFileSync(filePath, minified);
                } catch(e) {
                    console.error('Error minifying ' + filePath + ': ' + e.message.split('\n')[0]);
                }
            }
        }
    }
    
    await walkDir(__dirname);
    console.log('Minification complete.');
}

run();
