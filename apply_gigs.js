const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const scriptFile = path.join(srcDir, 'script.js');
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

// The new 25 gigs data
const newGigsData = `
const packagesData = [
    // Web Development
    { name: "Website Speed Optimization", price: "5,000 PKR", category: "web", features: ["Core Web Vitals Boost", "Image Compression", "Caching Setup"] },
    { name: "E-Commerce Bug Fixing & Tweaks", price: "10,000 PKR", category: "web", features: ["Shopify/WooCommerce Bugs", "CSS Layout Fixes", "Checkout Optimization"] },
    { name: "Premium Custom WordPress development full website", price: "15,000 PKR", category: "web", features: ["100% Responsive Design", "Premium Theme Setup", "Speed Optimized"] },
    { name: "Premium custom Shopify Store development and Setup", price: "25,000 PKR", category: "web", features: ["Premium Liquid Theme", "Product Setup", "Payment Gateway Integration"] },
    { name: "Custom Next.js full website [for any niche]", price: "30,000 PKR", category: "web", features: ["React / Next.js Framework", "API Integration", "Blazing Fast Speed"] },

    // Technical & On-Page SEO
    { name: "Premium Disavow Toxic Backlinks & Penalty Recovery", price: "5,000 PKR", category: "seo", features: ["Toxic Link Audit", "Disavow File Creation", "Google Search Console Update"] },
    { name: "Premium Schema Markup & Advanced Structured Data", price: "8,000 PKR", category: "seo", features: ["LocalBusiness Schema", "Product Schema", "FAQ Snippet Coding"] },
    { name: "Comprehensive Keyword Research & Competitor Gap Analysis", price: "10,000 PKR", category: "seo", features: ["500+ Keywords", "Search Intent Mapping", "Competitor Matrix"] },
    { name: "Premium Technical SEO Audit & Action Plan", price: "15,000 PKR", category: "seo", features: ["Crawl Error Fixes", "Indexability Check", "Architecture Review"] },
    { name: "Complete On-Page SEO Optimization [up to 10 Pages]", price: "20,000 PKR", category: "seo", features: ["Title/Meta Tags", "Header Tags Hierarchy", "Internal Linking"] },
    { name: "Advanced Core Web Vitals & PageSpeed Fixes", price: "25,000 PKR", category: "seo", features: ["LCP Optimization", "CLS Reduction", "INP Improvements"] },

    // Local SEO
    { name: "Premium Local Citations & High-DA Directory Listings", price: "8,000 PKR", category: "local", features: ["50+ Local Citations", "NAP Consistency", "Map Pack Boost"] },
    { name: "Premium Google Business Profile (GMB) Setup & Ranking", price: "10,000 PKR", category: "local", features: ["Profile Verification", "Geo-tagged Images", "Q&A Setup"] },
    { name: "Highly-Converting Geo-Targeted Landing Page Copywriting", price: "15,000 PKR", category: "local", features: ["Location specific Copy", "High Conversion Rate", "Entity Rich Content"] },
    { name: "Premium Local SEO Monthly Retainer [Dominate your City]", price: "20,000 PKR", category: "local", features: ["Monthly Citation Building", "GMB Management", "Local Backlinks"] },

    // E-Commerce SEO
    { name: "Premium Shopify/WooCommerce Product SEO [20 Products]", price: "15,000 PKR", category: "ecom", features: ["Product Descriptions", "Image Alt Tags", "Schema Setup"] },
    { name: "Complete E-Commerce Category Page Optimization", price: "20,000 PKR", category: "ecom", features: ["Category Descriptions", "Internal Silo Links", "Faceted Navigation SEO"] },
    { name: "Advanced Conversion Rate Optimization (CRO) Audit", price: "25,000 PKR", category: "ecom", features: ["UX Heatmaps", "Checkout Flow Review", "A/B Testing Ideas"] },
    { name: "Premium E-Commerce Architecture & Silo Restructure", price: "30,000 PKR", category: "ecom", features: ["URL Restructuring", "Taxonomy Optimization", "Pagination Fixes"] },

    // Link Building & SMM
    { name: "10 Premium Foundation Web 2.0 Backlinks", price: "5,000 PKR", category: "smm", features: ["High DA Blogs", "Contextual Links", "100% Manual Placement"] },
    { name: "Advanced Competitor Backlink Intercept Strategy", price: "10,000 PKR", category: "smm", features: ["Competitor Audit", "Outreach List", "Link Gap Execution"] },
    { name: "High-Converting Ad Copywriting & Creative Strategy", price: "15,000 PKR", category: "smm", features: ["3 Ad Variations", "Hook & CTA Design", "Targeting Advice"] },
    { name: "Premium Meta Ads Campaign Setup & Targeting", price: "20,000 PKR", category: "smm", features: ["Pixel Installation", "Custom Audiences", "Retargeting Setup"] },
    { name: "5 Ultra High-DR Guest Post Backlinks [Contextual]", price: "25,000 PKR", category: "smm", features: ["DR 50+ Sites", "Real Traffic Blogs", "Dofollow Links"] },
    { name: "Premium Social Media Management [Full Month / 3 Posts Wk]", price: "30,000 PKR", category: "smm", features: ["12 Custom Posts", "Hashtag Strategy", "Community Engagement"] }
];`;

