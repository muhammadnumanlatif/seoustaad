const fs = require('fs');
const path = require('path');

const srcDir = __dirname;

// Update static core HTML files
const staticFiles = [
    'index.html',
    'legal.html',
    'package-details.html',
    'city-template.html',
    'service-template.html'
];

staticFiles.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // We match any existing meta description to overwrite it completely
        content = content.replace(
            /<meta name="description" content="[^"]*">/, 
            `<meta name="description" content="SEO Ustaad is Pakistan's top-rated Generative Engine Optimization & Web Development agency. Scale your brand with affordable WordPress developers and ROI-driven SEO starting at 5,000 PKR. Order via WhatsApp today.">`
        );
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated core meta description in ${file}`);
    }
});

// Update build.js template strings
const buildJsPath = path.join(srcDir, 'build.js');
let buildJsContent = fs.readFileSync(buildJsPath, 'utf8');

// 1. Replace location meta description generator
// Let's use a robust regex to find the line where cityContent's description is replaced
buildJsContent = buildJsContent.replace(
    /cityContent = cityContent\.replace\(\/<meta name="description" content="\[\^"\]\*"\//g,
    `cityContent = cityContent.replace(/<meta name="description" content="[^"]*"/`
);

// We know build.js currently sets: Dominate digital search in ${city}...
// We will replace that entire replacement string
const oldCityMetaRegex = /`<meta name="description" content="Dominate digital search in \$\{city\} with SEO Ustaad\. Top-rated SEO agency in \$\{city\}\."`/g;
const newCityMeta = `\`<meta name="description" content="Looking for a local SEO consultant in \${city}? SEO Ustaad provides premium eCommerce web design services and affordable WordPress developers in \${city} starting at just 5,000 PKR. Dominate your local market today!"\``;
if(buildJsContent.match(oldCityMetaRegex)) {
    buildJsContent = buildJsContent.replace(oldCityMetaRegex, newCityMeta);
} else {
    // Fallback if the script has something else
    buildJsContent = buildJsContent.replace(
        /cityContent = cityContent\.replace\(\/<meta name="description" content="\[\^"\]\*"\/, .*?\);/s,
        `cityContent = cityContent.replace(/<meta name="description" content="[^"]*"/, ${newCityMeta});`
    );
}

// 2. Replace service meta description generator
const oldServiceMetaRegex = /`<meta name="description" content="Premium \$\{gig\.name\} starting at \$\{gig\.price\}\. Order directly via WhatsApp\.">`/g;
const newServiceMeta = `\`<meta name="description" content="Get professional \${gig.name} services by SEO Ustaad. We specialize in ROI-driven \${gig.category} and custom solutions for startups to boost your rankings. Premium quality starting at \${gig.price}. Order directly on WhatsApp!"\``;
if(buildJsContent.match(oldServiceMetaRegex)) {
    buildJsContent = buildJsContent.replace(oldServiceMetaRegex, newServiceMeta);
} else {
    buildJsContent = buildJsContent.replace(
        /gigContent = gigContent\.replace\(\/<meta name="description" content="\.\*\?">\/, .*?\);/s,
        `gigContent = gigContent.replace(/<meta name="description" content=".*?">/, ${newServiceMeta});`
    );
}

// 3. Replace hub page meta description generator
const oldHubMetaRegex = /`<meta name="description" content="Find SEO Ustaad services in your city\. We serve \$\{cities\.length\} major cities in Pakistan\."`/g;
const newHubMeta = `\`<meta name="description" content="Find SEO Ustaad services in your city. We serve \${cities.length} major cities in Pakistan with premium Generative Engine Optimization, affordable WordPress developers, and ROI-driven SEO."\``;
if(buildJsContent.match(oldHubMetaRegex)) {
    buildJsContent = buildJsContent.replace(oldHubMetaRegex, newHubMeta);
} else {
    buildJsContent = buildJsContent.replace(
        /hubContent = hubContent\.replace\(\/<meta name="description" content="\[\^"\]\*"\//g,
        `hubContent = hubContent.replace(/<meta name="description" content="[^"]*"/`
    );
    buildJsContent = buildJsContent.replace(
        /hubContent = hubContent\.replace\(\/<meta name="description" content="\[\^"\]\*"\/, .*?\);/s,
        `hubContent = hubContent.replace(/<meta name="description" content="[^"]*"/, ${newHubMeta});`
    );
}

fs.writeFileSync(buildJsPath, buildJsContent, 'utf8');
console.log('Successfully patched build.js meta description templates.');
