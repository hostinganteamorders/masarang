import Image from "next/image";

/**
 * Logo Masarang Foundation (lambang + tulisan). Berkas `-light` untuk latar gelap;
 * versi hijau asli untuk latar terang. Tinggi diatur lewat CSS (`className`), lebar mengikuti.
 */
export function Logo({
  tone = "on-dark",
  className,
  preload,
}: {
  tone?: "on-dark" | "on-light";
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={tone === "on-dark" ? "/brand/masarang-logo-light.png" : "/brand/masarang-logo.png"}
      alt="Masarang Foundation"
      width={593}
      height={245}
      sizes="160px"
      preload={preload}
      className={className}
    />
  );
}
