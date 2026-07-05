import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace const faqData = [ ... ]; with const faqData = window.pageSpecificFaqs || [ ... ];
# Since we don't know the exact lines, let's use a regex that matches the array
faq_pattern = r"const faqData = \[\s*\{[\s\S]*?\}\s*\];"

new_faq_data = """window.defaultFaqs = [
        { q: "How much time does it take to see results?", a: "For Local SEO and GMB ranking, noticeable improvements typically occur within 3-4 weeks. For broader Technical and E-Commerce SEO, significant traffic jumps happen between 2-3 months as Google indexes the advanced optimizations and toxic link disavowals." },
        { q: "Do you offer custom web development and bug fixing?", a: "Yes. We offer complete custom web development using Next.js and React, as well as premium bug fixing and speed optimization for WordPress, Shopify, and WooCommerce stores." },
        { q: "How do your SEO packages work?", a: "We provide tailored, one-off premium services. Instead of monthly retainers locking you in, you can order specific optimizations (like Schema Markup, Toxic Backlink Disavowal, or Speed Optimization) exactly when you need them. However, we do offer a comprehensive Monthly Retainer for clients who want us to dominate their local city." },
        { q: "What is AEO and why does it matter?", a: "Answer Engine Optimization (AEO) ensures your website is structured with proper Schema Markup and precise semantic content so that AI search engines (like ChatGPT, Google SGE, and Perplexity) use your business as the definitive answer." }
    ];
    const faqData = window.pageSpecificFaqs || window.defaultFaqs;"""

js = re.sub(faq_pattern, new_faq_data, js)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("script.js FAQs updated")
