const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === '.claude') continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const rootDir = __dirname;
const htmlFiles = getAllHtmlFiles(rootDir);
let processedCount = 0;

for (const file of htmlFiles) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Quick check before parsing to save time
        if (!content.includes('hero-form-card') || !content.includes('hero-section')) {
            continue;
        }

        const dom = new JSDOM(content);
        const document = dom.window.document;

        const heroSection = document.querySelector('header.hero-section');
        const formCard = document.querySelector('.hero-form-card');

        if (heroSection && formCard) {
            // Find the wrapper of the form card
            const formWrapper = formCard.closest('.col-lg-6');
            if (formWrapper) {
                formWrapper.remove();
            } else {
                formCard.remove();
            }

            // Find the text column
            const textCol = heroSection.querySelector('.col-lg-6');
            if (textCol) {
                textCol.classList.remove('col-lg-6', 'text-lg-start', 'text-center', 'text-md-start');
                textCol.classList.add('col-lg-8', 'mx-auto', 'text-center');
                
                // Change the text-start alignment inside the text column if it exists
                const textStarts = textCol.querySelectorAll('.text-start');
                textStarts.forEach(el => {
                    el.classList.remove('text-start');
                    el.classList.add('text-center');
                });
                
                const flexStarts = textCol.querySelectorAll('.justify-content-lg-start');
                flexStarts.forEach(el => {
                    el.classList.remove('justify-content-lg-start');
                    el.classList.add('justify-content-center');
                });
                
                // Add the new CTA button
                const btnContainer = document.createElement('div');
                btnContainer.className = "mt-4 mb-4 pt-2";
                btnContainer.innerHTML = `<a href="#growth-form-section" class="btn btn-orange btn-glow btn-lg px-5 py-3 fw-bold rounded-pill" style="font-size: 1.1rem;">Start Your Growth Plan <i class="fas fa-arrow-down ms-2"></i></a>`;
                textCol.appendChild(btnContainer);
            }
            
            // Remove the mobile-only button column if it exists since we have a better CTA now
            const mobileCol = heroSection.querySelector('.d-lg-none');
            if (mobileCol && mobileCol.textContent.includes('Calculate Growth')) {
                mobileCol.remove();
            }

            // Create new section
            const newSection = document.createElement('section');
            newSection.id = 'growth-form-section';
            newSection.className = 'py-5 bg-darker border-top border-white border-opacity-10';
            
            const container = document.createElement('div');
            container.className = 'container py-5';
            
            const row = document.createElement('div');
            row.className = 'row justify-content-center';
            
            const headerCol = document.createElement('div');
            headerCol.className = 'col-lg-8 text-center mb-5 stagger-reveal';
            headerCol.innerHTML = `
                <h2 class="outfit display-5 text-white">Let's Map Out Your <span class="text-orange">Growth Strategy</span></h2>
                <p class="text-gray lead">Fill out the details below to get a custom roadmap and timeline from our experts.</p>
            `;
            
            const formCol = document.createElement('div');
            formCol.className = 'col-lg-8 mx-auto stagger-reveal';
            formCol.appendChild(formCard);
            
            row.appendChild(headerCol);
            row.appendChild(formCol);
            container.appendChild(row);
            newSection.appendChild(container);

            // Insert after hero section
            heroSection.parentNode.insertBefore(newSection, heroSection.nextSibling);

            fs.writeFileSync(file, dom.serialize(), 'utf8');
            processedCount++;
            console.log(`Updated layout in ${file.replace(rootDir, '')}`);
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
}

console.log(`Successfully updated ${processedCount} files.`);
