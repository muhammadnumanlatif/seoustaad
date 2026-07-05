import re

files = ['index.html', 'city-template.html', 'service-template.html']

quick_faq_html = """            <!-- Quick Enquiries Section -->
            <div class="panel-faq-section mt-3 pt-2 border-top border-secondary border-opacity-25">
                <div class="d-flex align-items-center mb-3">
                    <div class="icon-circle bg-orange bg-opacity-10 me-2" style="width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-bolt text-orange" style="font-size: 0.7rem;"></i>
                    </div>
                    <span class="fw-bold text-white small m-0">Quick Enquiries / FAQs</span>
                </div>
                <div id="waWidgetQuickFaqs" class="d-flex flex-column gap-2 mb-3" style="max-height: 150px; overflow-y: auto;">
                    <!-- Dynamically populated by JS based on dropdown selections -->
                </div>
            </div>

            <!-- Dynamic WhatsApp Chat section -->"""

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # If already injected, skip
    if 'id="waWidgetQuickFaqs"' in html:
        continue

    # Find the start of the Project Enquiries section
    pattern = r"<!-- Dynamic WhatsApp Chat section -->"
    html = html.replace(pattern, quick_faq_html)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

print("HTML widget updated")
