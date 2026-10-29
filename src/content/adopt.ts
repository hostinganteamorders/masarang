import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Adopt an animal",
    description:
      "Meet every animal in our care at Tasikoki, see how far each one is from going home, and sponsor one.",
  },
  hero: {
    title: "Every animal in our care, and how far each one is from going home",
    lede: "Hollow dots are animals still waiting for a sponsor. Tap any dot to meet the animal, see where it is in its rehabilitation, and what its care costs each month.",
    source: "Source: Tasikoki animal register (example data)",
    unit: "One dot = one animal",
  },
  explorer: {
    filterLabel: "Filter the register",
    groups: {
      primates: "Primates",
      mammals: "Other mammals",
      birds: "Birds",
      reptiles: "Reptiles",
    },
    waiting: "Waiting for a sponsor",
    counts: { inCare: "{n} in care", sponsored: "{n} sponsored", waiting: "{n} waiting" },
    legend: {
      sponsored: "Sponsored",
      waiting: "Waiting for a sponsor",
      colour: "Colour shows the animal group",
    },
    stages: {
      quarantine: { name: "Quarantine", note: "Health checks, 30–90 days" },
      rehab: { name: "Rehabilitation", note: "Relearning to forage, climb and fly" },
      prerelease: { name: "Pre-release", note: "Final checks and release permit" },
      lifetime: { name: "Lifetime care", note: "Cannot survive in the wild" },
      released: { name: "Released in 2025", note: "Back in the wild" },
    },
    registerLabel: "Animal register by stage",
    dotLabel: "{name}, {species}, {stage}, {sponsor}",
    sponsoredWord: "sponsored",
    waitingWord: "waiting for a sponsor",
    releasedWord: "released",
  },
  detail: {
    register: "Register no.",
    now: "Now",
    since: "In our care since",
    arrived: "Arrived",
    care: "Full care per month",
    sponsored: "Sponsored",
    waiting: "Waiting for a sponsor",
    released: "Released",
    releasedOn: "Released in {date}",
    adopt: "Adopt {name}",
    price: "From {amount} a month, or cover the full cost.",
    lifetime: "Cannot be released. Stays in lifetime care at Tasikoki.",
    track: "Journey home",
    close: "Close",
    mailSubject: "Adopt {name} ({id})",
    mailBody:
      "Hello, I would like to sponsor {name}, register number {id}. Please tell me how to proceed.",
    arrival: {
      seized: "Seized from illegal trade",
      surrendered: "Handed over by an owner",
      rescued: "Rescued, injured",
    },
    iucn: {
      CR: "Critically Endangered",
      EN: "Endangered",
      VU: "Vulnerable",
      LC: "Least Concern",
    },
  },
  table: {
    title: "By species",
    species: "Species",
    iucn: "IUCN",
    inCare: "In care",
    sponsored: "Sponsored",
    care: "Care per animal, per month",
    total: "Total",
  },
  how: {
    title: "How sponsoring works",
    steps: [
      {
        title: "Choose an animal",
        body: "Open the register above and pick the animal you want to support. Hollow dots are waiting for a sponsor.",
      },
      {
        title: "Send your gift",
        body: "Give by bank transfer. Start from {amount} a month, or cover the full monthly cost. Write the animal's register number in the transfer note.",
      },
      {
        title: "We report back",
        body: "Tell us which animal your gift is for and we will report on its care to you directly.",
      },
    ],
    cta: "Bank details",
  },
};

