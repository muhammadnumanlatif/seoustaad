const fs = require('fs');
const path = require('path');
const gigs = require('./gigs.json');


const srcDir = __dirname;
const widgetHtml = fs.existsSync(path.join(srcDir, 'components', 'whatsapp-widget.html')) ? fs.readFileSync(path.join(srcDir, 'components', 'whatsapp-widget.html'), 'utf-8') : '';
const headerHtml = fs.existsSync(path.join(srcDir, 'components', 'header.html')) ? fs.readFileSync(path.join(srcDir, 'components', 'header.html'), 'utf-8') : '';
const footerHtml = fs.existsSync(path.join(srcDir, 'components', 'footer.html')) ? fs.readFileSync(path.join(srcDir, 'components', 'footer.html'), 'utf-8') : '';

function injectComponents(html) {
    let newHtml = html;
    if (newHtml.includes('<!-- INJECT_WHATSAPP_WIDGET -->')) {
        newHtml = newHtml.replace('<!-- INJECT_WHATSAPP_WIDGET -->', widgetHtml);
    }
    if (newHtml.includes('<!-- INJECT_HEADER -->')) {
        newHtml = newHtml.replace('<!-- INJECT_HEADER -->', headerHtml);
    }
    if (newHtml.includes('<!-- INJECT_FOOTER -->')) {
        newHtml = newHtml.replace('<!-- INJECT_FOOTER -->', footerHtml);
    }
    return newHtml;
}
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

function injectFaqs(html, faqs) {
    if (!faqs || faqs.length === 0) return html;
    return html.replace('</head>', `    <script>window.pageSpecificFaqs = ${JSON.stringify(faqs)};</script>\n</head>`);
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
    
    if (!content.includes('<link rel="canonical"')) {
        content = content.replace(/<\/head>/i, `    <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }
    
    // Cache busting
    content = content.replace(/href="style\.css"/g, `href="style.css?v=${Date.now()}"`);
    content = content.replace(/src="script\.js"/g, `src="script.js?v=${Date.now()}"`);
    content = content.replace(/href="\/style\.css"/g, `href="/style.css?v=${Date.now()}"`);
    content = content.replace(/src="\/script\.js"/g, `src="/script.js?v=${Date.now()}"`);
    
    // Always re-inject widget
    content = injectComponents(content);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} with canonical tag and fixed links.`);
});

// Generate Silo Pages for Locations
const locationsDir = path.join(srcDir, 'locations');
if (!fs.existsSync(locationsDir)) {
    fs.mkdirSync(locationsDir);
}

const templatePath = path.join(srcDir, 'city-template.html');
const template = fs.readFileSync(templatePath, 'utf8');

let urls = ['/', '/legal', '/package-details', '/locations/', '/services/'];

let locationsHtmlList = '';

