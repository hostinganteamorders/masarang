import type { NextConfig } from "next";
import { oldPaths } from "./src/data/redirects";

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
  // Alamat lama dialihkan permanen ke alamat baru (daftarnya di src/data/redirects.ts), dan www dialihkan ke alamat utama.
  async redirects() {
    const rules: Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>> = [];

    // Satu alamat utama saja: www.contoh.org -> contoh.org (bila NEXT_PUBLIC_SITE_URL berupa https tanpa www).
    try {
      const { protocol, hostname } = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "");
      if (protocol === "https:" && !hostname.startsWith("www.") && hostname.includes(".")) {
        rules.push({
          source: "/:path*",
          has: [{ type: "host", value: `www.${hostname}` }],
          destination: `https://${hostname}/:path*`,
          permanent: true,
        });
      }
    } catch {
      /* NEXT_PUBLIC_SITE_URL belum diisi: lewati */
    }

    for (const [from, to] of oldPaths) {
      // Alamat dengan awalan bahasa (/en/team) dan tanpa awalan (/about-us).
      rules.push({ source: `/:locale(en|id)${from}`, destination: `/:locale${to === "/" ? "" : to}`, permanent: true });
      if (from !== "/") rules.push({ source: from, destination: to, permanent: true });
    }
    return rules;
  },
};

export default nextConfig;
