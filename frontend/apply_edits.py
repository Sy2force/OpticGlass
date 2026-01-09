
import json
import os

def apply_edits(source_file, edits_file):
    print(f"Applying edits from {edits_file} to {source_file}...")
    
    if not os.path.exists(source_file):
        print(f"Error: {source_file} not found.")
        return

    if not os.path.exists(edits_file):
        print(f"Error: {edits_file} not found.")
        return

    with open(source_file, 'r', encoding='utf-8') as f:
        content = f.read()

    with open(edits_file, 'r', encoding='utf-8') as f:
        edits = json.load(f)

    count = 0
    for edit in edits:
        old_str = edit['old_string']
        new_str = edit['new_string']
        
        if old_str in content:
            content = content.replace(old_str, new_str)
            count += 1
        else:
            # Try to be more lenient with whitespace if exact match fails
            # This handles potential newline differences
            normalized_content = ' '.join(content.split())
            normalized_old = ' '.join(old_str.split())
            if normalized_old in normalized_content:
                 # This is tricky to replace if we normalized. 
                 # Let's stick to exact match first.
                 print(f"Warning: Could not find exact old string for edit: {old_str[:50]}...")
            else:
                 print(f"Warning: Could not find old string for edit: {old_str[:50]}...")

    with open(source_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Applied {count} edits to {source_file}.")

base_dir = '/Users/shayacoca/Optic Glass/frontend'
apply_edits(f'{base_dir}/src/shared/data/products.js', f'{base_dir}/edits_fr.json')
apply_edits(f'{base_dir}/src/shared/data/products_en.js', f'{base_dir}/edits_en.json')
