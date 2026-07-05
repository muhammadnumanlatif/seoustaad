import re

with open('build.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix the ReferenceError by moving the widget reading down
bad_snippet = """const widgetHtml = fs.existsSync(path.join(srcDir, 'components', 'whatsapp-widget.html')) ? fs.readFileSync(path.join(srcDir, 'components', 'whatsapp-widget.html'), 'utf-8') : '';"""

js = js.replace(bad_snippet, "")

target = "const srcDir = __dirname;"
js = js.replace(target, target + "\n" + bad_snippet)

with open('build.js', 'w', encoding='utf-8') as f:
    f.write(js)

