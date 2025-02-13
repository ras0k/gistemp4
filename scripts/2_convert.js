const fs = require('fs/promises');
const path = require('path');
const { execFile } = require('child_process');
const util = require('util');
const execFilePromise = util.promisify(execFile);

const asciiFolder = path.join(__dirname, 'ascii');
const binFolder = path.join(__dirname, 'bin');

(async () => {
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
        const { stdout, stderr } = await execFilePromise('./asc2bin.exe', args);
        if (stdout) console.log(`stdout: ${stdout}`);
        if (stderr) console.error(`stderr: ${stderr}`);
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

