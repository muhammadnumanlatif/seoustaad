import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove the old DOMContentLoaded logic for waWidgetChatBtn
old_logic_pattern = r"// Dynamic WhatsApp Widget Logic\s*document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{[\s\S]*?\}\);\s*\}\);"

# Because of the nested structure, let's just replace the exact block if we can, 
# or just redefine the function. Let's redefine the function at the bottom.

new_logic = """
window.openWhatsAppChat = function() {
    const serviceSelect = document.getElementById('waWidgetService');
    const locationSelect = document.getElementById('waWidgetLocation');
    
    const service = serviceSelect && serviceSelect.value ? serviceSelect.value : 'your services';
    const location = locationSelect && locationSelect.value ? locationSelect.value : '';
    
    let text = `Hi SEO Ustaad! I want to discuss ${service}`;
    if (location) {
        text += ` targeting ${location}`;
    }
    text += `. Can we connect?`;
    
    window.open(`https://wa.me/923379912300?text=${encodeURIComponent(text)}`, '_blank');
};
"""

with open('script.js', 'a', encoding='utf-8') as f:
    f.write(new_logic)

print("JS updated")
