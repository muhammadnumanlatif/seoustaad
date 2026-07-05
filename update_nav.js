const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const filesToProcess = ['index.html', 'legal.html', 'package-details.html'];

const megaMenuHTML = `
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item dropdown has-megamenu">
                        <a class="nav-link text-white dropdown-toggle" href="#" data-bs-toggle="dropdown">Services</a>
                        <div class="dropdown-menu megamenu shadow-sm p-3">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <h6 class="text-orange fw-bold">Web Development</h6>
                                    <ul class="list-unstyled">
                                        <li><a class="dropdown-item" href="/#services">WordPress Themes</a></li>
                                        <li><a class="dropdown-item" href="/#services">Shopify Liquid</a></li>
                                        <li><a class="dropdown-item" href="/#services">React & Next.js</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <h6 class="text-orange fw-bold">SEO & AEO</h6>
                                    <ul class="list-unstyled">
                                        <li><a class="dropdown-item" href="/#services">Technical SEO</a></li>
                                        <li><a class="dropdown-item" href="/#services">Local SEO</a></li>
                                        <li><a class="dropdown-item" href="/#services">AEO Optimization</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <h6 class="text-orange fw-bold">SMM & Ads</h6>
                                    <ul class="list-unstyled">
                                        <li><a class="dropdown-item" href="/#services">Meta Ads</a></li>
                                        <li><a class="dropdown-item" href="/#services">Video Reels</a></li>
                                        <li><a class="dropdown-item" href="/#services">Lead Funnels</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item dropdown has-megamenu">
                        <a class="nav-link text-white dropdown-toggle" href="#" data-bs-toggle="dropdown">Packages</a>
                        <div class="dropdown-menu megamenu shadow-sm p-3">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <h6 class="text-orange fw-bold">Tier 1 & 2 Packages</h6>
                                    <ul class="list-unstyled">
                                        <li><a class="dropdown-item" href="/#packages">Corporate & Elite (Tier 1)</a></li>
                                        <li><a class="dropdown-item" href="/#packages">Industrial & Export (Tier 2)</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h6 class="text-orange fw-bold">Tier 3 & 4 Packages</h6>
                                    <ul class="list-unstyled">
                                        <li><a class="dropdown-item" href="/#packages">Regional Growth (Tier 3)</a></li>
                                        <li><a class="dropdown-item" href="/#packages">Startup & SME (Tier 4)</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item dropdown has-megamenu">
                        <a class="nav-link text-white dropdown-toggle" href="#" data-bs-toggle="dropdown">Locations</a>
                        <div class="dropdown-menu megamenu shadow-sm p-3">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <h6 class="text-orange fw-bold">Tier 1 Cities</h6>
                                    <ul class="list-unstyled">
                                        <li><a class="dropdown-item" href="/locations/seo-agency-karachi/">Karachi</a></li>
                                        <li><a class="dropdown-item" href="/locations/seo-agency-lahore/">Lahore</a></li>
                                        <li><a class="dropdown-item" href="/locations/seo-agency-islamabad/">Islamabad</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <h6 class="text-orange fw-bold">Tier 2 Cities</h6>
                                    <ul class="list-unstyled">
                                        <li><a class="dropdown-item" href="/locations/seo-agency-faisalabad/">Faisalabad</a></li>
                                        <li><a class="dropdown-item" href="/locations/seo-agency-rawalpindi/">Rawalpindi</a></li>
                                        <li><a class="dropdown-item" href="/locations/seo-agency-gujranwala/">Gujranwala</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <h6 class="text-orange fw-bold">All Locations</h6>
                                    <ul class="list-unstyled">
                                        <li><a class="dropdown-item" href="/locations/seo-agency-multan/">Multan</a></li>
                                        <li><a class="dropdown-item" href="/locations/seo-agency-peshawar/">Peshawar</a></li>
                                        <li><a class="dropdown-item text-orange fw-bold mt-2" href="/locations/">View All 25 Cities &rarr;</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item"><a class="nav-link text-white" href="/#calculator">ROI Calculator</a></li>
                    <li class="nav-item ms-lg-3">
                        <a href="https://wa.me/923379912300" class="btn btn-orange btn-glow px-4 py-2 fw-bold">Talk to an Expert</a>
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
