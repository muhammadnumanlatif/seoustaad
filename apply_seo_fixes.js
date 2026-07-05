const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const htmlFiles = ['index.html', 'legal.html', 'package-details.html', 'city-template.html', 'service-template.html'];

// 1. Fix href="#" links in all HTML files
htmlFiles.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace href="#" with href="javascript:void(0)"
        content = content.replace(/href="#"/g, 'href="javascript:void(0)"');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed href="#" in ${file}`);
    }
});

// 2. Inject FAQ into city-template.html
const cityTemplatePath = path.join(srcDir, 'city-template.html');
if (fs.existsSync(cityTemplatePath)) {
    let content = fs.readFileSync(cityTemplatePath, 'utf8');
    
    // Inject the massive FAQ before the final footer CTA
    if (!content.includes('id="seo-faq"')) {
        const faqSection = `
    <!-- Dedicated SEO FAQ for Word Count & Content Quality -->
    <section id="seo-faq" class="py-5 bg-dark border-top border-secondary">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-10 text-white">
                    <h2 class="display-5 outfit fw-bold mb-4">Why __CITY__ Businesses Need Affordable WordPress Developers & Local SEO</h2>
                    <p class="text-gray lead mb-5">
                        In today's fiercely competitive digital landscape, relying on outdated marketing tactics is no longer viable. For businesses in __CITY__, establishing a dominant online presence requires precision. This is where our premium eCommerce web design services and Local SEO strategies come into play. SEO Ustaad is dedicated to ensuring your brand doesn't just exist online, but actively captures high-intent traffic and converts leads into paying customers.
                    </p>
                    
                    <div class="accordion accordion-flush bg-transparent" id="faqAccordion">
                        <div class="accordion-item bg-transparent border-secondary mb-3">
                            <h3 class="accordion-header" id="faqHeadingOne">
                                <button class="accordion-button collapsed bg-darker text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-toggle="collapse" data-bs-target="#faqCollapseOne">
                                    Why is a local SEO consultant in __CITY__ crucial for my business?
                                </button>
                            </h3>
                            <div id="faqCollapseOne" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body text-gray">
                                    When potential customers search for services, they heavily rely on localized results. A local SEO consultant understands the specific market dynamics of __CITY__. By optimizing your Google Business Profile, building localized citations, and targeting geo-specific long-tail keywords, we ensure your business appears in the "Local Pack" and directly answers the queries of local consumers ready to make a purchase.
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item bg-transparent border-secondary mb-3">
                            <h3 class="accordion-header" id="faqHeadingTwo">
                                <button class="accordion-button collapsed bg-darker text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseTwo">
                                    How do your eCommerce web design services differ from the rest?
                                </button>
                            </h3>
                            <div id="faqCollapseTwo" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body text-gray">
                                    Our custom eCommerce web design services go far beyond aesthetics. We engineer websites from the ground up prioritizing Core Web Vitals, mobile-first responsiveness, and conversion rate optimization (CRO). For clients in __CITY__, we deploy lightning-fast, highly secure Shopify and WooCommerce environments tailored specifically to your target demographic and competitive niche.
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item bg-transparent border-secondary mb-3">
                            <h3 class="accordion-header" id="faqHeadingThree">
                                <button class="accordion-button collapsed bg-darker text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseThree">
                                    Can affordable WordPress developers deliver premium results?
                                </button>
                            </h3>
                            <div id="faqCollapseThree" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body text-gray">
                                    Absolutely. SEO Ustaad balances cost-efficiency with high-tier architecture. Our affordable WordPress developers utilize modern tech stacks, headless architecture options, and semantic HTML5 to build platforms that Google loves. We don't rely on bloated templates; we handcraft scalable platforms ensuring that your business in __CITY__ gets enterprise-grade performance at an accessible 5,000 PKR starting point.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-5 p-4 bg-darker rounded border border-orange shadow-lg text-center">
                        <h4 class="text-white fw-bold">Ready to Dominate __CITY__?</h4>
                        <p class="text-gray mb-4">Partner with Pakistan's premier Generative Engine Optimization agency. Don't let your competitors steal your traffic.</p>
                        <a href="javascript:void(0)" class="btn btn-orange px-5 py-3 rounded-pill fw-bold fs-5">Get Started Today</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
        content = content.replace(/<\/main>/, `${faqSection}\n</main>`);
        fs.writeFileSync(cityTemplatePath, content, 'utf8');
        console.log('Injected SEO FAQ into city-template.html');
    }
}

