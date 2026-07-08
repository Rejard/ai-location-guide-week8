const fs = require('fs');
const path = require('path');

module.exports = {
  id: 'static-files',
  name: 'Static Files Integrity Check',
  layer: 'FUNCTION',
  linkedTask: 'static-assets',

  async run(ctx) {
    const publicDir = path.resolve(__dirname, '../../public');
    const requiredFiles = ['index.html', 'style.css', 'guide.html'];
    const missing = [];

    for (const file of requiredFiles) {
      const filePath = path.join(publicDir, file);
      if (!fs.existsSync(filePath)) {
        missing.push(file);
      }
    }

    if (missing.length > 0) {
      return { status: 'ERROR', details: `Missing files in public/: ${missing.join(', ')}` };
    }

    return { status: 'OK', details: `All required static files present: ${requiredFiles.join(', ')}` };
  }
};
