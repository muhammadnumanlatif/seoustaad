import re

files = ['index.html', 'city-template.html', 'service-template.html']

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # Add text-white and onclick to the button
    html = re.sub(
        r'<a href="javascript:void\(0\)" id="waWidgetChatBtn" class="premium-whatsapp-btn w-100 fw-bold mt-3 d-flex align-items-center justify-content-center text-decoration-none">',
        r'<a href="javascript:void(0)" onclick="openWhatsAppChat()" id="waWidgetChatBtn" class="premium-whatsapp-btn text-white w-100 fw-bold mt-3 d-flex align-items-center justify-content-center text-decoration-none">',
        html
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

print("HTML templates updated")
