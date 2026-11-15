// Dijalankan otomatis sebelum `next build` (prebuild). Mengambil isi yang DITERBITKAN di admin dari Redis dan
// menulisnya ke src/cms/overrides.json, sehingga build membawa perubahan staf. Tanpa Redis (komputer sendiri),
// berkas yang ada dibiarkan.
import { mkdir, writeFile } from "node:fs/promises";

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const target = new URL("../src/cms/overrides.json", import.meta.url);

if (!url || !token) {
  console.log("[cms] Redis tidak diatur: memakai src/cms/overrides.json apa adanya.");
  process.exit(0);
}

try {
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["GET", "cms:published"]),
  });
  const body = await res.json();
  if (!res.ok || body.error) throw new Error(body.error ?? `HTTP ${res.status}`);
  const data = body.result ? JSON.parse(body.result) : {};
  const out = { text: {}, values: {}, photos: {}, lists: {}, ...data };
  await mkdir(new URL("./", target), { recursive: true });
  await writeFile(target, JSON.stringify(out, null, 2) + "\n");
  const n = Object.values(out).reduce((a, o) => a + Object.keys(o).length, 0);
  console.log(`[cms] ${n} perubahan dari admin dimuat ke overrides.json.`);
} catch (e) {
  // Gagal membangun lebih baik daripada menerbitkan situs tanpa perubahan staf.
  console.error(`[cms] Gagal mengambil isi admin: ${e.message}`);
  process.exit(1);
}
