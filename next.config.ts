import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Situs ini dirender statis per bahasa (/en dan /id), jadi tidak memakai Cache Components.
  poweredByHeader: false,
  reactStrictMode: true,
  // Foto dioptimalkan ke AVIF (lebih kecil) dengan WebP sebagai cadangan.
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
