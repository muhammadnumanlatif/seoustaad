import re
import json

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

services_html = '<option value="" disabled selected>Select Service...</option>'
for cat_key, cat_name in categories.items():
    services_html += f'\n                        <optgroup label="{cat_name}">'
    for gig in gigs:
        if gig['category'] == cat_key:
            services_html += f'\n                            <option value="{gig["name"]}">{gig["name"]}</option>'
    services_html += f'\n                        </optgroup>'

locations_html = '<option value="" disabled selected>Select Location...</option>'
for city in cities:
    locations_html += f'\n                        <option value="{city}">{city}</option>'

dynamic_widget_html = f"""<!-- Dynamic WhatsApp Chat section -->
            <div class="panel-faq-section mt-3 pt-2 border-top border-secondary border-opacity-25">
                <span class="fw-bold text-white x-small d-block mb-2">Discuss a specific project:</span>
                <div class="d-flex flex-column gap-2">
                    <select class="form-select text-gray bg-transparent border border-secondary border-opacity-25 rounded px-2" style="font-size: 0.75rem; height: 30px;" id="waWidgetService">
                        {services_html}
                    </select>
                    <select class="form-select text-gray bg-transparent border border-secondary border-opacity-25 rounded px-2" style="font-size: 0.75rem; height: 30px;" id="waWidgetLocation">
                        {locations_html}
                    </select>
                    <a href="javascript:void(0)" id="waWidgetChatBtn" class="btn btn-orange text-white w-100 fw-bold mt-1 d-flex align-items-center justify-content-center" style="font-size: 0.8rem; padding: 6px 0;">
                        <i class="fab fa-whatsapp me-2"></i> Chat with Expert
                    </a>
                </div>
            </div>"""

for template in ['index.html', 'city-template.html', 'service-template.html']:
    with open(template, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the FAQ section and replace it
    faq_pattern = r'<!-- Quick FAQs section inside WhatsApp Panel -->[\s\S]*?</a>\s*</div>\s*</div>'
    if re.search(faq_pattern, html):
        html = re.sub(faq_pattern, dynamic_widget_html, html)
        with open(template, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Updated {template}")

