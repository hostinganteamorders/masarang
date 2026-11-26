import { adoptCopy } from "@/content/adopt";
import { finance, moneyIn, moneyOut, overheadShare } from "@/data/finance";
import { keyFigures, tasikoki } from "@/data/programs";
import { site } from "@/data/site";
import { catOrder, wildCats, wildFlows, wildSpecies, wildTotals, wildlifeAsOf } from "@/data/wildlife";
import type { Locale } from "@/lib/i18n";
import { buildXlsx, type Cell, type Sheet } from "@/lib/xlsx";

const T = {
  en: {
    status: "Status",
    example: "Example figure",
    confirmed: "Confirmed",
    indicator: "Indicator",
    value: "Value",
    unit: "Unit",
    summary: "Summary",
    animals: "Animals today",
    perYear: "Animals per year",
    species: "Species",
    money: "Finance",
    notes: "Notes",
    category: "Category",
    inCare: "In rehabilitation now",
    quarantine: "In quarantine",
    entered: "Arrived since 2018",
    born: "Born here since 2018",
    died: "Died since 2018",
    released: "Released since 2018",
    translocated: "Moved to other centres since 2018",
    year: "Year",
    yEntered: "Arrived",
    yReleased: "Released",
    yTranslocated: "Moved",
    yYearEnd: "At year end",
    yRehab: "In rehabilitation (yearly average)",
    sName: "Species",
    sLatin: "Scientific name",
    sCount: "In care",
    mType: "Type",
    mIn: "Source of funds",
    mOut: "Use of funds",
    mItem: "Item",
    mShare: "Share (%)",
    mMillions: "Amount (million rupiah)",
    ha: "ha",
    people: "people",
    percent: "%",
    count: "count",
    trees: "trees",
    fig: {
      conservationHa: "Temboan conservation area",
      restoredTemboanHa: "Restored at Temboan in the last 4 years",
      restoredOtherHa: "Restored at Kayuwatu and Mahembang (at least)",
      farmers: "Farmers empowered",
      incomeIncreasePct: "Increase in farmer income",
      treesPlanted: "Trees planted",
      survival: "Tree survival",
      students: "Students reached (education)",
      overhead: "Share of spending on overhead",
    },
    notesRows: [
      ["Organisation", "Yayasan Masarang, Tomohon, North Sulawesi"],
      ["Data on animals", "Tasikoki recap spreadsheet (Rekapitulasi Satwa PPST 2018)"],
      ["Animals as of", ""],
      ["Site updated", ""],
      ["Averages", "The yearly rehabilitation figure is the average of the monthly counts. For the current year it covers the months so far."],
      ["Examples", "Rows marked \"Example figure\" are placeholders until the team confirms them."],
    ],
  },
  id: {
    status: "Status",
    example: "Angka contoh",
    confirmed: "Terkonfirmasi",
    indicator: "Indikator",
    value: "Nilai",
    unit: "Satuan",
    summary: "Ringkasan",
    animals: "Satwa hari ini",
    perYear: "Satwa per tahun",
    species: "Jenis satwa",
    money: "Keuangan",
    notes: "Catatan",
    category: "Kategori",
    inCare: "Sedang direhabilitasi",
    quarantine: "Sedang karantina",
    entered: "Masuk sejak 2018",
    born: "Lahir di sini sejak 2018",
    died: "Mati sejak 2018",
    released: "Dilepasliarkan sejak 2018",
    translocated: "Dipindahkan ke pusat lain sejak 2018",
    year: "Tahun",
    yEntered: "Masuk",
    yReleased: "Dilepasliarkan",
    yTranslocated: "Dipindahkan",
    yYearEnd: "Akhir tahun",
    yRehab: "Direhabilitasi (rata-rata setahun)",
    sName: "Jenis",
    sLatin: "Nama ilmiah",
    sCount: "Dirawat",
    mType: "Jenis",
    mIn: "Sumber dana",
    mOut: "Penggunaan dana",
    mItem: "Pos",
    mShare: "Porsi (%)",
    mMillions: "Jumlah (juta rupiah)",
    ha: "ha",
    people: "orang",
    percent: "%",
    count: "jumlah",
    trees: "pohon",
    fig: {
      conservationHa: "Kawasan konservasi Temboan",
      restoredTemboanHa: "Dipulihkan di Temboan dalam 4 tahun terakhir",
      restoredOtherHa: "Dipulihkan di Kayuwatu dan Mahembang (minimal)",
      farmers: "Petani yang diberdayakan",
      incomeIncreasePct: "Kenaikan pendapatan petani",
      treesPlanted: "Pohon ditanam",
      survival: "Pohon bertahan hidup",
      students: "Pelajar yang dijangkau (edukasi)",
      overhead: "Porsi belanja untuk operasional",
    },
    notesRows: [
      ["Lembaga", "Yayasan Masarang, Tomohon, Sulawesi Utara"],
      ["Data satwa", "Berkas rekapitulasi Tasikoki (Rekapitulasi Satwa PPST 2018)"],
      ["Data satwa per", ""],
      ["Situs diperbarui", ""],
      ["Rata-rata", "Angka rehabilitasi tahunan adalah rata-rata hitungan bulanan. Untuk tahun berjalan, dihitung dari bulan yang sudah berjalan."],
      ["Contoh", "Baris bertanda \"Angka contoh\" masih berupa isian sementara sampai dikonfirmasi tim."],
    ],
  },
} as const;