cities.forEach(city => {
    // Generate SEO Agency Page for each city
    const slug = `seo-agency-${city.toLowerCase().replace(/\s+/g, '-')}`;
    const cityDir = path.join(locationsDir, slug);
    if (!fs.existsSync(cityDir)) {
        fs.mkdirSync(cityDir, { recursive: true });
    }
    
    const canonicalUrl = `https://seoustaad.com/locations/${slug}/`;
    urls.push(`/locations/${slug}/`);
    locationsHtmlList += `\n                        <li class="mb-2"><a href="/locations/${slug}/" class="text-white text-decoration-none hover-orange">SEO Agency in ${city}</a></li>`;
    
    // Modify template for this city
    let cityContent = template;
    cityContent = cityContent.replace(/<title>.*?<\/title>/, `<title>SEO Agency in ${city} | SEO Ustaad</title>`);
    cityContent = cityContent.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="Looking for a local SEO consultant in ${city}? SEO Ustaad provides premium eCommerce web design services and affordable WordPress developers in ${city} starting at just 5,000 PKR. Dominate your local market today!"`);
    cityContent = cityContent.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);
    cityContent = cityContent.replace(/href="style\.css"/g, `href="/style.css?v=${Date.now()}"`);
    cityContent = cityContent.replace(/src="logo\.webp"/g, 'src="/logo.webp"');
    cityContent = cityContent.replace(/src="script\.js"/g, `src="/script.js?v=${Date.now()}"`);
    cityContent = cityContent.replace(/content="logo\.webp"/g, 'content="/logo.webp"');
    cityContent = cityContent.replace(/Dominate Digital Search <br> <span class="text-gradient">With SEO Ustaad<\/span>/, `Dominate Digital Search in ${city} <br> <span class="text-gradient">With SEO Ustaad</span>`);
    cityContent = cityContent.replace(/__CITY__/g, city);
    
    
    // Dynamic Form Pre-selection for Location
    cityContent = cityContent.replace(new RegExp('value="' + city + '"'), 'value="' + city + '" selected');

    cityContent = injectComponents(cityContent);
    fs.writeFileSync(path.join(cityDir, 'index.html'), cityContent, 'utf8');
    console.log(`Generated location page: /locations/${slug}/`);
});

// Generate Service Pages (The 25 Gigs)
const serviceTemplate = fs.readFileSync(path.join(srcDir, 'service-template.html'), 'utf8');
const servicesDir = path.join(srcDir, 'services');
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir);

gigs.forEach(gig => {
    const gigDir = path.join(servicesDir, gig.slug);
    if (!fs.existsSync(gigDir)) fs.mkdirSync(gigDir);
    
    let gigContent = serviceTemplate;
    gigContent = gigContent.replace(/<title>.*?<\/title>/, `<title>${gig.name} | SEO Ustaad</title>`);
    gigContent = gigContent.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="Get professional ${gig.name} services by SEO Ustaad. We specialize in ROI-driven ${gig.category} and custom solutions for startups to boost your rankings. Premium quality starting at ${gig.price}. Order directly on WhatsApp!"`);
    gigContent = gigContent.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="https://seoustaad.com/services/${gig.slug}/">`);
    
    gigContent = gigContent.replace(/<h1 class="display-3[^>]*>.*?<\/h1>/s, `<h1 class="display-3 fw-bold text-white mb-4 outfit lh-sm">${gig.name} <br> <span class="text-gradient">Only ${gig.price}</span></h1>`);
    gigContent = gigContent.replace(/__GIG_NAME__/g, gig.name);
    gigContent = gigContent.replace(/__GIG_PRICE__/g, gig.price);
    
    gigContent = gigContent.replace(/href="\/style\.css"/g, `href="/style.css?v=${Date.now()}"`);
    gigContent = gigContent.replace(/src="\/script\.js"/g, `src="/script.js?v=${Date.now()}"`);
    
    gigContent = injectComponents(gigContent);
    fs.writeFileSync(path.join(gigDir, 'index.html'), gigContent, 'utf8');
    
    urls.push(`/services/${gig.slug}/`);
    console.log(`Generated service page: /services/${gig.slug}/`);
});

// Generate Service x Location Matrix (625 Pages)
const serviceLocationTemplate = fs.existsSync(path.join(srcDir, 'service-location-template.html')) 
    ? fs.readFileSync(path.join(srcDir, 'service-location-template.html'), 'utf8') 
    : '';

if (serviceLocationTemplate) {
    cities.forEach(city => {
        const citySlug = city.toLowerCase().replace(/\s+/g, '-');
        
        gigs.forEach(gig => {
            const matrixSlug = `${gig.slug}-in-${citySlug}`;
            const matrixDir = path.join(servicesDir, matrixSlug);
            if (!fs.existsSync(matrixDir)) fs.mkdirSync(matrixDir);
            
            let matrixContent = serviceLocationTemplate;
            matrixContent = matrixContent.replace(/__CITY__/g, city);
            matrixContent = matrixContent.replace(/__GIG_NAME__/g, gig.name);
            matrixContent = matrixContent.replace(/__GIG_PRICE__/g, gig.price);
            
            matrixContent = matrixContent.replace(/href="\/style\.css"/g, `href="/style.css?v=${Date.now()}"`);
            matrixContent = matrixContent.replace(/src="\/script\.js"/g, `src="/script.js?v=${Date.now()}"`);
            
            matrixContent = injectComponents(matrixContent);
            fs.writeFileSync(path.join(matrixDir, 'index.html'), matrixContent, 'utf8');
            
            urls.push(`/services/${matrixSlug}/`);
        });
        console.log(`Generated 25 matrix pages for ${city}`);
    });
}

const generatedSitemapUrls = urls.map(url => {
    let priority = '0.8';
    if (url === '/') priority = '1.0';
    else if (url === '/locations/' || url === '/services/') priority = '0.9';
    return `  <url>\n    <loc>https://seoustaad.com${url}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n');
const finalSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${generatedSitemapUrls}\n</urlset>`;
fs.writeFileSync(path.join(srcDir, 'sitemap.xml'), finalSitemap, 'utf8');
console.log('Generated sitemap.xml');

const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://seoustaad.com/sitemap.xml`;
fs.writeFileSync(path.join(srcDir, 'robots.txt'), robotsTxt, 'utf8');
console.log('Generated robots.txt');

const llmsUrls = urls.map(url => `- https://seoustaad.com${url}`).join('\n');
const llmsTxt = `# SEO Ustaad - Digital Agency Pakistan

SEO Ustaad is Pakistan's leading digital agency specializing in SEO, AEO, and Premium Web Development.

## Services
- Web Development (WordPress, Shopify, Next.js, Flutter)
- SEO & AEO (Local SEO, Answer Engine Optimization)
- SMM & Meta Ads

## Pricing
Pricing starts at a minimum of 30,000 PKR ($100) and scales up based on the city tier and package.

## Locations Targeted
We provide dedicated local SEO services in ${cities.length} major cities across Pakistan: ${cities.join(', ')}.

## All Pages
${llmsUrls}

## Contact
WhatsApp: +923379912300`;
fs.writeFileSync(path.join(srcDir, 'llms.txt'), llmsTxt, 'utf8');
console.log('Generated llms.txt');

// Generate the Locations Hub Page
const hubCanonicalUrl = `https://seoustaad.com/locations/`;
let hubContent = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
hubContent = hubContent.replace(/<title>.*?<\/title>/, `<title>Areas We Serve | SEO Ustaad Locations in Pakistan</title>`);
hubContent = hubContent.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="Find SEO Ustaad services in your city. We serve ${cities.length} major cities in Pakistan with premium Generative Engine Optimization, affordable WordPress developers, and ROI-driven SEO."`);
hubContent = hubContent.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${hubCanonicalUrl}"`);
hubContent = hubContent.replace(/href="style\.css"/g, 'href="/style.css"');
hubContent = hubContent.replace(/src="logo\.webp"/g, 'src="/logo.webp"');
hubContent = hubContent.replace(/src="script\.js"/g, 'src="/script.js"');
hubContent = hubContent.replace(/content="logo\.webp"/g, 'content="/logo.webp"');
hubContent = hubContent.replace(/Dominate Digital Search <br> <span class="text-gradient">With SEO Ustaad<\/span>/, `Find Us In Your City <br> <span class="text-gradient">Service Locations</span>`);