// Replace packagesData definition in script.js
const regexData = /const packagesData = \[[\s\S]*?\];/;
if (scriptContent.match(regexData)) {
    scriptContent = scriptContent.replace(regexData, newGigsData);
}

// Modify renderPackages to only filter by category, removing tier logic
scriptContent = scriptContent.replace(/let filtered = packagesData\.filter\(p => p\.tier === currentTier\);/, 'let filtered = packagesData;');

fs.writeFileSync(scriptFile, scriptContent, 'utf8');
console.log('script.js updated with 25 Gigs');

// Update index.html
const indexFile = path.join(srcDir, 'index.html');
let indexContent = fs.readFileSync(indexFile, 'utf8');

// Replace the tier and service filters in index.html
const oldFilters = /<!-- Tier Navigation -->[\s\S]*?<!-- Package Grid Container -->/;
const newFilters = `<!-- Service Filters -->
                <div class="d-flex flex-wrap justify-content-center gap-2 mt-4" id="serviceFilters">
                    <button class="btn btn-sm btn-outline-orange active" data-service="all">All Services</button>
                    <button class="btn btn-sm btn-outline-orange" data-service="web">Web Development</button>
                    <button class="btn btn-sm btn-outline-orange" data-service="seo">SEO & Tech</button>
                    <button class="btn btn-sm btn-outline-orange" data-service="local">Local SEO</button>
                    <button class="btn btn-sm btn-outline-orange" data-service="ecom">E-Commerce</button>
                    <button class="btn btn-sm btn-outline-orange" data-service="smm">Link Building & SMM</button>
                </div>
            </div>

            <!-- Package Grid Container -->`;
indexContent = indexContent.replace(oldFilters, newFilters);
fs.writeFileSync(indexFile, indexContent, 'utf8');
console.log('index.html updated with new filters');

// Create city-template.html based on index.html
let cityTemplateContent = indexContent;

