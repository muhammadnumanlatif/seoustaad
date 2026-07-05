const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
// We'll update files in place since this is a static project without a build step currently
const filesToProcess = ['index.html', 'legal.html', 'package-details.html'];

const cities = [
    'Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Peshawar', 'Multan', 'Hyderabad',
    'Islamabad', 'Quetta', 'Bahawalpur', 'Sargodha', 'Sialkot', 'Sukkur', 'Larkana', 'Sheikhupura',
    'Rahim Yar Khan', 'Jhang', 'Dera Ghazi Khan', 'Gujrat', 'Sahiwal', 'Wah Cantonment', 'Mardan', 'Kasur', 'Okara'
];

function injectCanonical(html, canonicalUrl) {
    if (html.includes('<link rel="canonical"')) {
        return html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);
    }
    return html.replace('</head>', `    <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
}

function fixInternalLinks(html) {
    // Replace index.html with /
    let fixed = html.replace(/href="index\.html([^"]*)"/g, 'href="/$1"');
    // Replace legal.html with /legal
    fixed = fixed.replace(/href="legal\.html([^"]*)"/g, 'href="/legal$1"');
    return fixed;
}

function updatePrices(html) {
    return html.replace(/45,000 PKR/g, '30,000 PKR').replace(/\$150/g, '$100');
}

filesToProcess.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = fixInternalLinks(content);
    content = updatePrices(content);
    
    let canonicalUrl = 'https://seoustaad.com/';
    if (file === 'legal.html') canonicalUrl = 'https://seoustaad.com/legal';
    if (file === 'package-details.html') canonicalUrl = 'https://seoustaad.com/package-details'; 
    
    content = injectCanonical(content, canonicalUrl);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} with canonical tag and fixed links.`);
});

// Generate Silo Pages for Locations
const locationsDir = path.join(srcDir, 'locations');
if (!fs.existsSync(locationsDir)) {
    fs.mkdirSync(locationsDir);
}

const templatePath = path.join(srcDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

cities.forEach(city => {
    // Generate SEO Agency Page for each city
    const slug = `seo-agency-${city.toLowerCase().replace(/\s+/g, '-')}`;
    const cityDir = path.join(locationsDir, slug);
    if (!fs.existsSync(cityDir)) {
        fs.mkdirSync(cityDir, { recursive: true });
    }
    
    const canonicalUrl = `https://seoustaad.com/locations/${slug}/`;
    
    // Modify template for this city
    let cityContent = template;
    // Update titles and meta
    cityContent = cityContent.replace(/<title>.*?<\/title>/, `<title>SEO Agency in ${city} | SEO Ustaad</title>`);
    cityContent = cityContent.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="Dominate digital search in ${city} with SEO Ustaad. Top-rated SEO agency in ${city}."`);
    // Update canonical
    cityContent = cityContent.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);
    // Adjust asset paths
    cityContent = cityContent.replace(/href="style\.css"/g, 'href="/style.css"');
    cityContent = cityContent.replace(/src="logo\.webp"/g, 'src="/logo.webp"');
    cityContent = cityContent.replace(/src="script\.js"/g, 'src="/script.js"');
    cityContent = cityContent.replace(/content="logo\.webp"/g, 'content="/logo.webp"');
    
    // Update some content
    cityContent = cityContent.replace(/Dominate Digital Search <br> <span class="text-gradient">With SEO Ustaad<\/span>/, `Dominate Digital Search in ${city} <br> <span class="text-gradient">With SEO Ustaad</span>`);
    
    fs.writeFileSync(path.join(cityDir, 'index.html'), cityContent, 'utf8');
    console.log(`Generated location page: /locations/${slug}/`);
});

console.log('Build script completed successfully.');
