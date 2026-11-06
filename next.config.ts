import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Situs ini dirender statis per bahasa (/en dan /id), jadi tidak memakai Cache Components.
  poweredByHeader: false,
  reactStrictMode: true,
  // Foto dioptimalkan ke AVIF (lebih kecil) dengan WebP sebagai cadangan.
  images: { formats: ["image/avif", "image/webp"] },
  // Alamat lama (sebelum struktur situs disusun ulang) dialihkan ke alamat baru.
  async redirects() {
    const moved: [string, string][] = [
      ["/team", "/about/team"],
      ["/programs/temboan", "/programs/restoration"],
      ["/programs/tasikoki", "/programs/conservation"],
      ["/adopt", "/programs/conservation/adopt"],
    ];
    return moved.map(([from, to]) => ({
      source: `/:locale(en|id)${from}`,
      destination: `/:locale${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