const id: typeof en = {
  meta: {
    title: "Adopsi satwa",
    description:
      "Kenali setiap satwa yang kami rawat di Tasikoki, lihat seberapa dekat masing-masing untuk pulang ke alam, dan sponsori satu di antaranya.",
  },
  hero: {
    title: "Setiap satwa dalam perawatan kami, dan seberapa dekat mereka untuk pulang",
    lede: "Titik kosong adalah satwa yang masih menunggu sponsor. Ketuk titik mana pun untuk mengenal satwanya, melihat tahap rehabilitasinya, dan berapa biaya perawatannya setiap bulan.",
    source: "Sumber: register satwa Tasikoki (data contoh)",
    unit: "Satu titik = satu satwa",
  },
  explorer: {
    filterLabel: "Saring register",
    groups: {
      primates: "Primata",
      mammals: "Mamalia lain",
      birds: "Burung",
      reptiles: "Reptil",
    },
    waiting: "Menunggu sponsor",
    counts: { inCare: "{n} dirawat", sponsored: "{n} disponsori", waiting: "{n} menunggu" },
    legend: {
      sponsored: "Disponsori",
      waiting: "Menunggu sponsor",
      colour: "Warna menunjukkan kelompok satwa",
    },
    stages: {
      quarantine: { name: "Karantina", note: "Pemeriksaan kesehatan, 30–90 hari" },
      rehab: { name: "Rehabilitasi", note: "Belajar lagi mencari makan, memanjat, terbang" },
      prerelease: { name: "Pra-lepas liar", note: "Pemeriksaan akhir dan izin lepas liar" },
      lifetime: { name: "Perawatan seumur hidup", note: "Tidak dapat bertahan hidup di alam" },
      released: { name: "Dilepasliarkan 2025", note: "Kembali ke alam" },
    },
    registerLabel: "Register satwa menurut tahap",
    dotLabel: "{name}, {species}, {stage}, {sponsor}",
    sponsoredWord: "disponsori",
    waitingWord: "menunggu sponsor",
    releasedWord: "dilepasliarkan",
  },
  detail: {
    register: "No. register",
    now: "Tahap sekarang",
    since: "Dirawat sejak",
    arrived: "Kedatangan",
    care: "Biaya perawatan penuh per bulan",
    sponsored: "Disponsori",
    waiting: "Menunggu sponsor",
    released: "Dilepasliarkan",
    releasedOn: "Dilepasliarkan pada {date}",
    adopt: "Adopsi {name}",
    price: "Mulai {amount} per bulan, atau tanggung biaya penuh.",
    lifetime: "Tidak dapat dilepasliarkan. Tetap dalam perawatan seumur hidup di Tasikoki.",
    track: "Perjalanan pulang",
    close: "Tutup",
    mailSubject: "Adopsi {name} ({id})",
    mailBody:
      "Halo, saya ingin menjadi sponsor {name}, nomor register {id}. Mohon beri tahu langkah selanjutnya.",
    arrival: {
      seized: "Sitaan perdagangan ilegal",
      surrendered: "Diserahkan pemilik",
      rescued: "Diselamatkan dalam keadaan terluka",
    },
    iucn: {
      CR: "Kritis",
      EN: "Genting",
      VU: "Rentan",
      LC: "Risiko rendah",
    },
  },
  table: {
    title: "Per spesies",
    species: "Spesies",
    iucn: "IUCN",
    inCare: "Dirawat",
    sponsored: "Disponsori",
    care: "Biaya per satwa per bulan",
    total: "Total",
  },
  how: {
    title: "Cara kerja sponsor",
    steps: [
      {
        title: "Pilih satwa",
        body: "Buka register di atas dan pilih satwa yang ingin Anda dukung. Titik kosong menunggu sponsor.",
      },
      {
        title: "Kirim donasi",
        body: "Beri lewat transfer bank. Mulai {amount} per bulan, atau tanggung biaya penuh bulanannya. Tulis nomor register satwa pada catatan transfer.",
      },
      {
        title: "Kami melapor",
        body: "Sampaikan satwa pilihan Anda, dan kami akan melaporkan perawatannya langsung kepada Anda.",
      },
    ],
    cta: "Rincian rekening",
  },
};

export const adoptCopy: Record<Locale, typeof en> = { en, id };
export type AdoptCopy = typeof en;
