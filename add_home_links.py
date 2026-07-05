import re

files = ['index.html', 'city-template.html', 'service-template.html', 'legal.html', 'package-details.html']

for filename in files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            html = f.read()
            
        # Add to Navbar
        if '<a class="nav-link text-white" href="/">Home</a>' not in html:
            navbar_pattern = r'(<ul class="navbar-nav ms-auto align-items-center">)'
            navbar_replacement = r'\1\n                    <li class="nav-item">\n                        <a class="nav-link text-white" href="/">Home</a>\n                    </li>'
            html = re.sub(navbar_pattern, navbar_replacement, html)
            
        # Add to Footer Company Section
        if '<a href="/" class="footer-link text-decoration-none">Home</a>' not in html:
            footer_pattern = r'(<h5 class="outfit mb-4 text-white text-uppercase tracking-wider small fw-bold">Company</h5>\s*<ul class="list-unstyled text-gray small">)'
            footer_replacement = r'\1\n                        <li class="mb-2"><a href="/" class="footer-link text-decoration-none">Home</a></li>'
            html = re.sub(footer_pattern, footer_replacement, html)

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Updated {filename}")
    except FileNotFoundError:
        print(f"File {filename} not found.")

