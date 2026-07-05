import json

faqs_db = {
    "web": [
        {"q": "How long does it take to develop a custom website?", "a": "A standard custom website usually takes 2-4 weeks from initial design to final launch, depending on the complexity of your requirements."},
        {"q": "Do you provide ongoing maintenance and bug fixing?", "a": "Yes! We offer dedicated maintenance packages and one-off bug fixing services for WordPress, Shopify, and custom stacks like Next.js."},
        {"q": "Will my new website be mobile-responsive?", "a": "Absolutely. Every website we build is 100% responsive, ensuring it looks beautiful and functions perfectly on all devices and screen sizes."},
        {"q": "Do you offer Website Speed Optimization?", "a": "Yes, we specialize in optimizing website performance to achieve high Core Web Vitals scores and sub-second load times."}
    ],
    "seo": [
        {"q": "How long does it take to see results from Technical SEO?", "a": "Technical SEO improvements like Core Web Vitals fixes or schema markup can show ranking improvements within 2 to 4 weeks after Google recrawls the site."},
        {"q": "What is included in a Technical SEO Audit?", "a": "Our audit covers crawlability, indexability, site architecture, Core Web Vitals, toxic backlink analysis, and structured data implementation."},
        {"q": "Why do I need Schema Markup?", "a": "Schema markup helps search engines understand your content better, significantly increasing your chances of capturing Rich Snippets and boosting click-through rates."},
        {"q": "Can you recover my site from a Google penalty?", "a": "Yes, our toxic backlink disavow and penalty recovery service is specifically designed to lift manual or algorithmic Google penalties."}
    ],
    "local": [
        {"q": "How can Local SEO help my business in {LOCATION}?", "a": "Local SEO ensures your business dominates local search results in {LOCATION}. When customers nearby search for your services, your Google Business Profile will appear at the top."},
        {"q": "Do you build Local Citations for {LOCATION}?", "a": "Yes, we create consistent, high-DA local citations and directory listings tailored specifically for businesses in {LOCATION}."},
        {"q": "What does your Local SEO retainer include?", "a": "Our monthly retainer includes continuous GMB management, weekly localized posts, citation building, reputation management, and geo-targeted landing page optimization."},
        {"q": "Can you rank my Google Business Profile in the top 3 Map Pack?", "a": "Yes! Getting clients into the Google Maps '3-Pack' is our specialty and the primary goal of our local SEO strategy."}
    ],
    "ecom": [
        {"q": "Can you optimize my Shopify or WooCommerce product pages?", "a": "Yes, we perform complete on-page SEO for e-commerce products, including title tags, meta descriptions, keyword-rich product descriptions, and image alt text."},
        {"q": "What is an E-Commerce Architecture Restructure?", "a": "It involves organizing your categories, subcategories, and products into a logical 'silo' structure that maximizes link equity and makes it easier for search engines to crawl your store."},
        {"q": "How does Conversion Rate Optimization (CRO) work?", "a": "Our CRO audit analyzes user behavior on your site to identify bottlenecks. We then implement data-driven tweaks to turn more of your existing traffic into paying customers."},
        {"q": "Do you optimize category pages?", "a": "Absolutely. E-commerce category pages are critical for driving high-volume traffic. We optimize them with deep content, internal linking, and structured data."}
    ],
    "smm": [
        {"q": "What kind of backlinks do you build?", "a": "We focus on high-quality, contextual backlinks including Ultra High-DR Guest Posts, niche edits, and premium Web 2.0 foundation links."},
        {"q": "How does your Competitor Backlink Intercept strategy work?", "a": "We analyze your top competitors' backlink profiles and aggressively target their best link sources to replicate and outrank their authority."},
        {"q": "Do you manage Meta Ads (Facebook & Instagram)?", "a": "Yes, we handle everything from campaign setup and advanced audience targeting to high-converting ad copywriting and creative strategy."},
        {"q": "What is included in your Social Media Management?", "a": "Our premium management includes a full content calendar, professional graphic design, 3 high-quality posts per week, and community engagement."}
    ],
    "general": [
        {"q": "How much do your services cost?", "a": "Our services range from 5,000 PKR to 30,000 PKR depending on the exact scope of the project. We offer transparent, upfront pricing."},
        {"q": "Do you work with international clients?", "a": "Yes! While we have a strong presence in Pakistan, we serve clients globally and adapt our strategies for international markets."},
        {"q": "How do we communicate during the project?", "a": "You will have direct access to your dedicated expert via WhatsApp and email for real-time updates and quick queries."}
    ]
}

with open('faqs.json', 'w', encoding='utf-8') as f:
    json.dump(faqs_db, f, indent=2)

print("faqs.json generated.")
