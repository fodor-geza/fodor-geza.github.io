/* ============================================================
   HELYI FEJLESZTŐI SZERVER (csak a saját gépeden futtatod)
   ------------------------------------------------------------
   Indítás a projekt mappájában:   npm start
   Utána a böngészőben:            http://localhost:5500

   Mit csinál?
   - Kiszolgálja a mappa fájljait, mintha egy igazi weboldal lenne
     (így a fetch is működik, ami a JSON-szótárakhoz kell).
   - Automatikus frissítés: ha elmentesz egy fájlt (HTML, CSS, JS,
     JSON), a böngészőben nyitott oldal magától újratöltődik.
   - Leállítás: a terminálban Ctrl+C.

   Nincs szüksége külső csomagra, csak a Node.js-re.
   A GitHub Pages ezt a fájlt nem használja.
   ============================================================ */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');                 // a projekt gyökere
const PORT = Number(process.env.PORT) || 5500;

// A böngésző a Content-Type alapján tudja, milyen fájlt kap.
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

// Ezt a kis szkriptet minden HTML-oldal végére beillesztjük: figyeli a szervert,
// és újratölti az oldalt, ha valamelyik fájl megváltozott.
const RELOAD_SNIPPET = `
<script>
  new EventSource('/__reload').onmessage = function () { location.reload(); };
</script>`;

// A nyitott böngészőfülek (Server-Sent Events kapcsolatok).
const clients = new Set();

const server = http.createServer(function (req, res) {
  const url = decodeURIComponent(req.url.split('?')[0]);

  // Automatikus frissítés csatornája
  if (url === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('\n');
    clients.add(res);
    req.on('close', function () { clients.delete(res); });
    return;
  }

  // A kért fájl útvonala; a mappa címe az index.html-t jelenti.
  let filePath = path.join(ROOT, url.endsWith('/') ? url + 'index.html' : url);
  if (!filePath.startsWith(ROOT)) {                         // ne lehessen a mappán kívülre lépni
    res.writeHead(403); res.end('Tiltott'); return;
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Nem található: ' + url);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' };
    if (ext === '.html') {
      res.writeHead(200, headers);
      res.end(data.toString('utf8').replace('</body>', RELOAD_SNIPPET + '\n</body>'));
    } else {
      res.writeHead(200, headers);
      res.end(data);
    }
  });
});

// Fájlfigyelés: mentéskor értesítjük a nyitott oldalakat (a .git és a tools mappát kihagyjuk).
let reloadTimer = null;
fs.watch(ROOT, { recursive: true }, function (event, file) {
  if (!file || file.startsWith('.git') || file.startsWith('tools')) return;
  clearTimeout(reloadTimer);                                  // egy mentés több eseményt is kiválthat
  reloadTimer = setTimeout(function () {
    console.log('Változott: ' + file + ' – oldal frissítése');
    clients.forEach(function (client) { client.write('data: reload\n\n'); });
  }, 100);
});

server.listen(PORT, function () {
  console.log('');
  console.log('  Helyi szerver fut:  http://localhost:' + PORT);
  console.log('  Mentéskor az oldal automatikusan frissül.');
  console.log('  Leállítás: Ctrl+C');
  console.log('');
});

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    console.error('A ' + PORT + '-es port foglalt. Indítsd másik porton, pl.:  set PORT=5501 && npm start');
  } else {
    console.error(err);
  }
  process.exit(1);
});
