import { moneyOut } from "@/data/finance";

/**
 * Pita rupiah: lima segmen selebar porsi belanja (34/28/12/8/18) dengan warna program.
 * Dipakai sebagai tanda pengenal di atas setiap halaman dan di kaki situs.
 */
export function Ribbon({ height = 6 }: { height?: number }) {
  return (
    <div style={{ display: "flex", height }} aria-hidden="true">
      {moneyOut.map((item) => (
        <span key={item.id} style={{ flex: `${item.share} 0 0`, background: item.color }} />
      ))}
    </div>
  );
}
