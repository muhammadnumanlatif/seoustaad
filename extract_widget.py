import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Try to find the widget block
# It starts around <!-- Advanced Floating WhatsApp Widget --> or <!-- Floating WhatsApp Button & Widget -->
start_str = "<!-- Advanced Floating WhatsApp Widget -->"
if start_str not in html:
    start_str = "<!-- Floating WhatsApp Widget -->"

if start_str not in html:
    print("Could not find start string")
    exit(1)

# Find where it ends. It probably ends right before </body> or right before some script tags
start_idx = html.find(start_str)

# Let's just find the closing </div> for the entire widget container or button
end_idx = html.find("<!-- Bootstrap JS -->", start_idx)
if end_idx == -1:
    end_idx = html.find("<script", start_idx)

widget_html = html[start_idx:end_idx].strip()
print("Found widget HTML. Length:", len(widget_html))
print("Start of widget:", widget_html[:100])
print("End of widget:", widget_html[-100:])

os.makedirs('components', exist_ok=True)
with open('components/whatsapp-widget.html', 'w', encoding='utf-8') as f:
    f.write(widget_html)

for filename in ['index.html', 'city-template.html', 'service-template.html', 'legal.html', 'package-details.html']:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        file_html = f.read()
    
    # We need to replace the same block in all templates
    s_idx = file_html.find("<!-- Advanced Floating WhatsApp Widget -->")
    if s_idx == -1:
        s_idx = file_html.find("<!-- Floating WhatsApp Widget -->")
        
    e_idx = file_html.find("<!-- Bootstrap JS -->", s_idx)
    if e_idx == -1:
        e_idx = file_html.find("<script", s_idx)
        
    if s_idx != -1 and e_idx != -1:
        new_html = file_html[:s_idx] + "<!-- INJECT_WHATSAPP_WIDGET -->\n\n    " + file_html[e_idx:]
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f"Replaced widget in {filename}")

