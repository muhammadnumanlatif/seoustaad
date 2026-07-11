import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add logic for populating Quick FAQs
# We will hook into the dropdown listeners if they exist, or just add our own.
# The dropdown listeners are added inside `document.addEventListener('DOMContentLoaded', ...)` at the bottom of the file (added previously)

js_to_add = """
// Smart Widget Quick FAQs Logic
document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.getElementById('waWidgetService');
    const locationSelect = document.getElementById('waWidgetLocation');
    const quickFaqsContainer = document.getElementById('waWidgetQuickFaqs');
    
    if (quickFaqsContainer) {
        function updateQuickFaqs() {
            const service = serviceSelect && serviceSelect.value ? serviceSelect.value : '';
            const loc = locationSelect && locationSelect.value ? locationSelect.value : '';
            
            // Generate some dynamic FAQs
            let dynamicFaqs = [];
            if (service) {
                dynamicFaqs.push(`What does the ${service} package include?`);
                dynamicFaqs.push(`How fast can you start working on ${service}?`);
            }
            if (loc) {
                dynamicFaqs.push(`Do you have case studies for clients in ${loc}?`);
            }
            
            if (dynamicFaqs.length === 0) {
                dynamicFaqs = [
                    "How much for a custom Shopify store?",
                    "What are your premium SEO packages?",
                    "How to start with Meta Ads?"
                ];
            }
            
            // Limit to 3 items to save space
            dynamicFaqs = dynamicFaqs.slice(0, 3);
            
            quickFaqsContainer.innerHTML = '';
            dynamicFaqs.forEach(faq => {
                const a = document.createElement('a');
                a.href = "javascript:void(0)";
                // Call openWhatsAppChat with Agent 1 by default, but pass the specific question
                a.onclick = function() {
                    const phone = '923353453099';
                    let text = `Hi SEO Ustaad! I have a question: ${faq}`;
                    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
                };
                a.className = "wa-widget-faq-link d-flex justify-content-between align-items-center p-2 rounded text-decoration-none border border-secondary border-opacity-25 mb-1";
                
                const span = document.createElement('span');
                span.className = "text-white small";
                span.textContent = faq;
                
                const i = document.createElement('i');
                i.className = "fas fa-chevron-right text-orange x-small";
                
                a.appendChild(span);
                a.appendChild(i);
                
                quickFaqsContainer.appendChild(a);
            });
        }
        
        // Initial population
        updateQuickFaqs();
        
        // Listeners
        if (serviceSelect) serviceSelect.addEventListener('change', updateQuickFaqs);
        if (locationSelect) locationSelect.addEventListener('change', updateQuickFaqs);
    }
});
"""

with open('script.js', 'a', encoding='utf-8') as f:
    f.write(js_to_add)

print("script.js updated with Quick FAQs logic")
