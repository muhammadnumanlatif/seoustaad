const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const filesToProcess = ['index.html', 'legal.html', 'package-details.html', 'city-template.html', 'service-template.html'];

const megaMenuHTML = `
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item dropdown has-megamenu">
                        <a class="nav-link text-white dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-display="static">Services</a>
                        <div class="dropdown-menu megamenu shadow-sm p-3">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <h6 class="text-orange fw-bold mb-3">Top Development Services</h6>
                                    <ul class="list-unstyled mb-0">
                                        <li><a class="dropdown-item py-2" href="/services/custom-nextjs-website/">Custom Next.js Website</a></li>
                                        <li><a class="dropdown-item py-2" href="/services/premium-custom-shopify-store/">Premium Shopify Store</a></li>
                                        <li><a class="dropdown-item py-2" href="/services/premium-custom-wordpress-website/">Custom WordPress Website</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h6 class="text-orange fw-bold mb-3">Top SEO & Marketing</h6>
                                    <ul class="list-unstyled mb-0">
                                        <li><a class="dropdown-item py-2" href="/services/premium-ecommerce-architecture/">E-Commerce Architecture SEO</a></li>
                                        <li><a class="dropdown-item py-2" href="/services/advanced-core-web-vitals/">Core Web Vitals Optimization</a></li>
                                        <li><a class="dropdown-item py-2" href="/services/premium-social-media-management/">Social Media Management</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mt-3 text-center border-top border-secondary border-opacity-25 pt-3">
                                <a href="/#services" class="text-orange fw-bold text-decoration-none small">View All 25 Services &rarr;</a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item dropdown has-megamenu">
                        <a class="nav-link text-white dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-display="static">Locations</a>
                        <div class="dropdown-menu megamenu shadow-sm p-3">
                            <h6 class="text-orange fw-bold mb-3">Tier 1 Hubs</h6>
                            <ul class="list-unstyled mb-0">
                                <li><a class="dropdown-item py-2" href="/locations/seo-agency-karachi/">Karachi</a></li>
                                <li><a class="dropdown-item py-2" href="/locations/seo-agency-lahore/">Lahore</a></li>
                                <li><a class="dropdown-item py-2" href="/locations/seo-agency-islamabad/">Islamabad</a></li>
                                <li><a class="dropdown-item py-2" href="/locations/seo-agency-rawalpindi/">Rawalpindi</a></li>
                            </ul>
                            <div class="mt-3 text-center border-top border-secondary border-opacity-25 pt-3">
                                <a href="/locations/" class="text-orange fw-bold text-decoration-none small">View All Locations &rarr;</a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item"><a class="nav-link text-white" href="/#calculator">ROI Calculator</a></li>
                    <li class="nav-item ms-lg-3">
                        <a rel="nofollow noopener noreferrer" href="https://wa.me/923353453099" class="btn btn-orange btn-glow px-4 py-2 fw-bold">Talk to an Expert</a>
                    </li>
                </ul>`;

filesToProcess.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old navbar
    const oldNavRegex = /<ul class="navbar-nav ms-auto align-items-center">[\s\S]*?<\/ul>/;
    content = content.replace(oldNavRegex, megaMenuHTML);

    const footerRegex = /<div class="col-lg-2">\s*<h5 class="outfit mb-4 text-white text-uppercase tracking-wider small fw-bold">Company<\/h5>/;
    const footerLocations = `<div class="col-lg-2">
                    <h5 class="outfit mb-4 text-white text-uppercase tracking-wider small fw-bold">Locations</h5>
                    <ul class="list-unstyled text-gray small">
                        <li class="mb-2"><a href="/locations/" class="footer-link text-decoration-none text-orange fw-bold">Areas We Serve</a></li>
                        <li class="mb-2"><a href="/locations/seo-agency-karachi/" class="footer-link text-decoration-none">Karachi</a></li>
                        <li class="mb-2"><a href="/locations/seo-agency-lahore/" class="footer-link text-decoration-none">Lahore</a></li>
                        <li class="mb-2"><a href="/locations/seo-agency-islamabad/" class="footer-link text-decoration-none">Islamabad</a></li>
                        <li class="mb-2"><a href="/locations/seo-agency-faisalabad/" class="footer-link text-decoration-none">Faisalabad</a></li>
                        <li class="mb-2"><a href="/locations/seo-agency-rawalpindi/" class="footer-link text-decoration-none">Rawalpindi</a></li>
                        <li class="mb-2"><a href="/locations/seo-agency-multan/" class="footer-link text-decoration-none">Multan</a></li>
                        <li class="mb-2"><a href="/locations/seo-agency-peshawar/" class="footer-link text-decoration-none">Peshawar</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h5 class="outfit mb-4 text-white text-uppercase tracking-wider small fw-bold">Company</h5>`;
    
    if(!content.includes('Locations</h5>')) {
        content = content.replace(footerRegex, footerLocations);
        // Also reduce the first column to col-lg-3 instead of col-lg-4 to make space
        content = content.replace(/<div class="col-lg-4 pe-lg-5">/, '<div class="col-lg-3 pe-lg-4">');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated Mega Menu & Footer in ${file}`);
});
