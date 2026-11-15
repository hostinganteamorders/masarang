import { requireUser } from "@/cms/auth";
import { getDraft } from "@/cms/content";
import { library, slotList } from "@/cms/photo-slots";
import { GalleryEditor } from "./GalleryEditor";
import { LibraryProvider } from "./PhotoTools";
import { PhotoSlot } from "./PhotoSlot";

export const metadata = { title: "Foto" };
export const dynamic = "force-dynamic";

export default async function PhotosPage() {
  await requireUser();
  const draft = await getDraft();
  const { singles, galleries } = slotList();
  const lib = library();
  return (
    <LibraryProvider items={lib}>
      <h1>Foto</h1>
      <p className="muted">
        Ganti foto di setiap tempat. Foto dikecilkan otomatis di browser (sisi terpanjang 2000 piksel) sebelum diunggah, jadi
        foto langsung dari kamera boleh dipakai. Isi keterangan foto dalam dua bahasa: dibaca pembaca layar dan tampil di
        pop-up foto. Foto baru baru tayang setelah <strong>Terbitkan</strong>.
      </p>
      <h2>Foto di halaman</h2>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))" }}>
        {singles.map((s) => (
          <PhotoSlot
            key={s.path}
            path={s.path}
            label={s.label}
            where={s.where}
            original={s.original}
            current={draft.photos[s.path] ?? s.original}
            overridden={s.path in draft.photos}
          />
        ))}
      </div>
      <h2>Galeri</h2>
      {galleries.map((g) => (
        <GalleryEditor
          key={g.path}
          path={g.path}
          label={g.label}
          where={g.where}
          original={g.original}
          current={(draft.lists[`photos.${g.path}`] as typeof g.original | undefined) ?? g.original}
          overridden={`photos.${g.path}` in draft.lists}
        />
      ))}
    </LibraryProvider>
  );
}
