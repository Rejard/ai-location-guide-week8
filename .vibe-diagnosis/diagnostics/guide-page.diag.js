const fs = require('fs');
const path = require('path');

module.exports = {
  id: 'guide-page',
  name: 'API Guide Page Integrity Check',
  layer: 'TASK',
  linkedTask: 'public-data-guide',

  async run(ctx) {
    const guidePath = path.resolve(__dirname, '../../public/guide.html');

    if (!fs.existsSync(guidePath)) {
      return { status: 'ERROR', details: 'public/guide.html not found' };
    }

    const content = fs.readFileSync(guidePath, 'utf-8');
    const checks = [];

    if (!content.includes('data.go.kr')) {
      checks.push('Missing link to data.go.kr');
    }

    if (!content.includes('<style>')) {
      checks.push('Inline CSS missing — guide.css may be required separately');
    }

    if (!content.includes('serviceKey')) {
      checks.push('Missing API test URL with serviceKey parameter');
    }

    if (checks.length > 0) {
      return { status: 'WARNING', details: checks.join('; ') };
    }

    return { status: 'OK', details: 'Guide page complete with inline CSS, data.go.kr link, and API test URL' };
  }
};
