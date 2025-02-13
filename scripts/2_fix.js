const fs = require('fs/promises');
const path = require('path');

const rawFolder = path.join(__dirname, 'raw_ascii');
const outFolder = path.join(__dirname, 'ascii');
const linesPerFile = 180;

function cccc(x) {
  return Number(x.toFixed(3));
  const fahrenheit = (celsius * 9 / 5) + 32;
  return Number(fahrenheit.toFixed(2));
}

(async function() {
  try {
    try {
      await fs.access(outFolder);
    } catch (err) {
      await fs.mkdir(outFolder, { recursive: true });
    }

    const files = await fs.readdir(rawFolder);
    const ascFiles = files.filter(file => path.extname(file).toLowerCase() === '.asc');

    for (const file of ascFiles) {
      const filePath = path.join(rawFolder, file);
      const data = await fs.readFile(filePath, 'utf8');
      let lines = data.split(/\r?\n/);

      if (lines.length && lines[lines.length - 1] === '') {
        lines.pop();
      }

      const processedLines = lines
        .map(line => line.trim())
        .filter(line => line !== '')
        .map(line => {
          return line
            .split(/\s+/)
            .map(token => {
              const num = parseFloat(token);
              if (isNaN(num) || num === -9999) {
                return token;
              }
              return cccc(num / 100);
            })
            .join(' ');
        });

      const totalChunks = Math.ceil(processedLines.length / linesPerFile);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);

      for (let i = 0; i < totalChunks; i++) {
        const chunk = processedLines.slice(i * linesPerFile, (i + 1) * linesPerFile);
        const chunkContent = chunk.join('\n');
        const pieceNumber = String(i + 1).padStart(2, '0');
        const newFileName = `${baseName}${pieceNumber}${ext}`;
        const newFilePath = path.join(outFolder, newFileName);

        await fs.writeFile(newFilePath, chunkContent, 'utf8');
        console.log(`Created file: ${newFileName}`);
      }
    }
    
  } catch (err) {
    console.error('Error:', err);
  }
})();

