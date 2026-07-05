import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix in injectFaqSchema
js = js.replace('`${f.boldAnswer} ${f.regularAnswer}`', 'f.a')

# Fix in renderFaqs filter
old_filter = """        const filtered = faqData.filter(f => 
            f.q.toLowerCase().includes(normalizedFilter) || 
            f.boldAnswer.toLowerCase().includes(normalizedFilter) || 
            f.regularAnswer.toLowerCase().includes(normalizedFilter)
        );"""
new_filter = """        const filtered = faqData.filter(f => 
            f.q.toLowerCase().includes(normalizedFilter) || 
            f.a.toLowerCase().includes(normalizedFilter)
        );"""
js = js.replace(old_filter, new_filter)

# Fix in renderFaqs innerHTML mapping
old_mapping = """<strong>${f.boldAnswer}</strong> ${f.regularAnswer}"""
new_mapping = """${f.a}"""
js = js.replace(old_mapping, new_mapping)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Fixed f.boldAnswer and f.regularAnswer in script.js")
