const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const filesToProcess = ['index.html', 'legal.html', 'package-details.html', 'city-template.html', 'service-template.html'];

const megaMenuHTML = `
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item dropdown has-megamenu">
                        <a class="nav-link text-white dropdown-toggle" href="#" data-bs-toggle="dropdown">Services</a>
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
                        <a class="nav-link text-white dropdown-toggle" href="#" data-bs-toggle="dropdown">Locations</a>
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
                        <a rel="nofollow noopener noreferrer" href="https://wa.me/923379912300" class="btn btn-orange btn-glow px-4 py-2 fw-bold">Talk to an Expert</a>
                    </li>
                </ul>`;

filesToProcess.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old navbar safely using <nav> tag as boundary
    const oldNavRegex = /<div class="collapse navbar-collapse" id="navbarNav">[\s\S]*?<\/nav>/;
    content = content.replace(oldNavRegex, `<div class="collapse navbar-collapse" id="navbarNav">\n${megaMenuHTML}\n            </div>\n        </div>\n    </nav>`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed corrupted Mega Menu in ${file}`);
});
