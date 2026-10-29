import type { ReactNode } from "react";
import { site } from "@/data/site";

/**
 * Penanda angka/teks contoh. Beri `on` (mis. `<Ph on={fakta.ph}>`) agar bergaris bawah titik-titik selama `site.draft` bernilai true.
 * Hilangkan penanda dengan mengisi data asli lalu mengubah `ph` menjadi false (atau draft menjadi false).
 */
export function Ph({ on = false, children }: { on?: boolean; children: ReactNode }) {
  if (!on || !site.draft) return <>{children}</>;
  return (
    <span className="ph" title="Placeholder / Contoh">
      {children}
    </span>
  );
}