// 3. Inject FAQ into service-template.html
const serviceTemplatePath = path.join(srcDir, 'service-template.html');
if (fs.existsSync(serviceTemplatePath)) {
    let content = fs.readFileSync(serviceTemplatePath, 'utf8');
    
    // Inject the massive FAQ before the final footer CTA
    if (!content.includes('id="seo-faq"')) {
        const faqSection = `
    <!-- Dedicated SEO FAQ for Word Count & Content Quality -->
    <section id="seo-faq" class="py-5 bg-dark border-top border-secondary">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-10 text-white">
                    <h2 class="display-5 outfit fw-bold mb-4">Mastering __GIG_NAME__ for Maximum ROI</h2>
                    <p class="text-gray lead mb-5">
                        In the constantly evolving digital economy, standard solutions fall short. Professional __GIG_NAME__ is not just about checking boxes; it's about deploying a data-driven strategy that actively improves your search visibility and user experience. Whether you are a local startup or a major corporation, investing in __GIG_NAME__ guarantees a scalable foundation designed to intercept your competitors' traffic and drive sustainable revenue.
                    </p>
                    
                    <div class="accordion accordion-flush bg-transparent" id="faqAccordion">
                        <div class="accordion-item bg-transparent border-secondary mb-3">
                            <h3 class="accordion-header" id="faqHeadingOne">
                                <button class="accordion-button collapsed bg-darker text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseOne">
                                    What exactly does the __GIG_NAME__ service entail?
                                </button>
                            </h3>
                            <div id="faqCollapseOne" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body text-gray">
                                    Our __GIG_NAME__ service provides a highly specialized, granular approach to your digital infrastructure. We utilize industry-leading analytics, deep-dive audits, and generative engine optimization to ensure your digital assets are perfectly aligned with Google's latest algorithms. This means cleaner code, highly optimized semantic structures, and a clear path to ranking domination.
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item bg-transparent border-secondary mb-3">
                            <h3 class="accordion-header" id="faqHeadingTwo">
                                <button class="accordion-button collapsed bg-darker text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseTwo">
                                    How quickly can I expect to see results from __GIG_NAME__?
                                </button>
                            </h3>
                            <div id="faqCollapseTwo" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body text-gray">
                                    While search engines generally require 4 to 8 weeks to fully index and reward structural changes, the implementation of __GIG_NAME__ sets an immediate foundation. Improvements in user engagement, bounce rate reductions, and enhanced indexing speeds are often observed much sooner. We focus on long-term, sustainable authority rather than fleeting metrics.
                                </div>
                            </div>
                        </div>
                        
                        <div class="accordion-item bg-transparent border-secondary mb-3">
                            <h3 class="accordion-header" id="faqHeadingThree">
                                <button class="accordion-button collapsed bg-darker text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapseThree">
                                    Why is __GIG_NAME__ priced starting at __GIG_PRICE__?
                                </button>
                            </h3>
                            <div id="faqCollapseThree" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body text-gray">
                                    Quality requires precision. Starting at __GIG_PRICE__, you are investing in top-tier talent, enterprise-grade tools, and meticulous execution. We refuse to cut corners. Our affordable yet premium pricing model ensures you receive unparalleled value without compromising on the depth and thoroughness required to outrank established competitors.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-5 p-4 bg-darker rounded border border-orange shadow-lg text-center">
                        <h4 class="text-white fw-bold">Secure Your __GIG_NAME__ Package</h4>
                        <p class="text-gray mb-4">Partner with Pakistan's premier Generative Engine Optimization agency. Let's scale your digital presence.</p>
                        <a href="javascript:void(0)" class="btn btn-orange px-5 py-3 rounded-pill fw-bold fs-5">Order via WhatsApp Now</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
        content = content.replace(/<\/main>/, `${faqSection}\n</main>`);
        fs.writeFileSync(serviceTemplatePath, content, 'utf8');
        console.log('Injected SEO FAQ into service-template.html');
    }
}

// 4. Update build.js to replace the new dynamic placeholders
const buildJsPath = path.join(srcDir, 'build.js');
let buildJsContent = fs.readFileSync(buildJsPath, 'utf8');

if (!buildJsContent.includes('__CITY__')) {
    buildJsContent = buildJsContent.replace(
        /cityContent = cityContent\.replace\(\/Dominate Digital Search.*?;/s,
        `cityContent = cityContent.replace(/Dominate Digital Search <br> <span class="text-gradient">With SEO Ustaad<\\/span>/, \`Dominate Digital Search in \${city} <br> <span class="text-gradient">With SEO Ustaad</span>\`);\n    cityContent = cityContent.replace(/__CITY__/g, city);`
    );
}

if (!buildJsContent.includes('__GIG_NAME__')) {
    buildJsContent = buildJsContent.replace(
        /gigContent = gigContent\.replace\(\/<h1 class="display-3.*?;/s,
        `gigContent = gigContent.replace(/<h1 class="display-3[^>]*>.*?<\\/h1>/s, \`<h1 class="display-3 fw-bold text-white mb-4 outfit lh-sm">\${gig.name} <br> <span class="text-gradient">Only \${gig.price}</span></h1>\`);\n    gigContent = gigContent.replace(/__GIG_NAME__/g, gig.name);\n    gigContent = gigContent.replace(/__GIG_PRICE__/g, gig.price);`
    );
}

// 5. Update build.js to enforce trailing slashes on all generated URLs if needed.
// Actually, build.js already writes `<loc>https://seoustaad.com/locations/${slug}/</loc>`
// And for services `<loc>https://seoustaad.com${url}</loc>` where url is `/services/${gig.slug}/`
// The sitemap is correct. Let's make sure the footer links added by update_nav.js have trailing slashes.

fs.writeFileSync(buildJsPath, buildJsContent, 'utf8');
console.log('Updated build.js to inject FAQ parameters');

// 6. Fix missing trailing slashes in update_nav.js
const updateNavPath = path.join(srcDir, 'update_nav.js');
if (fs.existsSync(updateNavPath)) {
    let navContent = fs.readFileSync(updateNavPath, 'utf8');
    // Change /services/\${gig.slug} to /services/\${gig.slug}/
    navContent = navContent.replace(/\/services\/\$\{gig\.slug\}(?!\\\/)/g, '/services/${gig.slug}/');
    fs.writeFileSync(updateNavPath, navContent, 'utf8');
    console.log('Enforced trailing slashes in update_nav.js');
}

