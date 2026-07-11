import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace window.openWhatsAppChat function to accept a phone number
old_fn = r"""window.openWhatsAppChat = function\(\) \{[\s\S]*?window.open\(`https:\/\/wa\.me\/923353453099\?text=\$\{encodeURIComponent\(text\)\}`, '_blank'\);\s*\};"""
new_fn = """window.openWhatsAppChat = function(phone) {
    if (!phone) phone = '923353453099';
    const serviceSelect = document.getElementById('waWidgetService');
    const locationSelect = document.getElementById('waWidgetLocation');
    
    const service = serviceSelect && serviceSelect.value ? serviceSelect.value : 'your services';
    const location = locationSelect && locationSelect.value ? locationSelect.value : '';
    
    let text = `Hi SEO Ustaad! I want to discuss ${service}`;
    if (location) {
        text += ` targeting ${location}`;
    }
    text += `. Can we connect?`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
};"""

js = re.sub(old_fn, new_fn, js)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("JS Updated")
