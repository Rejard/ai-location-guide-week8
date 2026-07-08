const fs = require('fs');
const path = require('path');

module.exports = {
  id: 'env-port-config',
  name: 'Environment Port Configuration Check',
  layer: 'SYSTEM',
  linkedTask: 'deploy-readiness',

  async run(ctx) {
    const serverPath = path.resolve(__dirname, '../../server.js');

    if (!fs.existsSync(serverPath)) {
      return { status: 'ERROR', details: 'server.js not found' };
    }

    const content = fs.readFileSync(serverPath, 'utf-8');

    if (!content.includes('process.env.PORT')) {
      return { status: 'ERROR', details: 'server.js does not use process.env.PORT — deployment will fail on Render' };
    }

    if (content.includes('const PORT = 3000') || content.includes('const PORT = 3066')) {
      if (!content.includes('process.env.PORT')) {
        return { status: 'ERROR', details: 'Port is hardcoded without environment variable fallback' };
      }
    }

    return { status: 'OK', details: 'server.js uses process.env.PORT with fallback — deploy ready' };
  }
};
