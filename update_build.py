import re

with open('build.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Read the widget HTML at the top
widget_import = """const gigs = require('./gigs.json');
const widgetHtml = fs.existsSync(path.join(srcDir, 'components', 'whatsapp-widget.html')) ? fs.readFileSync(path.join(srcDir, 'components', 'whatsapp-widget.html'), 'utf-8') : '';

function injectWidget(html) {
    if (html.includes('<!-- INJECT_WHATSAPP_WIDGET -->')) {
        return html.replace('<!-- INJECT_WHATSAPP_WIDGET -->', widgetHtml);
    }
    return html;
}
"""

js = js.replace("const gigs = require('./gigs.json');", widget_import)

# Inject in filesToProcess
js = js.replace("content = injectCanonical(content, canonicalUrl);", "content = injectCanonical(content, canonicalUrl);\n    content = injectWidget(content);")

# Inject in city template
js = js.replace("fs.writeFileSync(path.join(cityDir, 'index.html'), cityContent, 'utf8');", "cityContent = injectWidget(cityContent);\n    fs.writeFileSync(path.join(cityDir, 'index.html'), cityContent, 'utf8');")

# Inject in gigs
js = js.replace("fs.writeFileSync(path.join(gigDir, 'index.html'), gigContent, 'utf8');", "gigContent = injectWidget(gigContent);\n    fs.writeFileSync(path.join(gigDir, 'index.html'), gigContent, 'utf8');")

# Inject in Locations hub
js = js.replace("fs.writeFileSync(path.join(locationsDir, 'index.html'), hubContent, 'utf8');", "hubContent = injectWidget(hubContent);\nfs.writeFileSync(path.join(locationsDir, 'index.html'), hubContent, 'utf8');")

# Inject in Services hub
js = js.replace("fs.writeFileSync(path.join(sDir, 'index.html'), servicesHubContent, 'utf8');", "servicesHubContent = injectWidget(servicesHubContent);\nfs.writeFileSync(path.join(sDir, 'index.html'), servicesHubContent, 'utf8');")

with open('build.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("build.js updated with widget injection.")
