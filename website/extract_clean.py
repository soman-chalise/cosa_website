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
            sport_name = re.sub(r'(?i)WO$', '', sport_name)
            sport_name = sport_name.replace('.', '').strip()
            
            players = []
            
            # The format is either:
            # "1 Name (C) BE" or "100*4 Relay Name BE"
            # We can look for lines that contain a student name
            
            for line in lines:
                # filter out headers and footers
                lower_line = line.lower()
                if "department" in lower_line or "list of participants" in lower_line or "sr. no." in lower_line or "event" in lower_line or "cosa" in lower_line or "sports representative" in lower_line or "head of" in lower_line or "coordinator" in lower_line or "dr. n. m." in lower_line or "mr. vishal" in lower_line or "ms. samnin" in lower_line or "ms. sharwani" in lower_line or "mr. a" in lower_line or "mrs. b" in lower_line or "ms. b" in lower_line or "mr. khemraj" in lower_line or "mr. amol" in lower_line:
                    continue
                
                # It's a player line
                # Let's clean it up
                cleaned = re.sub(r'^(\d+|Sub\.)\s*(100m Race|200m Race|100\*4 Relay|200\*4 Relay)?\s*', '', line, flags=re.IGNORECASE).strip()
                if cleaned:
                    players.append(cleaned)
                    
            if players:
                result.append({
                    'sport': sport_name,
                    'gender': d['gender'],
                    'players': players
                })
        except Exception as e:
            pass

with open('src/sports_data.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2)

print("Extraction complete")
