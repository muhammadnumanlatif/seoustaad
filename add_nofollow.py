import os
import re

def add_nofollow(content):
    # Regex to find <a> tags with href pointing to social/wa.me without the rel attribute or with incomplete rel
    # We'll do a simpler approach: 
    # 1. find all <a> tags
    # 2. if href is external social/wa, add or replace rel
    
    def replacer(match):
        a_tag = match.group(0)
        href_match = re.search(r'href="([^"]+)"', a_tag)
        if not href_match:
            return a_tag
            
        href = href_match.group(1)
        if not any(domain in href for domain in ['wa.me', 'facebook.com', 'instagram.com', 'linkedin.com']):
            return a_tag
            
        # Check if it already has rel="nofollow noopener noreferrer"
        if 'rel="nofollow noopener noreferrer"' in a_tag:
            return a_tag
            
        # Remove any existing rel attribute
        a_tag = re.sub(r'\s*rel="[^"]*"', '', a_tag)
        
        # Insert rel="nofollow noopener noreferrer" right after <a 
        a_tag = a_tag.replace('<a ', '<a rel="nofollow noopener noreferrer" ')
        return a_tag

    # Match all <a ...> tags
    return re.sub(r'<a\s+[^>]+>', replacer, content)

for filename in os.listdir('.'):
    if filename.endswith('.html') or filename.endswith('.js'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = add_nofollow(content)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")

