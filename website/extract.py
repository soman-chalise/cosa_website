import os
import json
import re
try:
    from PyPDF2 import PdfReader
except ImportError:
    print("PyPDF2 not found")
    exit(1)

dirs = [
    {'path': '../COSA SPORTS LISTS-MEN', 'gender': 'Men'},
    {'path': '../COSA SPORTS LISTS-WOMEN', 'gender': 'Women'}
]

result = []

for d in dirs:
    directory = d['path']
    if not os.path.exists(directory):
        print(f"Directory {directory} not found")
        continue
        
    for filename in os.listdir(directory):
        if not filename.endswith('.pdf'):
            continue
            
        filepath = os.path.join(directory, filename)
        
        try:
            reader = PdfReader(filepath)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
                
            lines = [line.strip() for line in text.split('\n') if line.strip()]
            
            # Clean up sport name
            sport_name = filename
            sport_name = re.sub(r'(?i)COSA', '', sport_name)
            sport_name = re.sub(r'(?i)MENS?', '', sport_name)
            sport_name = re.sub(r'(?i)WOMENS?', '', sport_name)
            sport_name = re.sub(r'(?i)\.pdf', '', sport_name)
            sport_name = sport_name.replace('.', '').strip()
            
            # Basic parsing of lines to extract names. The names are usually in lines after the header.
            # We'll just store the lines for now, or try to filter out Sr No, Name, Dept etc.
            names = []
            for line in lines:
                # If line is like "1 Soman Chalise TE"
                # Let's just capture anything that looks like a name.
                # Actually, storing the raw lines is safer so I can inspect.
                pass
                
            result.append({
                'sport': sport_name,
                'gender': d['gender'],
                'file': filename,
                'lines': lines
            })
        except Exception as e:
            print(f"Failed to read {filename}: {e}")

with open('extracted_sports.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2)

print("Extraction complete")
