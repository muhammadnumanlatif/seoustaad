import re

files = ['index.html', 'city-template.html', 'service-template.html']

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace Agent 1 link
    html = re.sub(
        r'<a href="https://wa\.me/923379912300\?text=[^"]*" target="_blank" class="agent-link d-flex align-items-center p-2 rounded">',
        r'<a href="javascript:void(0)" onclick="openWhatsAppChat(\'923379912300\')" class="agent-link d-flex align-items-center p-2 rounded text-decoration-none">',
        html
    )

    # Replace Agent 2 link
    html = re.sub(
        r'<a href="https://wa\.me/923146348900\?text=[^"]*" target="_blank" class="agent-link d-flex align-items-center p-2 rounded">',
        r'<a href="javascript:void(0)" onclick="openWhatsAppChat(\'923146348900\')" class="agent-link d-flex align-items-center p-2 rounded text-decoration-none">',
        html
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

print("HTML Agents Updated")
