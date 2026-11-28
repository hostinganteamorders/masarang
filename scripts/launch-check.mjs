#!/usr/bin/env node
/**
 * Daftar periksa sebelum tayang: node scripts/launch-check.mjs
 * Membaca variabel lingkungan (isi dulu seperti di Vercel) dan memindai teks contoh yang belum diganti.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const problems = [];
const ok = [];

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
if (!/^https:\/\/[^/]+\.[^/]+/.test(url)) problems.push(`NEXT_PUBLIC_SITE_URL belum berupa alamat https (sekarang: "${url || "kosong"}"). Isi mis. https://masarangfoundation.org`);
else ok.push(`NEXT_PUBLIC_SITE_URL = ${url}`);

if (process.env.NEXT_PUBLIC_SITE_DRAFT !== "false") problems.push("NEXT_PUBLIC_SITE_DRAFT bukan \"false\": situs masih mode draf (noindex, robots melarang semua).");
else ok.push("Mode draf mati (NEXT_PUBLIC_SITE_DRAFT=false)");

for (const [name, label] of [["GOOGLE_SITE_VERIFICATION", "Google Search Console"], ["BING_SITE_VERIFICATION", "Bing Webmaster"]]) {
  if (!process.env[name]) problems.push(`${name} kosong (opsional bila Anda memverifikasi lewat DNS): ${label}`);
}

// Teks contoh di kode: ph: true dan [teks dalam kurung siku] pada konten.
const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f)) files.push(p);
  }
})("src/data");
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f)) files.push(p);
  }
})("src/content");

const placeholders = [];
for (const file of files) {
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    if (/\bph: true\b/.test(line) || /"[^"]*\[[^\]\n"]{3,}\][^"]*"/.test(line) && !/mail\.ts$/.test(file)) placeholders.push(`${file}:${i + 1}  ${line.trim().slice(0, 110)}`);
  });
}
const perFile = {};
for (const line of placeholders) perFile[line.split(":")[0]] = (perFile[line.split(":")[0]] ?? 0) + 1;
if (placeholders.length) {
  const summary = Object.entries(perFile).map(([f, n]) => `${f}: ${n}`).join("\n    ");
  problems.push(
    `${placeholders.length} teks/angka contoh di kode (bisa sudah diganti lewat Admin; bagian yang disembunyikan seperti Tim dan Transparansi ikut terhitung):\n    ` +
      (process.argv.includes("--all") ? placeholders.join("\n    ") : summary + "\n    (tambahkan --all untuk melihat tiap baris)"),
  );
}
else ok.push("Tidak ada teks contoh tersisa");

console.log("\nSudah beres:\n  " + (ok.join("\n  ") || "-"));
console.log("\nPerlu perhatian:\n  " + (problems.join("\n  ") || "-") + "\n");
process.exit(problems.some((p) => !p.startsWith("GOOGLE") && !p.startsWith("BING")) ? 1 : 0);
