import re
import json

with open('faqs.json', 'r', encoding='utf-8') as f:
    faqs_db = json.load(f)

with open('build.js', 'r', encoding='utf-8') as f:
    build_js = f.read()

# We need to add logic to inject script tag before </head>
# In build.js, there is `function injectCanonical(html, canonicalUrl) {`
# We can add `function injectFaqs(html, faqs) { return html.replace('</head>', \`    <script>window.pageSpecificFaqs = \${JSON.stringify(faqs)};</script>\\n</head>\`); }`

injection_fn = """function injectCanonical(html, canonicalUrl) {
    if (html.includes('<link rel="canonical"')) {
        return html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);
    }
    return html.replace('</head>', `    <link rel="canonical" href="${canonicalUrl}" />\\n</head>`);
}

function injectFaqs(html, faqs) {
    if (!faqs || faqs.length === 0) return html;
    return html.replace('</head>', `    <script>window.pageSpecificFaqs = ${JSON.stringify(faqs)};</script>\\n</head>`);
}
"""

build_js = build_js.replace("function injectCanonical(html, canonicalUrl) {\n    if (html.includes('<link rel=\"canonical\"')) {\n        return html.replace(/<link rel=\"canonical\" href=\"[^\"]*\"/, `<link rel=\"canonical\" href=\"${canonicalUrl}\"`);\n    }\n    return html.replace('</head>', `    <link rel=\"canonical\" href=\"${canonicalUrl}\" />\\n</head>`);\n}", injection_fn)

# Now in the generate location pages loop:
#     let pageHtml = fixInternalLinks(cityTemplateHtml);
#     pageHtml = injectCanonical(pageHtml, `https://seoustaad.com/locations/seo-agency-${citySlug}/`);
loc_pattern = r"(let pageHtml = fixInternalLinks\(cityTemplateHtml\);\s*pageHtml = injectCanonical\(pageHtml,[^;]+;\s*pageHtml = updatePrices\(pageHtml\);)"
loc_replace = r"""\1
    // Generate location FAQs
    const faqsDb = require('./faqs.json');
    let locationFaqs = [];
    if (faqsDb.local) {
        locationFaqs = faqsDb.local.map(faq => ({
            q: faq.q.replace(/\{LOCATION\}/g, city),
            a: faq.a.replace(/\{LOCATION\}/g, city)
        }));
    }
    locationFaqs = locationFaqs.concat(faqsDb.general || []);
    pageHtml = injectFaqs(pageHtml, locationFaqs);"""
build_js = re.sub(loc_pattern, loc_replace, build_js)

# Now in the generate service pages loop:
#     let pageHtml = fixInternalLinks(serviceTemplateHtml);
#     pageHtml = injectCanonical(pageHtml, `https://seoustaad.com/services/${gig.slug}/`);
svc_pattern = r"(let pageHtml = fixInternalLinks\(serviceTemplateHtml\);\s*pageHtml = injectCanonical\(pageHtml,[^;]+;\s*pageHtml = updatePrices\(pageHtml\);)"
svc_replace = r"""\1
    // Generate service FAQs
    const faqsDb = require('./faqs.json');
    let serviceFaqs = [];
    if (faqsDb[gig.category]) {
        serviceFaqs = [...faqsDb[gig.category]];
    }
    serviceFaqs = serviceFaqs.concat(faqsDb.general || []);
    pageHtml = injectFaqs(pageHtml, serviceFaqs);"""
build_js = re.sub(svc_pattern, svc_replace, build_js)

with open('build.js', 'w', encoding='utf-8') as f:
    f.write(build_js)

print("build.js updated with dynamic FAQ injection")
