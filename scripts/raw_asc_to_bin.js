const fs = require('fs/promises');
const path = require('path');
const { execFile } = require('child_process');
const util = require('util');
const execFilePromise = util.promisify(execFile);

const rawFolder = path.join(__dirname, 'raw_ascii');
const asciiFolder = path.join(__dirname, 'ascii');
const binFolder = path.join(__dirname, 'input_files');
const linesPerFile = 180;

async function processAsciiFiles() {
  try {
    try {
      await fs.access(asciiFolder);
    } catch (err) {
      await fs.mkdir(asciiFolder, { recursive: true });
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
              return Number((num / 100).toFixed(3));
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
        const newFilePath = path.join(asciiFolder, newFileName);

        await fs.writeFile(newFilePath, chunkContent, 'utf8');
        console.log(`Created file: ${newFileName}`);
      }
    }
  } catch (err) {
    console.error('Error processing ASCII files:', err);
    throw err;
  }
}

async function processBinFiles() {
  try {
    try {
      await fs.access(binFolder);
    } catch (err) {
      await fs.mkdir(binFolder, { recursive: true });
      console.log("Created bin folder");
    }

    const files = await fs.readdir(asciiFolder);
    const ascFiles = files.filter(file => path.extname(file).toLowerCase() === '.asc');

    for (const file of ascFiles) {
      const baseName = path.basename(file, '.asc');
      const match = baseName.match(/(\d{4})(\d{2})$/);
      if (!match) {
        console.log(`Skipping file ${file} - failed to extract year and part.`);
        continue;
      }
      const year = match[1];
      const part = match[2];

      const inputPath = path.join(asciiFolder, file);
      const outputFileName = baseName + '.bin';
      const outputPath = path.join(binFolder, outputFileName);

      const args = [inputPath, outputPath, year, part];
      console.log(`Processing file: ${file}`);
      console.log(`Executing: ./asc2bin.exe ${args.join(' ')}`);

      try {
        const { stdout, stderr } = await execFilePromise('./asc2bin', args);
        if (stdout) console.log(`stdout: ${stdout}`);
        if (stderr) console.error(`stderr: ${stderr}`);
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }
  } catch (error) {
    console.error("Error processing BIN files:", error);
    throw error;
  }
}

(async function main() {
  try {
    console.log("Starting processing of ASCII files...");
    await processAsciiFiles();
    console.log("ASCII file processing completed.\n");

    console.log("Starting conversion to BIN format...");
    await processBinFiles();
    console.log("Conversion to BIN format completed.");
  } catch (error) {
    console.error('Error in main processing:', error);
  }
})();

