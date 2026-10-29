import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Transparency",
    description:
      "Where Yayasan Masarang's money comes from, where it goes, and the documents behind it.",
  },
  hero: {
    title: "Where the money comes from, and where it goes",
    lede: "Our accounts for FY {year} in one place. Overhead is shown as its own line, and every program budget already includes its share.",
  },
  currency: {
    label: "Show amounts in",
    idr: "Rupiah",
    usd: "US dollars",
    fxNote:
      "US dollar amounts use a fixed rate of Rp {fx} per US$1, so they stay comparable between periods.",
  },
  in: { title: "Money in", total: "Total income", barLabel: "Share of income by source" },
  out: { title: "Money out", total: "Total spending", barLabel: "Share of spending by program" },
  overhead: {
    title: "What overhead pays for",
    caption: "of total spending",
    body: "Overhead pays for the office, accounting, the audit and the administration that every program depends on. We show it on its own line so you can judge it.",
    cta: "How we handle money",
  },
  unit: {
    title: "What a gift pays for",
    lede: "Unit costs are full costs, overhead included.",
    approx: "about {usd}",
  },
  docs: {
    title: "Documents",
    lede: "Documents marked available on request are sent by email. Audited accounts will be posted here once they are signed.",
    columns: { document: "Document", type: "Type", year: "Year", access: "Access" },
    types: {
      legal: "Legal",
      report: "Report",
      finance: "Finance",
      procedure: "Procedure",
      method: "Method",
    },
    status: { request: "Available on request", preparing: "In preparation" },
    requestButton: "Request a copy",
    mailSubject: "Document request: {title}",
  },
  governance: {
    title: "Who is accountable",
    lede: "These bodies are responsible for how the foundation spends money and reports on its work.",
    cta: "Meet the team",
  },
  principles: { title: "How we handle money" },
};

const id: typeof en = {
  meta: {
    title: "Transparansi",
    description:
      "Dari mana dana Yayasan Masarang berasal, ke mana dana itu mengalir, dan dokumen di baliknya.",
  },
  hero: {
    title: "Dari mana dana berasal, dan ke mana dana mengalir",
    lede: "Laporan keuangan kami untuk TA {year} dalam satu halaman. Biaya operasional ditampilkan sebagai baris tersendiri, dan setiap anggaran program sudah memuat porsinya.",
  },
  currency: {
    label: "Tampilkan jumlah dalam",
    idr: "Rupiah",
    usd: "Dolar AS",
    fxNote:
      "Jumlah dalam dolar AS memakai kurs tetap Rp {fx} per US$1, agar tetap sebanding antarperiode.",
  },
  in: { title: "Dana masuk", total: "Total pendapatan", barLabel: "Porsi pendapatan menurut sumber" },
  out: { title: "Dana keluar", total: "Total belanja", barLabel: "Porsi belanja menurut program" },
  overhead: {
    title: "Untuk apa biaya operasional",
    caption: "dari total belanja",
    body: "Biaya operasional membayar kantor, pembukuan, audit, dan administrasi yang menopang setiap program. Kami tampilkan sebagai baris tersendiri agar Anda dapat menilainya.",
    cta: "Cara kami mengelola dana",
  },
  unit: {
    title: "Apa yang dibayar oleh sebuah donasi",
    lede: "Biaya satuan adalah biaya penuh, sudah termasuk biaya operasional.",
    approx: "sekitar {usd}",
  },
  docs: {
    title: "Dokumen",
    lede: "Dokumen yang tersedia atas permintaan dikirim lewat email. Laporan keuangan teraudit akan dipasang di sini setelah ditandatangani.",
    columns: { document: "Dokumen", type: "Jenis", year: "Tahun", access: "Akses" },
    types: {
      legal: "Hukum",
      report: "Laporan",
      finance: "Keuangan",
      procedure: "Prosedur",
      method: "Metode",
    },
    status: { request: "Tersedia atas permintaan", preparing: "Sedang disusun" },
    requestButton: "Minta salinan",
    mailSubject: "Permintaan dokumen: {title}",
  },
  governance: {
    title: "Siapa yang bertanggung jawab",
    lede: "Badan-badan ini bertanggung jawab atas cara yayasan membelanjakan dana dan melaporkan pekerjaannya.",
    cta: "Kenali tim",
  },
  principles: { title: "Cara kami mengelola dana" },
};

export const transparencyCopy: Record<Locale, typeof en> = { en, id };
