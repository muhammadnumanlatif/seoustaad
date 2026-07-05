const fs = require('fs');
const path = require('path');
const gigs = require('./gigs.json');

const cities = [
    'Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Peshawar', 'Multan', 'Hyderabad',
    'Islamabad', 'Quetta', 'Bahawalpur', 'Sargodha', 'Sialkot', 'Sukkur', 'Larkana', 'Sheikhupura',
    'Rahim Yar Khan', 'Jhang', 'Dera Ghazi Khan', 'Gujrat', 'Sahiwal', 'Wah Cantonment', 'Mardan', 'Kasur', 'Okara'
];

// 1. Generate Services Select HTML
const categories = {
    web: "Web Development",
    seo: "Technical SEO",
    local: "Local SEO",
    ecom: "E-Commerce",
    smm: "Social Media & Ads"
};

let servicesHtml = `<div class="mb-3 text-start">
    <label class="form-label text-gray small fw-bold">Select a Service</label>
    <select class="form-select glass-input custom-select-tall" name="service" required>
        <option value="" disabled selected>Choose from 25 Premium Gigs...</option>`;

for (const [catKey, catName] of Object.entries(categories)) {
    servicesHtml += `\n        <optgroup label="${catName}">`;
    gigs.filter(g => g.category === catKey).forEach(g => {
        servicesHtml += `\n            <option value="${g.name}">${g.name}</option>`;
    });
    servicesHtml += `\n        </optgroup>`;
}
servicesHtml += `\n    </select>\n    <div class="invalid-feedback">Please select a service.</div>\n</div>`;

// 2. Generate Locations Select HTML
let locationsHtml = `<select class="form-select glass-input custom-select-tall" name="location" required>
    <option value="" disabled selected>Select location...</option>`;

cities.forEach(city => {
    locationsHtml += `\n    <option value="${city}">${city}</option>`;
});
locationsHtml += `\n    <option value="Other PK City">Other Pakistani City</option>
    <option value="International">Outside Pakistan (International)</option>
</select>`;

// 3. Read index.html
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// 4. Replace Step 1 options
const step1Regex = /<div class="d-flex flex-column gap-2 max-height-step-container">[\s\S]*?<\/div>\s*<\/div>\s*<!-- Step 2:/;
indexHtml = indexHtml.replace(step1Regex, servicesHtml + `\n                            </div>\n\n                            <!-- Step 2:`);

// 5. Replace Step 2 locations
const step2Regex = /<select class="form-select glass-input" name="location" required>[\s\S]*?<\/select>/;
indexHtml = indexHtml.replace(step2Regex, locationsHtml);

// 6. Write back
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Successfully updated index.html with the 25 Gigs and 25 Cities in the Multi-step Form!');
