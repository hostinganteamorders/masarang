import { Fragment } from "react";

/** Teks dengan **huruf tebal** di antara tanda bintang ganda. Hanya untuk teks dari berkas konten sendiri. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}
