const fs = require('fs');
const path = require('path');

const buildJsPath = path.join(__dirname, 'build.js');
let buildContent = fs.readFileSync(buildJsPath, 'utf8');

// For City Templates: inject dynamic preselection
const cityInjectionLogic = `
    // Dynamic Form Pre-selection for Location
    cityContent = cityContent.replace(new RegExp('value="' + city + '"'), 'value="' + city + '" selected');
`;

if (!buildContent.includes('Dynamic Form Pre-selection for Location')) {
    buildContent = buildContent.replace("fs.writeFileSync(path.join(cityDir, 'index.html'), cityContent, 'utf8');", cityInjectionLogic + "\n    fs.writeFileSync(path.join(cityDir, 'index.html'), cityContent, 'utf8');");
}

// For Service Templates: inject dynamic preselection
const serviceInjectionLogic = `
    // Dynamic Form Pre-selection for Service
    serviceContent = serviceContent.replace(new RegExp('value="' + gig.name + '"'), 'value="' + gig.name + '" selected');
`;

if (!buildContent.includes('Dynamic Form Pre-selection for Service')) {
    buildContent = buildContent.replace("fs.writeFileSync(path.join(gigDir, 'index.html'), serviceContent, 'utf8');", serviceInjectionLogic + "\n    fs.writeFileSync(path.join(gigDir, 'index.html'), serviceContent, 'utf8');");
}

fs.writeFileSync(buildJsPath, buildContent, 'utf8');
console.log('Successfully injected dynamic pre-selection logic into build.js');
