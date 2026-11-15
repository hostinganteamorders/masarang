import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Situs ini dirender statis per bahasa (/en dan /id), jadi tidak memakai Cache Components.
  poweredByHeader: false,
  reactStrictMode: true,
  // Foto dioptimalkan ke AVIF (lebih kecil) dengan WebP sebagai cadangan.
  images: {
    formats: ["image/avif", "image/webp"],
    // Foto yang diunggah lewat admin disimpan di Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  // Unggahan foto dari admin dikecilkan di browser (di bawah 2 MB), tetapi beri ruang untuk PDF laporan.
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "same-origin" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
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
