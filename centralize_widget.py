import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_str = "<!-- Advanced Floating WhatsApp Widget"
start_idx = html.find(start_str)

end_idx = html.find("<!-- Floating Back to Top Button", start_idx)

if start_idx == -1 or end_idx == -1:
    print("Could not find boundaries in index.html")
    print("Start:", start_idx)
    print("End:", end_idx)
    exit(1)

widget_html = html[start_idx:end_idx].strip()

os.makedirs('components', exist_ok=True)
with open('components/whatsapp-widget.html', 'w', encoding='utf-8') as f:
    f.write(widget_html + "\n")

print("Saved widget to components/whatsapp-widget.html")

# Now replace it in the templates
for filename in ['index.html', 'city-template.html', 'service-template.html', 'legal.html', 'package-details.html']:
    if not os.path.exists(filename):
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        file_html = f.read()
        
    s_idx = file_html.find(start_str)
    if s_idx == -1:
        s_idx = file_html.find("<!-- Floating WhatsApp Widget")
        
    e_idx = file_html.find("<!-- Floating Back to Top Button", s_idx)
    
    if s_idx != -1 and e_idx != -1:
        new_html = file_html[:s_idx] + "<!-- INJECT_WHATSAPP_WIDGET -->\n\n    " + file_html[e_idx:]
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f"Replaced widget with placeholder in {filename}")
    else:
        print(f"Could not find boundaries in {filename}")

