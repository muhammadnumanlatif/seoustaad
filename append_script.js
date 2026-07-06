const fs = require('fs');

const logicToAppend = `
  // --- Text-to-HTML Ratio Fix: Dynamic Dropdowns ---
  const locationDropdown = document.querySelector('select[name="location"]');
  const waLocationDropdown = document.getElementById('waWidgetLocation');
  const waServiceDropdown = document.getElementById('waWidgetService');

  if (locationDropdown || waLocationDropdown) {
    const locationsHtml = pakistanCities.map(c => \`<option value="\${c.name}">\${c.name}</option>\`).join('');
    if (locationDropdown) {
        // Keep the first option
        const firstOpt = locationDropdown.innerHTML;
        locationDropdown.innerHTML = firstOpt + locationsHtml;
    }
    if (waLocationDropdown) {
        const firstOptWa = waLocationDropdown.innerHTML;
        waLocationDropdown.innerHTML = firstOptWa + locationsHtml;
    }
  }

  if (waServiceDropdown) {
    const servicesHtml = packagesData.map(p => \`<option value="\${p.name}">\${p.name}</option>\`).join('');
    const firstOptSvc = waServiceDropdown.innerHTML;
    waServiceDropdown.innerHTML = firstOptSvc + servicesHtml;
  }
}); // End DOMContentLoaded
`;

let content = fs.readFileSync('script.js', 'utf8');

// The file has a closing `});` at the end or somewhere for DOMContentLoaded?
// Let's just find the end of the DOMContentLoaded block and insert it there.
// Or we can just add an entirely new DOMContentLoaded event listener at the end of the file.

fs.appendFileSync('script.js', `
document.addEventListener("DOMContentLoaded", () => {
${logicToAppend}
`);

console.log('script.js updated.');