// Replace Hero Section with 5-step form
const oldHeroRegex = /<header class="hero-section">[\s\S]*?<\/header>/;
const newHero = `
<header class="hero-section" style="padding-top:120px;">
    <div class="hero-orb hero-orb-1"></div>
    <div class="hero-orb hero-orb-2"></div>
    <div class="container position-relative z-2">
        <div class="row align-items-center g-5">
            <div class="col-lg-6 text-center text-lg-start stagger-reveal">
                <div class="badge bg-white bg-opacity-10 border border-white border-opacity-25 px-3 py-2 rounded-pill mb-4 text-white small d-inline-flex align-items-center mx-auto mx-lg-0 glow-effect">
                    <span class="pulse-dot bg-success rounded-circle me-2"></span> Top Rated Agency
                </div>
                <h1 class="display-3 fw-bold text-white mb-4 outfit lh-sm">
                    Dominate Digital Search <br> <span class="text-gradient">With SEO Ustaad</span>
                </h1>
                <p class="lead text-gray mb-5">
                    Premium local SEO and Web Development services starting at just 5,000 PKR.
                </p>
                <div class="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                    <a href="#services" class="btn btn-outline-light px-4 py-3 fw-semibold">View Our 25 Premium Gigs</a>
                </div>
            </div>

            <!-- 5-Step WhatsApp Form -->
            <div class="col-lg-6 stagger-reveal">
                <div class="glass-card p-4 p-lg-5 rounded-5 border border-secondary border-opacity-25 position-relative overflow-hidden glow-form">
                    <h3 class="text-white fw-bold mb-4 outfit">Start Your Campaign</h3>
                    <form id="waForm" onsubmit="submitWaForm(event)">
                        <!-- Step 1 -->
                        <div class="form-step" id="step1">
                            <label class="text-gray mb-2">1. Contact Info</label>
                            <input type="text" class="form-control bg-dark text-white border-secondary mb-3" id="waName" placeholder="Your Name" required>
                            <input type="text" class="form-control bg-dark text-white border-secondary mb-3" id="waPhone" placeholder="WhatsApp Number" required>
                            <button type="button" class="btn btn-orange w-100" onclick="nextStep(2)">Next Step</button>
                        </div>
                        <!-- Step 2 -->
                        <div class="form-step d-none" id="step2">
                            <label class="text-gray mb-2">2. Business Context</label>
                            <input type="text" class="form-control bg-dark text-white border-secondary mb-3" id="waBiz" placeholder="Business Type (e.g. Retail, Service)" required>
                            <input type="text" class="form-control bg-dark text-white border-secondary mb-3" id="waSite" placeholder="Website URL (Optional)">
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-outline-light w-50" onclick="nextStep(1)">Back</button>
                                <button type="button" class="btn btn-orange w-50" onclick="nextStep(3)">Next</button>
                            </div>
                        </div>
                        <!-- Step 3 -->
                        <div class="form-step d-none" id="step3">
                            <label class="text-gray mb-2">3. Select Your Primary Gig</label>
                            <select class="form-select bg-dark text-white border-secondary mb-3" id="waGig" required>
                                <option value="">Select a Gig...</option>
                                <option value="Website Speed Optimization (5k)">Website Speed Optimization (5,000 PKR)</option>
                                <option value="E-Commerce Bug Fixing & Tweaks (10k)">E-Commerce Bug Fixing & Tweaks (10,000 PKR)</option>
                                <option value="Premium Custom WordPress full website (15k)">Premium Custom WordPress full website (15,000 PKR)</option>
                                <option value="Premium custom Shopify Store Setup (25k)">Premium custom Shopify Store Setup (25,000 PKR)</option>
                                <option value="Custom Next.js full website (30k)">Custom Next.js full website (30,000 PKR)</option>
                                <option value="Premium Disavow Toxic Backlinks (5k)">Premium Disavow Toxic Backlinks (5,000 PKR)</option>
                                <option value="Premium Schema Markup (8k)">Premium Schema Markup (8,000 PKR)</option>
                                <option value="Comprehensive Keyword Research (10k)">Comprehensive Keyword Research (10,000 PKR)</option>
                                <option value="Premium Technical SEO Audit (15k)">Premium Technical SEO Audit (15,000 PKR)</option>
                                <option value="Complete On-Page SEO (20k)">Complete On-Page SEO (20,000 PKR)</option>
                                <option value="Advanced Core Web Vitals Fixes (25k)">Advanced Core Web Vitals Fixes (25,000 PKR)</option>
                                <option value="Premium Local Citations (8k)">Premium Local Citations (8,000 PKR)</option>
                                <option value="Premium Google Business Profile Setup (10k)">Premium Google Business Profile Setup (10,000 PKR)</option>
                                <option value="Highly-Converting Geo-Targeted Copywriting (15k)">Highly-Converting Geo-Targeted Copywriting (15,000 PKR)</option>
                                <option value="Premium Local SEO Monthly Retainer (20k)">Premium Local SEO Monthly Retainer (20,000 PKR)</option>
                                <option value="Premium Shopify Product SEO (15k)">Premium Shopify Product SEO (15,000 PKR)</option>
                                <option value="Complete E-Commerce Category SEO (20k)">Complete E-Commerce Category SEO (20,000 PKR)</option>
                                <option value="Advanced CRO Audit (25k)">Advanced CRO Audit (25,000 PKR)</option>
                                <option value="Premium E-Commerce Architecture Restructure (30k)">Premium E-Commerce Architecture Restructure (30,000 PKR)</option>
                                <option value="10 Premium Foundation Web 2.0 Backlinks (5k)">10 Premium Foundation Web 2.0 Backlinks (5,000 PKR)</option>
                                <option value="Advanced Competitor Backlink Intercept (10k)">Advanced Competitor Backlink Intercept (10,000 PKR)</option>
                                <option value="High-Converting Ad Copywriting (15k)">High-Converting Ad Copywriting (15,000 PKR)</option>
                                <option value="Premium Meta Ads Campaign Setup (20k)">Premium Meta Ads Campaign Setup (20,000 PKR)</option>
                                <option value="5 Ultra High-DR Guest Post Backlinks (25k)">5 Ultra High-DR Guest Post Backlinks (25,000 PKR)</option>
                                <option value="Premium Social Media Management (30k)">Premium Social Media Management (30,000 PKR)</option>
                            </select>
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-outline-light w-50" onclick="nextStep(2)">Back</button>
                                <button type="button" class="btn btn-orange w-50" onclick="nextStep(4)">Next</button>
                            </div>
                        </div>
                        <!-- Step 4 -->
                        <div class="form-step d-none" id="step4">
                            <label class="text-gray mb-2">4. Monthly Budget</label>
                            <select class="form-select bg-dark text-white border-secondary mb-3" id="waBudget" required>
                                <option value="5,000 - 10,000 PKR">5,000 - 10,000 PKR</option>
                                <option value="10,000 - 20,000 PKR">10,000 - 20,000 PKR</option>
                                <option value="20,000 - 30,000+ PKR">20,000 - 30,000+ PKR</option>
                            </select>
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-outline-light w-50" onclick="nextStep(3)">Back</button>
                                <button type="button" class="btn btn-orange w-50" onclick="nextStep(5)">Next</button>
                            </div>
                        </div>
                        <!-- Step 5 -->
                        <div class="form-step d-none" id="step5">
                            <label class="text-gray mb-2">5. What is your biggest challenge?</label>
                            <textarea class="form-control bg-dark text-white border-secondary mb-3" id="waChallenge" rows="3" placeholder="Describe your main bottleneck..."></textarea>
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-outline-light w-50" onclick="nextStep(4)">Back</button>
                                <button type="submit" class="btn btn-success w-50">Connect on WhatsApp</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</header>
<script>
function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.add('d-none'));
    document.getElementById('step' + step).classList.remove('d-none');
}
function submitWaForm(e) {
    e.preventDefault();
    const name = document.getElementById('waName').value;
    const phone = document.getElementById('waPhone').value;
    const biz = document.getElementById('waBiz').value;
    const site = document.getElementById('waSite').value;
    const gig = document.getElementById('waGig').value;
    const budget = document.getElementById('waBudget').value;
    const challenge = document.getElementById('waChallenge').value;
    
    const msg = \`Hi SEO Ustaad! I want to dominate search.\\n\\n*Name:* \${name}\\n*Phone:* \${phone}\\n*Business:* \${biz}\\n*Website:* \${site}\\n*Target Gig:* \${gig}\\n*Budget:* \${budget}\\n*Challenge:* \${challenge}\`;
    
    // Redirect to Thank you modal (simple alert for now) then WhatsApp
    alert("Thank you! You are now being redirected to WhatsApp.");
    window.open('https://wa.me/923379912300?text=' + encodeURIComponent(msg), '_blank');
}
</script>
`;
cityTemplateContent = cityTemplateContent.replace(oldHeroRegex, newHero);

