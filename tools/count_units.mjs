// iNewProject . daily open-unit counts for the New Launches cards (20 Nov 2026). Run by .github/workflows/eenquiry-counts.yml.
// Reads the map page's project list once, then each e-Enquiry project's page once (about 25 pages a day), and counts open
// units the same way the listing tag does (conv: every {"unitNo"...} object, status "green"). Writes eenquiry-counts.json:
// {"t": "<ISO time>", "counts": {"<slug>": n}}. Safety: if the list cannot be read, or fewer than half the e-Enquiry projects
// can be counted, it exits with an error and the previous file stays as it is.
import { writeFileSync } from 'node:fs';
const SITE = 'https://www.inewproject.com', UA = { 'User-Agent': 'Mozilla/5.0 (compatible; iNewProject-counts/1.0)', 'Accept-Encoding': 'gzip' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(path) { for (let i = 0; i < 3; i++) { try { const r = await fetch(SITE + path, { headers: UA }); if (r.ok) return await r.text(); } catch (e) {} await sleep(3000); } return null; }
function projects(h) {
  const i = h.indexOf('window.__PROJECTS__'); if (i < 0) return null; const j = h.indexOf('[', i); let d = 0, q = '', k = j;
  for (; k < h.length; k++) { const c = h[k]; if (q) { if (c === '\\') k++; else if (c === q) q = ''; } else if (c === '"' || c === "'") q = c; else if (c === '[') d++; else if (c === ']' && !--d) break; }
  return JSON.parse(h.slice(j, k + 1));
}
const map = await get('/map/'); const list = map && projects(map);
if (!list || !list.length) { console.error('no project list'); process.exit(1); }
const ee = list.filter(p => p.enquiry_type === 'e-Enquiry').map(p => (/\/project\/([^/?#]+)\//.exec(p.url) || [])[1]).filter(Boolean);
const counts = {};
for (const slug of ee) {
  const h = await get('/project/' + slug + '/e-enquiry/'); await sleep(1500);
  if (!h) continue; let n = 0, tot = 0;
  for (const m of h.matchAll(/\{"unitNo"[^{}]*\}/g)) { let u; try { u = JSON.parse(m[0]); } catch (e) { continue; } tot++; if (u.status === 'green') n++; }
  if (tot && Number.isInteger(n) && n >= 0 && n <= 5000) counts[slug] = n;
}
const got = Object.keys(counts).length;
console.log(`e-Enquiry projects ${ee.length}, counted ${got}`, JSON.stringify(counts));
if (got < Math.ceil(ee.length / 2)) { console.error('too few counted, keeping the previous file'); process.exit(1); }
writeFileSync(process.argv[2] || 'eenquiry-counts.json', JSON.stringify({ t: new Date().toISOString(), counts }) + '\n');
