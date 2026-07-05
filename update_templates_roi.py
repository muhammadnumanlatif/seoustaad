import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract the new dropdowns from index.html
service_pattern = r'<label class="form-label">Select Service</label>\s*<select class="form-select glass-input" id="serviceSelect">[\s\S]*?</select>'
service_replacement = re.search(service_pattern, index_html).group(0)

location_pattern = r'<label class="form-label">Target Location</label>\s*<select class="form-select glass-input" id="locationSelect">[\s\S]*?</select>'
location_replacement = re.search(location_pattern, index_html).group(0)

for template in ['city-template.html', 'service-template.html']:
    with open(template, 'r', encoding='utf-8') as f:
        html = f.read()
    
    industry_pattern = r'<label class="form-label">Business Industry</label>\s*<select class="form-select glass-input" id="industrySelect">[\s\S]*?</select>'
    html = re.sub(industry_pattern, service_replacement, html)
    
    tier_pattern = r'<label class="form-label">Target Location Tier</label>\s*<select class="form-select glass-input" id="tierSelect">[\s\S]*?</select>'
    html = re.sub(tier_pattern, location_replacement, html)
    
    with open(template, 'w', encoding='utf-8') as f:
        f.write(html)
        
print("Updated templates")
