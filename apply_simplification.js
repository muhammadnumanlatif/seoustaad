const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const indexFile = path.join(srcDir, 'index.html');
const cityTemplateFile = path.join(srcDir, 'city-template.html');

// The new 25 gigs data
const gigs = [
    // Web Development
    { name: "Website Speed Optimization", price: "5,000 PKR", category: "web", slug: "website-speed-optimization" },
    { name: "E-Commerce Bug Fixing & Tweaks", price: "10,000 PKR", category: "web", slug: "ecommerce-bug-fixing" },
    { name: "Premium Custom WordPress development full website", price: "15,000 PKR", category: "web", slug: "premium-custom-wordpress-website" },
    { name: "Premium custom Shopify Store development and Setup", price: "25,000 PKR", category: "web", slug: "premium-custom-shopify-store" },
    { name: "Custom Next.js full website [for any niche]", price: "30,000 PKR", category: "web", slug: "custom-nextjs-website" },

    // Technical & On-Page SEO
    { name: "Premium Disavow Toxic Backlinks & Penalty Recovery", price: "5,000 PKR", category: "seo", slug: "disavow-toxic-backlinks" },
    { name: "Premium Schema Markup & Advanced Structured Data", price: "8,000 PKR", category: "seo", slug: "premium-schema-markup" },
    { name: "Comprehensive Keyword Research & Competitor Gap Analysis", price: "10,000 PKR", category: "seo", slug: "comprehensive-keyword-research" },
    { name: "Premium Technical SEO Audit & Action Plan", price: "15,000 PKR", category: "seo", slug: "premium-technical-seo-audit" },
    { name: "Complete On-Page SEO Optimization [up to 10 Pages]", price: "20,000 PKR", category: "seo", slug: "complete-onpage-seo-optimization" },
    { name: "Advanced Core Web Vitals & PageSpeed Fixes", price: "25,000 PKR", category: "seo", slug: "advanced-core-web-vitals" },

    // Local SEO
    { name: "Premium Local Citations & High-DA Directory Listings", price: "8,000 PKR", category: "local", slug: "premium-local-citations" },
    { name: "Premium Google Business Profile (GMB) Setup & Ranking", price: "10,000 PKR", category: "local", slug: "premium-gmb-setup" },
    { name: "Highly-Converting Geo-Targeted Landing Page Copywriting", price: "15,000 PKR", category: "local", slug: "geo-targeted-landing-page-copy" },
    { name: "Premium Local SEO Monthly Retainer [Dominate your City]", price: "20,000 PKR", category: "local", slug: "premium-local-seo-retainer" },

    // E-Commerce SEO
    { name: "Premium Shopify/WooCommerce Product SEO [20 Products]", price: "15,000 PKR", category: "ecom", slug: "premium-ecommerce-product-seo" },
    { name: "Complete E-Commerce Category Page Optimization", price: "20,000 PKR", category: "ecom", slug: "complete-ecommerce-category-seo" },
    { name: "Advanced Conversion Rate Optimization (CRO) Audit", price: "25,000 PKR", category: "ecom", slug: "advanced-cro-audit" },
    { name: "Premium E-Commerce Architecture & Silo Restructure", price: "30,000 PKR", category: "ecom", slug: "premium-ecommerce-architecture" },

    // Link Building & SMM
    { name: "10 Premium Foundation Web 2.0 Backlinks", price: "5,000 PKR", category: "smm", slug: "premium-web20-backlinks" },
    { name: "Advanced Competitor Backlink Intercept Strategy", price: "10,000 PKR", category: "smm", slug: "competitor-backlink-intercept" },
    { name: "High-Converting Ad Copywriting & Creative Strategy", price: "15,000 PKR", category: "smm", slug: "high-converting-ad-copywriting" },
    { name: "Premium Meta Ads Campaign Setup & Targeting", price: "20,000 PKR", category: "smm", slug: "premium-meta-ads-campaign" },
    { name: "5 Ultra High-DR Guest Post Backlinks [Contextual]", price: "25,000 PKR", category: "smm", slug: "high-dr-guest-posts" },
    { name: "Premium Social Media Management [Full Month / 3 Posts Wk]", price: "30,000 PKR", category: "smm", slug: "premium-social-media-management" }
];

