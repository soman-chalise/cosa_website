import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

const dirs = [
  { path: '../COSA SPORTS LISTS-MEN', gender: 'Men' },
  { path: '../COSA SPORTS LISTS-WOMEN', gender: 'Women' }
];

async function extract() {
  const result = [];
  
  for (const dir of dirs) {
    const files = fs.readdirSync(dir.path).filter(f => f.endsWith('.pdf'));
    for (const file of files) {
      const filePath = path.join(dir.path, file);
      const dataBuffer = fs.readFileSync(filePath);
      
      try {
        const data = await pdf(dataBuffer);
        // The text might have multiple lines, we can just split by line
        const lines = data.text.split('\n').map(l => l.trim()).filter(l => l);
        
        // Extracted sports name from filename: e.g. "COSA 1KM MEN..pdf" -> "1KM"
        let sportName = file.replace(/COSA/ig, '').replace(/MENS?/ig, '').replace(/WOMENS?/ig, '').replace(/\.pdf/ig, '').replace(/\./g, '').trim();
        
        result.push({
          sport: sportName,
          gender: dir.gender,
          file: file,
          lines: lines
        });
      } catch (err) {
        console.error('Failed to parse', file, err);
      }
    }
  }
  
  fs.writeFileSync('extracted_sports.json', JSON.stringify(result, null, 2));
  console.log('Extraction complete');
}

extract();
