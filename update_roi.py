import json
import re

# Load gigs
with open('gigs.json', 'r') as f:
    gigs = json.load(f)

categories = {
    "web": "Web Development",
    "seo": "Technical SEO",
    "local": "Local SEO",
    "ecom": "E-Commerce",
    "smm": "Social Media & Ads"
}

cities = [
    'Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Peshawar', 'Multan', 'Hyderabad',
    'Islamabad', 'Quetta', 'Bahawalpur', 'Sargodha', 'Sialkot', 'Sukkur', 'Larkana', 'Sheikhupura',
    'Rahim Yar Khan', 'Jhang', 'Dera Ghazi Khan', 'Gujrat', 'Sahiwal', 'Wah Cantonment', 'Mardan', 'Kasur', 'Okara'
]

# Generate service options
services_html = ""
for cat_key, cat_name in categories.items():
    services_html += f'\n                                <optgroup label="{cat_name}">'
    for gig in gigs:
        if gig['category'] == cat_key:
            services_html += f'\n                                    <option value="{gig["slug"]}">{gig["name"]}</option>'
    services_html += f'\n                                </optgroup>'

# Generate location options
locations_html = ""
for city in cities:
    locations_html += f'\n                                <option value="{city.lower().replace(" ", "-")}">{city}</option>'

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Replace Business Industry
industry_pattern = r'<label class="form-label">Business Industry</label>\s*<select class="form-select glass-input" id="industrySelect">[\s\S]*?</select>'
service_replacement = f'<label class="form-label">Select Service</label>\n                            <select class="form-select glass-input" id="serviceSelect">{services_html}\n                            </select>'
index_html = re.sub(industry_pattern, service_replacement, index_html)

# Replace Target Location Tier
tier_pattern = r'<label class="form-label">Target Location Tier</label>\s*<select class="form-select glass-input" id="tierSelect">[\s\S]*?</select>'
location_replacement = f'<label class="form-label">Target Location</label>\n                            <select class="form-select glass-input" id="locationSelect">{locations_html}\n                            </select>'
index_html = re.sub(tier_pattern, location_replacement, index_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated index.html")
