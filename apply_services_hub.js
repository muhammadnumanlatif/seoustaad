const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const buildJsPath = path.join(srcDir, 'build.js');

let buildContent = fs.readFileSync(buildJsPath, 'utf8');

const servicesHubLogic = `

// Generate the Services Hub Page
const servicesHubCanonicalUrl = \`https://seoustaad.com/services/\`;
let servicesHubContent = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
servicesHubContent = servicesHubContent.replace(/<title>.*?<\\/title>/, \`<title>All Premium SEO & Web Development Services | SEO Ustaad</title>\`);
servicesHubContent = servicesHubContent.replace(/<meta name="description" content="[^"]*"/, \`<meta name="description" content="Explore our 25 premium gigs including custom Next.js development, advanced Core Web Vitals fixes, and ROI-driven SEO campaigns starting at 5,000 PKR."\`);
servicesHubContent = servicesHubContent.replace(/<link rel="canonical" href="[^"]*"/, \`<link rel="canonical" href="\${servicesHubCanonicalUrl}"\`);
// Fix paths
servicesHubContent = servicesHubContent.replace(/href="style\\.css"/g, 'href="/style.css"');
servicesHubContent = servicesHubContent.replace(/src="logo\\.webp"/g, 'src="/logo.webp"');
servicesHubContent = servicesHubContent.replace(/src="script\\.js"/g, 'src="/script.js"');
servicesHubContent = servicesHubContent.replace(/content="logo\\.webp"/g, 'content="/logo.webp"');
// Update Hero
servicesHubContent = servicesHubContent.replace(/Dominate Digital Search <br> <span class="text-gradient">With SEO Ustaad<\\/span>/, \`Explore Our 25 <br> <span class="text-gradient">Premium Gigs</span>\`);

// Remove unnecessary sections to keep the hub clean (About, Results, Process, Trust)
servicesHubContent = servicesHubContent.replace(/<section id="about"[\\s\\S]*?<\\/section>/, '');
servicesHubContent = servicesHubContent.replace(/<section id="results"[\\s\\S]*?<\\/section>/, '');
servicesHubContent = servicesHubContent.replace(/<section id="process"[\\s\\S]*?<\\/section>/, '');
servicesHubContent = servicesHubContent.replace(/<section class="py-5 bg-dark"[\\s\\S]*?<\\/section>/, ''); // Wait, the grid is in a section with bg-dark.
// Actually, it's safer to just extract the Hero, the Packages grid, and the Footer.
// For simplicity, we just leave the whole page but strip specific sections:
servicesHubContent = servicesHubContent.replace(/<section id="services"[\\s\\S]*?<\\/section>/, '');
servicesHubContent = servicesHubContent.replace(/<section class="py-5 bg-orange[\\s\\S]*?<\\/section>/, ''); // The orange CTA banner

const sDir = path.join(srcDir, 'services');
if (!fs.existsSync(sDir)) fs.mkdirSync(sDir);
fs.writeFileSync(path.join(sDir, 'index.html'), servicesHubContent, 'utf8');
console.log('Generated Services Hub Page: /services/');
`;

// Only add if not already there
if (!buildContent.includes('Generate the Services Hub Page')) {
    buildContent = buildContent.replace("console.log('Build script completed successfully.');", servicesHubLogic + "\nconsole.log('Build script completed successfully.');");
    fs.writeFileSync(buildJsPath, buildContent, 'utf8');
    console.log("Injected Services Hub generation logic into build.js");
} else {
    console.log("Services Hub generation logic already exists in build.js");
}