/** Semua angka dampak yang tampil di situs, dalam satu berkas Excel. */
export function impactWorkbook(locale: Locale): Buffer {
  const t = T[locale];
  const a = adoptCopy[locale];
  const st = (ph?: boolean) => (ph ? t.example : t.confirmed);
  const num = (f: { v: number | string }) => (typeof f.v === "number" ? f.v : null);

  const summary: Sheet = {
    name: t.summary,
    widths: [52, 14, 10, 16],
    rows: [
      [t.indicator, t.value, t.unit, t.status],
      [t.fig.conservationHa, num(keyFigures.conservationHa), t.ha, st(keyFigures.conservationHa.ph)],
      [t.fig.restoredTemboanHa, num(keyFigures.restoredTemboanHa), t.ha, st(keyFigures.restoredTemboanHa.ph)],
      [t.fig.restoredOtherHa, num(keyFigures.restoredOtherHa), t.ha, st(keyFigures.restoredOtherHa.ph)],
      [t.fig.farmers, num(keyFigures.farmers), t.people, st(keyFigures.farmers.ph)],
      [t.fig.incomeIncreasePct, num(keyFigures.incomeIncreasePct), t.percent, st(keyFigures.incomeIncreasePct.ph)],
      [t.fig.treesPlanted, num(keyFigures.treesPlanted), t.trees, st(keyFigures.treesPlanted.ph)],
      [t.fig.survival, num(keyFigures.survival), t.percent, st(keyFigures.survival.ph)],
      [t.fig.students, num(tasikoki.students), t.people, st(tasikoki.students.ph)],
      [t.fig.overhead, overheadShare.v, t.percent, st(overheadShare.ph)],
      [t.inCare, wildTotals.inCare, t.count, t.confirmed],
      [t.quarantine, wildTotals.quarantine, t.count, st(wildTotals.quarantinePh)],
      [t.released, wildTotals.released, t.count, t.confirmed],
      [t.entered, wildTotals.entered, t.count, t.confirmed],
    ],
  };

  const animals: Sheet = {
    name: t.animals,
    widths: [20, 22, 18, 20, 20, 22, 24, 34],
    rows: [
      [t.category, t.inCare, t.quarantine, t.entered, t.born, t.died, t.released, t.translocated],
      ...catOrder.map((c) => {
        const r = wildCats.find((x) => x.cat === c);
        return r ? [a.cats[c].name, r.inCare, r.quarantine, r.entered, r.born, r.died, r.released, r.translocated] : [a.cats[c].name];
      }),
    ],
  };

  const perYear: Sheet = {
    name: t.perYear,
    widths: [10, 18, 12, 16, 14, 14, 32],
    rows: [
      [t.year, t.category, t.yEntered, t.yReleased, t.yTranslocated, t.yYearEnd, t.yRehab],
      ...[...wildFlows]
        .sort((x, y) => x.year - y.year || catOrder.indexOf(x.cat) - catOrder.indexOf(y.cat))
        .map((r) => [r.year, a.cats[r.cat].name, r.entered, r.released, r.translocated, r.yearEnd, Math.round(r.rehab * 10) / 10]),
    ],
  };

  const species: Sheet = {
    name: t.species,
    widths: [34, 34, 18, 10],
    rows: [
      [t.sName, t.sLatin, t.category, t.sCount],
      ...wildSpecies.map((s) => [s.name, s.latin, a.cats[s.category].name, s.count]),
    ],
  };

  const money: Sheet = {
    name: t.money,
    widths: [20, 40, 12, 24, 16],
    rows: [
      [t.mType, t.mItem, t.mShare, t.mMillions, t.status],
      ...moneyIn.map((f) => [t.mIn, f.label[locale], f.share, f.millions, st(finance.ph)]),
      ...moneyOut.map((f) => [t.mOut, f.label[locale], f.share, f.millions, st(finance.ph)]),
    ],
  };

  const notes: Sheet = {
    name: t.notes,
    widths: [24, 100],
    rows: [
      [t.notes, ""],
      ...t.notesRows.map(([k, v]): Cell[] => [k, k === t.notesRows[2][0] ? wildlifeAsOf : k === t.notesRows[3][0] ? site.lastUpdated : v]),
    ],
  };

  return buildXlsx([summary, animals, perYear, species, money, notes]);
}
