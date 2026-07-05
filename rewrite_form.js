const fs = require('fs');
const path = require('path');
const gigs = require('./gigs.json');

const indexPath = path.join(__dirname, 'index.html');
const scriptPath = path.join(__dirname, 'script.js');

let indexHtml = fs.readFileSync(indexPath, 'utf8');

// The new Step 1 (Category)
const step1Html = `
                            <!-- Step 1: Choose Category -->
                            <div class="form-step active-step" data-step="1">
                                <h4 class="outfit text-white mb-2 h5">What service do you need?</h4>
                                <p class="text-gray small mb-3">Select the primary category for your project.</p>
                                <div class="d-flex flex-column gap-2 max-height-step-container">
                                    <label class="service-option-card">
                                        <input type="radio" name="category" value="web" required>
                                        <div class="service-option-content d-flex align-items-center p-3">
                                            <i class="fas fa-code text-orange me-3 fa-lg"></i>
                                            <div class="text-start">
                                                <span class="d-block text-white fw-bold">Web Development</span>
                                                <span class="text-gray small">WordPress, Shopify, React/Next.js, Custom Web</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="service-option-card">
                                        <input type="radio" name="category" value="seo">
                                        <div class="service-option-content d-flex align-items-center p-3">
                                            <i class="fas fa-search text-orange me-3 fa-lg"></i>
                                            <div class="text-start">
                                                <span class="d-block text-white fw-bold">Technical SEO</span>
                                                <span class="text-gray small">Audits, On-Page, Speed, Web Vitals</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="service-option-card">
                                        <input type="radio" name="category" value="local">
                                        <div class="service-option-content d-flex align-items-center p-3">
                                            <i class="fas fa-map-marker-alt text-orange me-3 fa-lg"></i>
                                            <div class="text-start">
                                                <span class="d-block text-white fw-bold">Local SEO</span>
                                                <span class="text-gray small">GMB, Citations, Local Retainers</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="service-option-card">
                                        <input type="radio" name="category" value="ecom">
                                        <div class="service-option-content d-flex align-items-center p-3">
                                            <i class="fas fa-shopping-cart text-orange me-3 fa-lg"></i>
                                            <div class="text-start">
                                                <span class="d-block text-white fw-bold">E-Commerce</span>
                                                <span class="text-gray small">Product SEO, Category Optimization, CRO</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="service-option-card">
                                        <input type="radio" name="category" value="smm">
                                        <div class="service-option-content d-flex align-items-center p-3">
                                            <i class="fas fa-bullhorn text-orange me-3 fa-lg"></i>
                                            <div class="text-start">
                                                <span class="d-block text-white fw-bold">Social Media & Ads</span>
                                                <span class="text-gray small">Meta Ads, Backlinks, Guest Posts</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <!-- Step 2: Choose Specific Gig -->
                            <div class="form-step" data-step="2">
                                <h4 class="outfit text-white mb-2 h5">Select Specific Service</h4>
                                <p class="text-gray small mb-3">Choose the premium gig that fits your needs.</p>
                                <div class="mb-3 text-start">
                                    <label class="form-label text-gray small fw-bold">Selected Service</label>
                                    <select class="form-select glass-input custom-select-tall" name="service" id="gigSelect" required>
                                        <option value="" disabled selected>Please select a category first...</option>
                                    </select>
                                    <div class="invalid-feedback">Please select a service.</div>
                                </div>
                            </div>
`;

// Extract old Step 1 to replace it
const step1Regex = /<!-- Step 1: Choose Service -->[\s\S]*?<\/div>\s*<\/div>\s*<!-- Step 2: Location & Goals -->/;
indexHtml = indexHtml.replace(step1Regex, step1Html + '\n\n                            <!-- Step 3: Location & Goals -->');

// Replace Step 2 data-step to 3
indexHtml = indexHtml.replace(/<!-- Step 3: Location & Goals -->\s*<div class="form-step" data-step="2">/, '<!-- Step 3: Location & Goals -->\n                            <div class="form-step" data-step="3">');

// Replace Step 3 Budget to Step 4 Timeline & Price
const budgetRegex = /<!-- Step 3: Budget & Timeline -->\s*<div class="form-step" data-step="3">[\s\S]*?<div class="mb-3 text-start">\s*<label class="form-label text-gray small fw-bold">Project Timeline/;
const newStep4 = `<!-- Step 4: Budget & Timeline -->
                            <div class="form-step" data-step="4">
                                <h4 class="outfit text-white mb-2 h5">Project Cost & Timeline</h4>
                                <p class="text-gray small mb-3">Review the cost of your selected gig.</p>
                                
                                <div class="mb-3 text-start">
                                    <label class="form-label text-gray small fw-bold">Gig Price</label>
                                    <div class="glass-card p-3 border border-orange border-opacity-50 text-center rounded">
                                        <span class="text-orange fw-bold fs-4 d-block outfit" id="displayPrice">Select a gig to view price</span>
                                        <span class="text-gray small" id="displayPriceSubtitle">Fixed transparent pricing</span>
                                    </div>
                                    <input type="hidden" name="price" id="hiddenPriceInput" value="">
                                </div>

                                <div class="mb-3 text-start">
                                    <label class="form-label text-gray small fw-bold">Project Timeline`;
indexHtml = indexHtml.replace(budgetRegex, newStep4);

