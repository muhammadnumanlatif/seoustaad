import re

files = ['index.html', 'city-template.html', 'service-template.html']

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # Fix Agent 1 link
    html = html.replace(
        "onclick=\"openWhatsAppChat(\\'923379912300\\')\"",
        "onclick=\"openWhatsAppChat('923379912300')\""
    )

    # Fix Agent 2 link
    html = html.replace(
        "onclick=\"openWhatsAppChat(\\'923146348900\\')\"",
        "onclick=\"openWhatsAppChat('923146348900')\""
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

print("Quotes fixed in HTML")