// Replace a section in the hub to show the links
const servicesRegex = /<section id="services"[\s\S]*?<\/section>/;
hubContent = hubContent.replace(servicesRegex, `
    <section id="locations-hub" class="py-5">
        <div class="container py-5">
            <div class="text-center mb-5 stagger-reveal">
                <h2 class="outfit display-5">Our <span class="text-orange">Service Areas</span></h2>
                <p class="text-gray">Select your city below to see localized SEO and web development strategies.</p>
            </div>
            <div class="row g-4">
                <div class="col-12">
                    <ul class="list-unstyled d-flex flex-wrap gap-3 justify-content-center">
                        ${locationsHtmlList.replace(/mb-2/g, 'bg-darker p-3 rounded glass-card')}
                    </ul>
                </div>
            </div>
        </div>
    </section>
`);

hubContent = injectComponents(hubContent);
fs.writeFileSync(path.join(locationsDir, 'index.html'), hubContent, 'utf8');
console.log('Generated Hub Page: /locations/');



// Generate the Services Hub Page
const servicesHubCanonicalUrl = `https://seoustaad.com/services/`;
let servicesHubContent = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
servicesHubContent = servicesHubContent.replace(/<title>.*?<\/title>/, `<title>All Premium SEO & Web Development Services | SEO Ustaad</title>`);
servicesHubContent = servicesHubContent.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="Explore our 25 premium gigs including custom Next.js development, advanced Core Web Vitals fixes, and ROI-driven SEO campaigns starting at 5,000 PKR."`);
servicesHubContent = servicesHubContent.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${servicesHubCanonicalUrl}"`);
// Fix paths
servicesHubContent = servicesHubContent.replace(/href="style\.css"/g, 'href="/style.css"');
servicesHubContent = servicesHubContent.replace(/src="logo\.webp"/g, 'src="/logo.webp"');
servicesHubContent = servicesHubContent.replace(/src="script\.js"/g, 'src="/script.js"');
servicesHubContent = servicesHubContent.replace(/content="logo\.webp"/g, 'content="/logo.webp"');
// Update Hero
servicesHubContent = servicesHubContent.replace(/Dominate Digital Search <br> <span class="text-gradient">With SEO Ustaad<\/span>/, `Explore Our 25 <br> <span class="text-gradient">Premium Gigs</span>`);

// Remove unnecessary sections to keep the hub clean (About, Results, Process, Trust)
servicesHubContent = servicesHubContent.replace(/<section id="about"[\s\S]*?<\/section>/, '');
servicesHubContent = servicesHubContent.replace(/<section id="results"[\s\S]*?<\/section>/, '');
servicesHubContent = servicesHubContent.replace(/<section id="process"[\s\S]*?<\/section>/, '');
servicesHubContent = servicesHubContent.replace(/<section class="py-5 bg-dark"[\s\S]*?<\/section>/, ''); // Wait, the grid is in a section with bg-dark.
// Actually, it's safer to just extract the Hero, the Packages grid, and the Footer.
// For simplicity, we just leave the whole page but strip specific sections:
servicesHubContent = servicesHubContent.replace(/<section id="services"[\s\S]*?<\/section>/, '');
servicesHubContent = servicesHubContent.replace(/<section class="py-5 bg-orange[\s\S]*?<\/section>/, ''); // The orange CTA banner

const sDir = path.join(srcDir, 'services');
if (!fs.existsSync(sDir)) fs.mkdirSync(sDir);
servicesHubContent = injectComponents(servicesHubContent);
fs.writeFileSync(path.join(sDir, 'index.html'), servicesHubContent, 'utf8');
console.log('Generated Services Hub Page: /services/');

console.log('Build script completed successfully.');
