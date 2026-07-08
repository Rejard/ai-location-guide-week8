const fs = require('fs');
const path = require('path');

module.exports = {
  id: 'kakao-map-config',
  name: 'Kakao Map SDK Configuration Check',
  layer: 'FUNCTION',
  linkedTask: 'kakao-map-integration',

  async run(ctx) {
    const indexPath = path.resolve(__dirname, '../../public/index.html');

    if (!fs.existsSync(indexPath)) {
      return { status: 'ERROR', details: 'public/index.html not found' };
    }

    const content = fs.readFileSync(indexPath, 'utf-8');
    const issues = [];

    if (!content.includes('dapi.kakao.com/v2/maps/sdk.js')) {
      issues.push('Kakao Maps SDK script tag not found');
    }

    if (content.includes('YOUR_KAKAO_JAVASCRIPT_KEY')) {
      issues.push('API key placeholder not replaced (YOUR_KAKAO_JAVASCRIPT_KEY)');
    }

    if (!content.includes('autoload=false')) {
      issues.push('autoload=false missing — SDK may fail on async load');
    }

    if (!content.includes('kakao.maps.load')) {
      issues.push('kakao.maps.load() callback not found — map init may fail');
    }

    if (issues.length > 0) {
      return { status: 'ERROR', details: issues.join('; ') };
    }

    return { status: 'OK', details: 'Kakao Map SDK properly configured with autoload=false and kakao.maps.load()' };
  }
};