const tabsHTML = `
    <!-- 25 Premium Gigs Animated Tabbed Grid -->
    <section id="packages" class="py-5 bg-dark">
        <div class="container py-5">
            <div class="text-center mb-5 stagger-reveal">
                <h2 class="outfit display-5">The 25 Premium <span class="text-orange">Gigs</span></h2>
                <p class="text-gray">From technical SEO to full-stack development, structured for massive ROI.</p>
                
                <!-- Modern Nav Tabs -->
                <ul class="nav nav-pills justify-content-center gap-2 mt-4" id="gigTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn btn-outline-orange active px-4 rounded-pill" id="web-tab" data-bs-toggle="pill" data-bs-target="#pills-web" type="button" role="tab" aria-selected="true">Web Dev</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn btn-outline-orange px-4 rounded-pill" id="seo-tab" data-bs-toggle="pill" data-bs-target="#pills-seo" type="button" role="tab" aria-selected="false">Tech SEO</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn btn-outline-orange px-4 rounded-pill" id="local-tab" data-bs-toggle="pill" data-bs-target="#pills-local" type="button" role="tab" aria-selected="false">Local SEO</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn btn-outline-orange px-4 rounded-pill" id="ecom-tab" data-bs-toggle="pill" data-bs-target="#pills-ecom" type="button" role="tab" aria-selected="false">E-Commerce</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn btn-outline-orange px-4 rounded-pill" id="smm-tab" data-bs-toggle="pill" data-bs-target="#pills-smm" type="button" role="tab" aria-selected="false">SMM & Links</button>
                    </li>
                </ul>
            </div>

            <!-- Tab Content (Cards) -->
            <div class="tab-content" id="gigTabsContent">
                ${['web', 'seo', 'local', 'ecom', 'smm'].map((cat, index) => `
                <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="pills-${cat}" role="tabpanel" tabindex="0">
                    <div class="row g-4">
                        ${gigs.filter(g => g.category === cat).map(gig => {
                            const waText = encodeURIComponent(`Hi SEO Ustaad! I am ready to order the ${gig.name} gig for ${gig.price}. Let's discuss details.`);
                            return `
                            <div class="col-lg-4 col-md-6 stagger-reveal fade-in-up">
                                <div class="glass-card h-100 rounded-4 border border-secondary border-opacity-25 p-4 d-flex flex-column hover-lift">
                                    <h4 class="text-white outfit mb-3">${gig.name}</h4>
                                    <div class="d-flex align-items-end gap-2 mb-4">
                                        <span class="fs-2 fw-bold text-orange outfit lh-1">${gig.price.split(' ')[0]}</span>
                                        <span class="text-gray small mb-1">PKR</span>
                                    </div>
                                    <ul class="list-unstyled text-gray small mb-4 flex-grow-1">
                                        <li class="mb-2"><i class="fas fa-check text-success me-2"></i> Generative Engine Optimized</li>
                                        <li class="mb-2"><i class="fas fa-check text-success me-2"></i> Direct Local Authority</li>
                                        <li class="mb-2"><i class="fas fa-check text-success me-2"></i> Priority Delivery</li>
                                    </ul>
                                    <div class="d-flex flex-column gap-2 mt-auto">
                                        <a href="https://wa.me/923379912300?text=${waText}" target="_blank" class="btn btn-orange w-100 fw-bold">Order via WhatsApp</a>
                                        <a href="/services/${gig.slug}/" class="btn btn-outline-light w-100 btn-sm">View Details</a>
                                    </div>
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
`;

function replacePackagesSection(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const packagesRegex = /<section id="packages" class="py-5">[\s\S]*?<\/section>/;
    if (content.match(packagesRegex)) {
        content = content.replace(packagesRegex, tabsHTML);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated packages section in ${filePath}`);
    }
}

replacePackagesSection(indexFile);
replacePackagesSection(cityTemplateFile);

// Create service-template.html (Copy of city-template.html, we'll use it in build.js)
fs.copyFileSync(cityTemplateFile, path.join(srcDir, 'service-template.html'));
console.log('Created service-template.html');

// Export gigs to a JSON file so build.js and update_nav.js can use them
fs.writeFileSync(path.join(srcDir, 'gigs.json'), JSON.stringify(gigs, null, 2));

// Update build.js to generate service pages
let buildScript = fs.readFileSync(path.join(srcDir, 'build.js'), 'utf8');

// Insert gigs require if not present
if (!buildScript.includes('gigs.json')) {
    buildScript = buildScript.replace("const fs = require('fs');\nconst path = require('path');", "const fs = require('fs');\nconst path = require('path');\nconst gigs = require('./gigs.json');");
}

// Insert service generation logic before sitemap generation
const serviceLogic = `
// Generate Service Pages (The 25 Gigs)
const serviceTemplate = fs.readFileSync(path.join(srcDir, 'service-template.html'), 'utf8');
const servicesDir = path.join(srcDir, 'services');
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir);

gigs.forEach(gig => {
    const gigDir = path.join(servicesDir, gig.slug);
    if (!fs.existsSync(gigDir)) fs.mkdirSync(gigDir);
    
    let gigContent = serviceTemplate;
    // Basic replacements (you could make these far more robust)
    gigContent = gigContent.replace(/<title>.*?<\\/title>/, \`<title>\${gig.name} | SEO Ustaad</title>\`);
    gigContent = gigContent.replace(/<meta name="description" content=".*?">/, \`<meta name="description" content="Premium \${gig.name} starting at \${gig.price}. Order directly via WhatsApp.">\`);
    
    // Replace Hero H1
    gigContent = gigContent.replace(/<h1 class="display-3[^>]*>.*?<\\/h1>/s, \`<h1 class="display-3 fw-bold text-white mb-4 outfit lh-sm">\${gig.name} <br> <span class="text-gradient">Only \${gig.price}</span></h1>\`);
    
    fs.writeFileSync(path.join(gigDir, 'index.html'), gigContent, 'utf8');
    
    // Add to sitemap and llms.txt
    urls.push(\`/services/\${gig.slug}/\`);
    console.log(\`Generated service page: /services/\${gig.slug}/\`);
});
`;

if (!buildScript.includes('// Generate Service Pages')) {
    buildScript = buildScript.replace('// --- SEO Files Generation ---', serviceLogic + '\n\n// --- SEO Files Generation ---');
    fs.writeFileSync(path.join(srcDir, 'build.js'), buildScript, 'utf8');
}

// Update update_nav.js to include the mega menus for the 25 services
let navScript = fs.readFileSync(path.join(srcDir, 'update_nav.js'), 'utf8');
if (!navScript.includes('gigs.json')) {
    navScript = navScript.replace("const fs = require('fs');\nconst path = require('path');", "const fs = require('fs');\nconst path = require('path');\nconst gigs = require('./gigs.json');");
}

const navUpdateRegex = /const servicesMenuHTML = `[\s\S]*?`;/;
const newServicesMenu = `const servicesMenuHTML = \`
<!-- 25 Service Silos Mega Menu -->
<div class="row g-4 p-3">
    \${['web', 'seo', 'local', 'ecom', 'smm'].map(cat => {
        const catTitles = { web: "Web Development", seo: "Technical SEO", local: "Local SEO", ecom: "E-Commerce", smm: "SMM & Links" };
        return \`
        <div class="col-lg-3">
            <h6 class="text-orange outfit fw-bold mb-3">\${catTitles[cat]}</h6>
            <ul class="list-unstyled mb-0">
                \${gigs.filter(g => g.category === cat).slice(0, 5).map(g => \`
                <li class="mb-2"><a href="/services/\${g.slug}/" class="text-decoration-none text-light hover-orange small"><i class="fas fa-angle-right me-2 text-secondary"></i>\${g.name.substring(0, 30)}...</a></li>
                \`).join('')}
            </ul>
        </div>
        \`;
    }).join('')}
</div>\`;`;

if (navScript.match(navUpdateRegex)) {
    navScript = navScript.replace(navUpdateRegex, newServicesMenu);
    fs.writeFileSync(path.join(srcDir, 'update_nav.js'), navScript, 'utf8');
    console.log('update_nav.js modified to include service silos in mega menu');
}

console.log('Simplification applied successfully.');
