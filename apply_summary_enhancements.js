const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const styleCssPath = path.join(__dirname, 'style.css');

// 1. Update style.css to ensure the hero form card has a min-height and looks better
let styleCss = fs.readFileSync(styleCssPath, 'utf8');
if (!styleCss.includes('min-height: 500px')) {
    styleCss = styleCss.replace('.hero-form-card {', '.hero-form-card {\n    min-height: 500px;\n    display: flex;\n    flex-direction: column;');
    fs.writeFileSync(styleCssPath, styleCss, 'utf8');
}

// 2. Enhance the Summary Review HTML in index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const oldSummaryHtml = `
                                <div class="glass-card p-3 mb-3 text-start border border-secondary rounded">
                                    <div class="mb-2 pb-1 border-bottom border-secondary d-flex justify-content-between">
                                        <span class="text-gray small">Selected Service:</span>
                                        <span class="text-white fw-bold small" id="summaryService">-</span>
                                    </div>
                                    <div class="mb-2 pb-1 border-bottom border-secondary d-flex justify-content-between">
                                        <span class="text-gray small">Target Location:</span>
                                        <span class="text-white fw-bold small" id="summaryLocation">-</span>
                                    </div>
                                    <div class="mb-2 pb-1 border-bottom border-secondary d-flex justify-content-between">
                                        <span class="text-gray small">Project Budget:</span>
                                        <span class="text-white fw-bold small" id="summaryBudget">-</span>
                                    </div>
                                    <div class="mb-2 pb-1 border-bottom border-secondary d-flex justify-content-between">
                                        <span class="text-gray small">Contact Name:</span>
                                        <span class="text-white fw-bold small" id="summaryName">-</span>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <span class="text-gray small">WhatsApp:</span>
                                        <span class="text-white fw-bold small" id="summaryPhone">-</span>
                                    </div>
                                </div>
`;

const newSummaryHtml = `
                                <div class="glass-card p-4 mb-3 text-start border border-orange border-opacity-25 rounded position-relative overflow-hidden">
                                    <div class="position-absolute top-0 end-0 p-3 opacity-25">
                                        <i class="fas fa-file-invoice fa-4x text-orange"></i>
                                    </div>
                                    
                                    <div class="mb-3 pb-2 border-bottom border-secondary d-flex justify-content-between align-items-center position-relative">
                                        <span class="text-gray small"><i class="fas fa-briefcase me-2 text-orange"></i>Service:</span>
                                        <span class="text-white fw-bold small text-end ms-3" id="summaryService" style="max-width: 60%; word-break: break-word;">-</span>
                                    </div>
                                    <div class="mb-3 pb-2 border-bottom border-secondary d-flex justify-content-between align-items-center position-relative">
                                        <span class="text-gray small"><i class="fas fa-map-marker-alt me-2 text-orange"></i>Location:</span>
                                        <span class="text-white fw-bold small" id="summaryLocation">-</span>
                                    </div>
                                    <div class="mb-3 pb-2 border-bottom border-secondary d-flex justify-content-between align-items-center position-relative">
                                        <span class="text-gray small"><i class="fas fa-tag me-2 text-orange"></i>Project Cost:</span>
                                        <span class="text-orange fw-bold" id="summaryBudget" style="font-size: 1.1rem;">-</span>
                                    </div>
                                    <div class="mb-3 pb-2 border-bottom border-secondary d-flex justify-content-between align-items-center position-relative">
                                        <span class="text-gray small"><i class="fas fa-user me-2 text-orange"></i>Name:</span>
                                        <span class="text-white fw-bold small" id="summaryName">-</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center position-relative">
                                        <span class="text-gray small"><i class="fab fa-whatsapp me-2 text-orange"></i>WhatsApp:</span>
                                        <span class="text-white fw-bold small" id="summaryPhone">-</span>
                                    </div>
                                </div>
`;

if (indexHtml.includes('Project Budget:')) {
    indexHtml = indexHtml.replace(oldSummaryHtml.trim(), newSummaryHtml.trim());
    
    // Also fix the form button container margin to push it to bottom if card is taller
    indexHtml = indexHtml.replace('id="heroMultistepForm" class="needs-validation" novalidate>', 'id="heroMultistepForm" class="needs-validation d-flex flex-column flex-grow-1" novalidate>');
    indexHtml = indexHtml.replace('class="d-flex justify-content-between mt-4 border-top border-secondary pt-3"', 'class="d-flex justify-content-between mt-auto border-top border-secondary pt-3"');
    
    // Fix Success message icon to be a bit smaller maybe and add a nice gradient
    indexHtml = indexHtml.replace('<i class="fas fa-check-circle text-success" style="font-size: 3.5rem;"></i>', '<i class="fas fa-check-circle text-success mb-2" style="font-size: 4rem; filter: drop-shadow(0 0 10px rgba(40,167,69,0.5));"></i>');
    
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
}

console.log("Enhanced Summary UI and Fixed Card Heights applied!");
