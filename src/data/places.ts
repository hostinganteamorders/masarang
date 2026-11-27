/**
 * Letak kasar tiap lokasi untuk peta di halaman Lokasi Kami. Ini perkiraan wilayah, bukan titik tepat
 * (peta memang tidak boleh menunjukkan titik tepat sarang penyu atau lokasi pelepasliaran).
 * Perbaiki di sini bila ada koordinat resmi; kunci sama dengan `about.sites.profiles[].id`.
 */
export const places: Record<string, { lat: number; lon: number }> = {
  masarang: { lat: 1.345, lon: 124.865 },
  springs: { lat: 1.33, lon: 124.84 },
  temboan: { lat: 1.0434, lon: 124.9225 },
  pulisan: { lat: 1.72, lon: 125.13 },
  kayuwatu: { lat: 1.2, lon: 124.95 },
  boltim: { lat: 0.85, lon: 124.62 },
  tasikoki: { lat: 1.545, lon: 125.08 },
  tulap: { lat: 1.4, lon: 125.01 },
  salimburung: { lat: 1.66, lon: 125.02 },
  lahendong: { lat: 1.265, lon: 124.8 },
  titik: { lat: 1.31, lon: 124.8 },
};
