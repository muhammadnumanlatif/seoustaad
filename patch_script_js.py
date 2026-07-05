import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace assignments
js = js.replace("const industrySelect = document.getElementById('industrySelect');", "const serviceSelect = document.getElementById('serviceSelect');")
js = js.replace("const tierSelect = document.getElementById('tierSelect');", "const locationSelect = document.getElementById('locationSelect');")

# Replace updateCalculator variables
js = js.replace("const tier = tierSelect.value;", "const location = locationSelect.value;\n        const service = serviceSelect.value;")

# Add hash function
hash_func = """
        const hashString = (str) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return Math.abs(hash);
        };
"""

# Replace multipliers and logic
old_logic = """        // Target Multipliers
        const industryMult = { ecommerce: 1.2, realestate: 0.7, services: 1.0, export: 1.1, education: 1.0 };
        const tierMult = { tier1: 0.8, tier2: 1.0, tier3: 1.2, tier4: 1.5 };

        // Localized Timeline Matrix (Days)
        const timeMatrix = {
            tier1: [120, 180],
            tier2: [90, 150],
            tier3: [60, 120],
            tier4: [30, 90]
        };

        const speedFactor = budget > 20000 ? 0.8 : (budget > 10000 ? 0.9 : 1);
        const minDays = Math.floor(timeMatrix[tier][0] * speedFactor);
        const maxDays = Math.floor(timeMatrix[tier][1] * speedFactor);

        const baseCPC = 45; // 0.15 USD in PKR
        const visitors = Math.floor((budget / baseCPC) * industryMult[industrySelect.value] * tierMult[tier]);"""

new_logic = hash_func + """
        // Target Multipliers dynamically based on selection
        const serviceMult = 0.8 + (hashString(service) % 50) / 100;
        const locationMult = 0.8 + (hashString(location) % 50) / 100;

        // Localized Timeline Matrix (Days)
        const timeOptions = [
            [120, 180],
            [90, 150],
            [60, 120],
            [30, 90]
        ];
        const timeIdx = hashString(location) % timeOptions.length;
        const [minDaysBase, maxDaysBase] = timeOptions[timeIdx];

        const speedFactor = budget > 20000 ? 0.8 : (budget > 10000 ? 0.9 : 1);
        const minDays = Math.floor(minDaysBase * speedFactor);
        const maxDays = Math.floor(maxDaysBase * speedFactor);

        const baseCPC = 45; // 0.15 USD in PKR
        const visitors = Math.floor((budget / baseCPC) * serviceMult * locationMult);"""

js = js.replace(old_logic, new_logic)

# Replace WhatsApp redirect
old_wa = """        const tierName = tierSelect.options[tierSelect.selectedIndex].text;
        const industryName = industrySelect.options[industrySelect.selectedIndex].text;
        const msg = `Hi SEO Ustaad! I used your calculator. My budget is ${budget.toLocaleString()} PKR for ${industryName} services targeting ${tierName}. Estimated traffic: ${visitors.toLocaleString()}+ visitors and ${leads} leads in ${minDays}-${maxDays} days. Please send me this growth plan!`;"""

new_wa = """        const locationName = locationSelect.options[locationSelect.selectedIndex].text;
        const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
        const msg = `Hi SEO Ustaad! I used your calculator. My budget is ${budget.toLocaleString()} PKR for ${serviceName} targeting ${locationName}. Estimated traffic: ${visitors.toLocaleString()}+ visitors and ${leads} leads in ${minDays}-${maxDays} days. Please send me this growth plan!`;"""

js = js.replace(old_wa, new_wa)

# Replace event listener loop
old_loop = "[budgetRange, industrySelect, tierSelect].forEach"
new_loop = "[budgetRange, serviceSelect, locationSelect].forEach"
js = js.replace(old_loop, new_loop)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated script.js")
