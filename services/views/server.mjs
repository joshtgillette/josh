// Minimal page-view counter for joshgillette.build.
//
// Zero npm dependencies — uses Node's built-in node:sqlite (run with
// `node --experimental-sqlite server.mjs`). Persists per-path counts to a
// single SQLite file and is reverse-proxied at /api/views/* by the gateway.
//
//   POST /api/views/<key>   -> increment the counter for <key>, returns 204
//   GET  /api/views/<key>   -> { "key": "<key>", "views": N }
//   GET  /api/views         -> { "<key>": N, ... }  (private summary)
//
// <key> is the page path with surrounding slashes stripped, e.g. "me",
// "thoughts", "thoughts/hello-world", "projects/field-notes".

import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';

const HOST = process.env.VIEWS_HOST ?? '127.0.0.1';
const PORT = Number(process.env.VIEWS_PORT ?? 8788);
const DB_PATH = process.env.VIEWS_DB ?? 'views.db';
const PREFIX = '/api/views';
const KEY_RE = /^[a-z0-9][a-z0-9/_-]{0,199}$/i;

const db = new DatabaseSync(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS views (
    key   TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  );
`);

const incr = db.prepare(
  `INSERT INTO views (key, count) VALUES (?, 1)
   ON CONFLICT(key) DO UPDATE SET count = count + 1`
);
const getOne = db.prepare('SELECT count FROM views WHERE key = ?');
const getAll = db.prepare('SELECT key, count FROM views ORDER BY count DESC');

function json(res, status, body) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(JSON.stringify(body));
}

const server = createServer((req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;

  if (!path.startsWith(PREFIX)) {
    return json(res, 404, { error: 'not found' });
  }

  // Private summary of every counted path.
  if (path === PREFIX || path === `${PREFIX}/`) {
    if (req.method !== 'GET') return json(res, 405, { error: 'method not allowed' });
    const out = {};
    for (const row of getAll.all()) out[row.key] = row.count;
    return json(res, 200, out);
  }

  const key = decodeURIComponent(path.slice(PREFIX.length + 1)).replace(/\/+$/, '');
  if (!KEY_RE.test(key)) {
    return json(res, 400, { error: 'invalid key' });
  }

  if (req.method === 'POST') {
    incr.run(key);
    res.writeHead(204, { 'cache-control': 'no-store' });
    return res.end();
  }

  if (req.method === 'GET') {
    const row = getOne.get(key);
    return json(res, 200, { key, views: row ? row.count : 0 });
  }

  return json(res, 405, { error: 'method not allowed' });
});

server.listen(PORT, HOST, () => {
  console.log(`view counter listening on ${HOST}:${PORT} (db: ${DB_PATH})`);
});
