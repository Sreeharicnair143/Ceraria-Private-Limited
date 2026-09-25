const fs = require('fs');
const path = require('path');

async function extractPDFs() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

  const files = [
    path.join(__dirname, 'public', 'assets', 'Ceraria_Brand_Story.pdf'),
    path.join(__dirname, 'public', 'assets', 'ceraria-brand-story-india.pdf')
  ];

  let output = '';

  for (const file of files) {
    const header = `\n${'='.repeat(80)}\nFILE: ${path.basename(file)}\n${'='.repeat(80)}\n`;
    console.log(header);
    
    try {
      const dataBuffer = new Uint8Array(fs.readFileSync(file));
      const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
      const pdfDocument = await loadingTask.promise;
      
      let fullText = '';
      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += `\n--- PAGE ${i} ---\n` + pageText + '\n';
      }
      
      console.log(fullText);
      output += header + '\n' + fullText + '\n';
    } catch (err) {
      console.error(`Error reading ${path.basename(file)}:`, err);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'pdf_content.txt'), output, 'utf-8');
  console.log('\nSaved to pdf_content.txt');
}

extractPDFs();