// Add GEO About Us section
const aboutUsHTML = `
    <section id="about-us" class="py-5 bg-darker">
        <div class="container py-5">
            <div class="row align-items-center g-5">
                <div class="col-lg-6">
                    <h2 class="outfit display-5">Local Authority <span class="text-orange">You Can Trust</span></h2>
                    <p class="text-gray lead mt-3">We don't just do basic SEO. We engineer generative engine optimized entities that rank on Google, ChatGPT, and Gemini.</p>
                    <ul class="list-unstyled text-white mt-4">
                        <li class="mb-3"><i class="fas fa-check-circle text-orange me-2"></i> Over 1,000+ Local Businesses Scaled</li>
                        <li class="mb-3"><i class="fas fa-check-circle text-orange me-2"></i> Data-Driven 25-Gig Methodology</li>
                        <li class="mb-3"><i class="fas fa-check-circle text-orange me-2"></i> Transparent Pricing (5k - 30k PKR)</li>
                    </ul>
                </div>
                <div class="col-lg-6 text-center">
                    <img src="/logo.webp" alt="SEO Ustaad Local Authority" class="img-fluid rounded-4 shadow-lg opacity-75" style="max-width:300px; mix-blend-mode: screen;">
                </div>
            </div>
        </div>
    </section>
`;

// Insert after hero
cityTemplateContent = cityTemplateContent.replace('</header>', '</header>' + aboutUsHTML);

// Pre-footer CTA
const preFooterHTML = `
    <section class="py-5 bg-orange text-center position-relative overflow-hidden">
        <div class="container position-relative z-2">
            <h2 class="outfit display-5 text-white fw-bold mb-3">Ready to Dominate Search?</h2>
            <p class="text-dark fw-bold mb-4">Send us a query on WhatsApp and let's start scaling your traffic today.</p>
            <a href="https://wa.me/923379912300" class="btn btn-dark btn-lg px-5 py-3 rounded-pill fw-bold hover-glow">Chat on WhatsApp: 923379912300</a>
        </div>
    </section>
`;

cityTemplateContent = cityTemplateContent.replace('<footer', preFooterHTML + '\n<footer');

fs.writeFileSync(path.join(srcDir, 'city-template.html'), cityTemplateContent, 'utf8');
console.log('city-template.html created with 5-step form and GEO sections');

// Update build.js to use city-template.html for locations
let buildScriptContent = fs.readFileSync(path.join(srcDir, 'build.js'), 'utf8');
buildScriptContent = buildScriptContent.replace(
    /const templatePath = path\.join\(srcDir, 'index\.html'\);/,
    "const templatePath = path.join(srcDir, 'city-template.html');"
);

// We must also prevent the hub page from using city-template.html because it's massive. The hub page should probably just use index.html
buildScriptContent = buildScriptContent.replace(
    /let hubContent = template;/,
    "let hubContent = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');"
);

fs.writeFileSync(path.join(srcDir, 'build.js'), buildScriptContent, 'utf8');
console.log('build.js updated to use city-template.html');
