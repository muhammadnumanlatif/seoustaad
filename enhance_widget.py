import re

css = """
/* Premium WhatsApp Widget Enhancements */
.premium-select {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #e9ecef;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 0.8rem;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff6600' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 14px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.premium-select:hover, .premium-select:focus {
    background-color: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 102, 0, 0.5);
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.15);
}

.premium-select option {
    background-color: #1a1d21;
    color: #fff;
    padding: 10px;
}

.premium-select option:disabled {
    color: #6c757d;
}

.premium-whatsapp-btn {
    background: linear-gradient(135deg, var(--primary-orange) 0%, #e65c00 100%);
    color: #fff !important;
    border: none;
    border-radius: 8px;
    padding: 10px 0;
    box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.premium-whatsapp-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, #e65c00 0%, var(--primary-orange) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.premium-whatsapp-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 102, 0, 0.4);
}

.premium-whatsapp-btn:hover::before {
    opacity: 1;
}

@keyframes softPulse {
    0% { box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3); }
    50% { box-shadow: 0 4px 25px rgba(255, 102, 0, 0.5); }
    100% { box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3); }
}

.premium-whatsapp-btn {
    animation: softPulse 2.5s infinite;
}

@keyframes onlinePulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
}

.online-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: var(--primary-orange);
    border-radius: 50%;
    margin-right: 4px;
    animation: onlinePulse 2s infinite;
}
"""

with open('style.css', 'r', encoding='utf-8') as f:
    if '.premium-whatsapp-btn' not in f.read():
        with open('style.css', 'a', encoding='utf-8') as fa:
            fa.write(css)

files = ['index.html', 'city-template.html', 'service-template.html']

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # Replace "Online • Agent" with online-dot
    html = re.sub(
        r'<span class="text-orange x-small">Online • Agent (\d+)</span>',
        r'<span class="text-orange x-small"><span class="online-dot"></span>Online • Agent \1</span>',
        html
    )

    # Replace "Discuss a specific project:" section
    old_section_header = r'<span class="fw-bold text-white x-small d-block mb-2">Discuss a specific project:</span>'
    new_section_header = r"""<div class="d-flex align-items-center mb-3">
                    <div class="icon-circle bg-orange bg-opacity-10 me-2" style="width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-briefcase text-orange" style="font-size: 0.7rem;"></i>
                    </div>
                    <span class="fw-bold text-white small m-0">Project Enquiries</span>
                </div>"""
    html = re.sub(old_section_header, new_section_header, html)

    # Replace select classes
    html = re.sub(
        r'<select class="form-select text-gray bg-transparent border border-secondary border-opacity-25 rounded px-2" style="font-size: 0.75rem; height: 30px;" id="waWidgetService">',
        r'<select class="premium-select mb-2" id="waWidgetService">',
        html
    )
    
    html = re.sub(
        r'<select class="form-select text-gray bg-transparent border border-secondary border-opacity-25 rounded px-2" style="font-size: 0.75rem; height: 30px;" id="waWidgetLocation">',
        r'<select class="premium-select" id="waWidgetLocation">',
        html
    )

    # Replace button
    old_btn = r'<a href="javascript:void\(0\)" id="waWidgetChatBtn" class="btn btn-orange text-white w-100 fw-bold mt-1 d-flex align-items-center justify-content-center" style="font-size: 0.8rem; padding: 6px 0;">\s*<i class="fab fa-whatsapp me-2"></i> Chat with Expert\s*</a>'
    new_btn = r"""<a href="javascript:void(0)" id="waWidgetChatBtn" class="premium-whatsapp-btn w-100 fw-bold mt-3 d-flex align-items-center justify-content-center text-decoration-none">
                        <i class="fab fa-whatsapp me-2 fs-5"></i> Chat with Expert
                    </a>"""
    html = re.sub(old_btn, new_btn, html)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
        
print("Updated all templates and CSS")