// Step 4 to 5
indexHtml = indexHtml.replace(/<!-- Step 4: Your Details -->\s*<div class="form-step" data-step="4">/, '<!-- Step 5: Your Details -->\n                            <div class="form-step" data-step="5">');

// Step 1 of 5 -> Step 1 of 6
indexHtml = indexHtml.replace(/Step 1 of 5/g, 'Step 1 of 5'); // wait, there are 5 steps now!
// Let's check how many steps: 1(cat), 2(gig), 3(loc), 4(price/timeline), 5(contact). Total is 5 steps!
// The user had 5 steps before (1. Service, 2. Loc, 3. Budget, 4. Contact, 5. Success is not a step).
// So it stays 5 steps. 

// Inject gigs json into HTML so script.js can read it
const gigsDataScript = `\n<script id="gigsData" type="application/json">\n${JSON.stringify(gigs)}\n</script>\n`;
if (!indexHtml.includes('id="gigsData"')) {
    indexHtml = indexHtml.replace('</body>', gigsDataScript + '</body>');
}

fs.writeFileSync(indexPath, indexHtml, 'utf8');

// Now script.js updates
let scriptJs = fs.readFileSync(scriptPath, 'utf8');

// Update summary gathering
scriptJs = scriptJs.replace(/const budget = multiForm\.querySelector\('input\[name="budget"\]:checked'\)\?\.value \|\| '-';/, 'const budget = document.getElementById("hiddenPriceInput").value || "-";');

// In build.js, the dynamic pre-selection needs to select Category and Service.
const buildPath = path.join(__dirname, 'build.js');
let buildJs = fs.readFileSync(buildPath, 'utf8');
const newServiceLogic = `
    // Check which category this gig belongs to, and pre-select it
    serviceContent = serviceContent.replace(new RegExp('value="' + gig.category + '"'), 'value="' + gig.category + '" checked');
    // Store the pre-selected gig name in a data attribute so script.js can select it after DOM generation
    serviceContent = serviceContent.replace('id="gigSelect"', 'id="gigSelect" data-preselected="' + gig.name + '"');
`;
if (buildJs.includes('serviceContent = serviceContent.replace(new RegExp(\'value="\' + gig.name + \'"\')')) {
    const oldServiceLogicRegex = /serviceContent = serviceContent\.replace\(new RegExp\('value="' \+ gig\.name \+ '"'\), 'value="' \+ gig\.name \+ '" selected'\);/;
    buildJs = buildJs.replace(oldServiceLogicRegex, newServiceLogic);
} else {
    // If we've already run it and the new logic isn't there, we might need to replace the old newServiceLogic.
    buildJs = buildJs.replace(/\/\/ Check which category this gig belongs to[\s\S]*?'value="' \+ gig\.name \+ '" selected'\);/g, newServiceLogic.trim());
}
fs.writeFileSync(buildPath, buildJs, 'utf8');

// Inject JS logic into script.js for cascading dropdowns
const cascadeLogic = `
        // Cascade Logic: Category -> Gig -> Price
        const categoryRadios = multiForm.querySelectorAll('input[name="category"]');
        const gigSelect = document.getElementById('gigSelect');
        const displayPrice = document.getElementById('displayPrice');
        const hiddenPriceInput = document.getElementById('hiddenPriceInput');
        const gigsDataEl = document.getElementById('gigsData');
        
        let allGigs = [];
        if (gigsDataEl) {
            try {
                allGigs = JSON.parse(gigsDataEl.textContent);
            } catch(e){}
        }

        if (categoryRadios.length > 0 && gigSelect) {
            const populateDropdown = (cat, preselectName = null) => {
                const filtered = allGigs.filter(g => g.category === cat);
                
                gigSelect.innerHTML = '<option value="" disabled selected>Select a specific gig...</option>';
                filtered.forEach(g => {
                    const isSelected = (g.name === preselectName) ? 'selected' : '';
                    gigSelect.innerHTML += \`<option value="\${g.name}" data-price="\${g.price}" \${isSelected}>\${g.name}</option>\`;
                });
                
                if (preselectName) {
                    const selectedGig = filtered.find(g => g.name === preselectName);
                    if (selectedGig) {
                        displayPrice.innerText = selectedGig.price;
                        hiddenPriceInput.value = selectedGig.price;
                    }
                } else {
                    displayPrice.innerText = "Select a gig to view price";
                    hiddenPriceInput.value = "";
                }
            };

            categoryRadios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    populateDropdown(e.target.value);
                });
            });

            gigSelect.addEventListener('change', (e) => {
                const selectedOption = gigSelect.options[gigSelect.selectedIndex];
                const price = selectedOption.getAttribute('data-price');
                if (price) {
                    displayPrice.innerText = price;
                    hiddenPriceInput.value = price;
                }
            });
            
            // Handle pre-selected logic on load
            const checkedCat = multiForm.querySelector('input[name="category"]:checked');
            if (checkedCat) {
                const preselectedGigName = gigSelect.getAttribute('data-preselected');
                populateDropdown(checkedCat.value, preselectedGigName);
            }
        }
`;

if (!scriptJs.includes('Cascade Logic: Category -> Gig -> Price')) {
    scriptJs = scriptJs.replace('const updateFormUI', cascadeLogic + '\n        const updateFormUI');
    fs.writeFileSync(scriptPath, scriptJs, 'utf8');
}

console.log('Successfully updated form structure and script logic.');
