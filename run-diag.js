const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '.vibe-diagnosis', 'diagnostics');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.diag.js'));

(async () => {
  const results = [];

  for (const f of files) {
    const mod = require(path.join(dir, f));
    try {
      const r = await mod.run({});
      results.push({ id: mod.id, name: mod.name, layer: mod.layer, ...r });
    } catch (e) {
      results.push({ id: mod.id, name: mod.name, status: 'ERROR', details: e.message });
    }
  }

  const ok = results.filter(r => r.status === 'OK').length;
  const warn = results.filter(r => r.status === 'WARNING').length;
  const err = results.filter(r => r.status === 'ERROR').length;
  const total = results.length;
  const health = Math.round((ok / total) * 100);

  console.log('=== Vibe Diagnosis Results ===');
  console.log('Health: ' + health + '% (' + ok + ' OK / ' + warn + ' WARN / ' + err + ' ERR)');
  console.log('');

  for (const r of results) {
    const icon = r.status === 'OK' ? 'OK' : r.status === 'WARNING' ? 'WARN' : 'ERR';
    console.log('[' + icon + '] ' + r.name + ' (' + r.layer + ')');
    console.log('     ' + r.details);
  }
})();
