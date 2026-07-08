const http = require('http');

module.exports = {
  id: 'server-health',
  name: 'Express Server Health Check',
  layer: 'SYSTEM',
  linkedTask: 'server-startup',

  async run(ctx) {
    const port = process.env.PORT || 3066;

    return new Promise((resolve) => {
      const req = http.get(`http://localhost:${port}/`, (res) => {
        if (res.statusCode === 200) {
          resolve({ status: 'OK', details: `Server responding on port ${port} (HTTP ${res.statusCode})` });
        } else {
          resolve({ status: 'WARNING', details: `Server returned HTTP ${res.statusCode}` });
        }
      });

      req.on('error', () => {
        resolve({ status: 'ERROR', details: `Server not responding on port ${port}. Run: node server.js` });
      });

      req.setTimeout(3000, () => {
        req.destroy();
        resolve({ status: 'ERROR', details: `Server timeout on port ${port}` });
      });
    });
  }
};
