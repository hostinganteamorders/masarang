import type { L10n } from "@/lib/i18n";

/**
 * Katalog foto situs: satu entri per foto yang dipakai, dikelompokkan menurut folder di `public/photos/`.
 * Kunci entri (mis. "nursery-keeper-seedlings") dipakai di `src/data/photos.ts` untuk menempatkan foto.
 *
 * Setiap foto: `src` (alamat di bawah `public`), `w` dan `h` (piksel), `color` (rata-rata warna, jadi latar
 * selagi foto dimuat), `alt` (keterangan dua bahasa untuk pembaca layar dan lightbox), dan `focus`
 * (titik yang dipertahankan saat foto dipotong, format CSS object-position).
 *
 * Keterangan ditulis dari isi gambar; nama satwa dan lokasi perlu dicek oleh staf.
 */
export type CatalogPhoto = {
  src: string;
  w: number;
  h: number;
  color: string;
  alt: L10n;
  focus?: string;
};

export const catalog = {
  // ---- restoration/nursery
  "nursery-keeper-seedlings": { src: "/photos/restoration/nursery/nursery-keeper-seedlings_DSC07689.jpg", w: 2000, h: 1333, color: "#6f7353", alt: { en: "A nursery keeper checks seedlings under the shade net.", id: "Petugas persemaian memeriksa bibit di bawah naungan." }, focus: "50% 45%" },
  "seedling-rows": { src: "/photos/restoration/nursery/seedling-rows_DSC07701.jpg", w: 2000, h: 1333, color: "#4e643f", alt: { en: "Rows of young seedlings waiting to be planted out.", id: "Barisan bibit muda yang menunggu ditanam." } },
  "central-nursery": { src: "/photos/restoration/nursery/central-nursery_DSC02716.jpg", w: 2000, h: 1333, color: "#506544", alt: { en: "The central nursery, seedlings growing in rows under a shade roof.", id: "Persemaian pusat: bibit tumbuh berbaris di bawah atap naungan." } },
  "polybag-seedlings": { src: "/photos/restoration/nursery/polybag-seedlings_DSC02946.jpg", w: 2000, h: 1333, color: "#485125", alt: { en: "Seedlings in polybags along a nursery path.", id: "Bibit dalam polibag di sepanjang jalur persemaian." } },
  "transplanting-seedling": { src: "/photos/restoration/nursery/transplanting-seedling_DSC03019.jpg", w: 2000, h: 1333, color: "#555426", alt: { en: "Transplanting a seedling into a mulched nursery bed.", id: "Memindahkan bibit ke bedengan persemaian yang diberi mulsa." } },
  "young-leaves": { src: "/photos/restoration/nursery/young-leaves_DSC07767.jpg", w: 2000, h: 1333, color: "#6e7754", alt: { en: "New leaves on a young seedling.", id: "Daun-daun baru pada bibit muda." } },
  // ---- restoration/landscape
  "mulched-demonstration-plot": { src: "/photos/restoration/landscape/mulched-demonstration-plot_DSC03215.jpg", w: 2000, h: 1333, color: "#777524", alt: { en: "A demonstration plot on a slope: planted seedlings ringed with straw mulch.", id: "Petak percontohan di lereng: bibit yang ditanam dikelilingi mulsa jerami." } },
  "walking-through-regrowth": { src: "/photos/restoration/landscape/walking-through-regrowth_DSC03115.jpg", w: 2400, h: 1600, color: "#718f36", alt: { en: "Walking through regrowth on one of the planting blocks.", id: "Berjalan di antara tumbuhan yang tumbuh kembali di salah satu blok tanam." } },
  "track-through-young-trees": { src: "/photos/restoration/landscape/track-through-young-trees_DSC03168.jpg", w: 2000, h: 1333, color: "#657935", alt: { en: "A track winds through young trees on a planting block.", id: "Jalan setapak berkelok di antara pohon muda di sebuah blok tanam." } },
  "young-trees-in-grass": { src: "/photos/restoration/landscape/young-trees-in-grass_DSC03087.jpg", w: 2000, h: 1333, color: "#617d1f", alt: { en: "Young trees rising above the grass on a planting block.", id: "Pohon muda menjulang di atas rerumputan di sebuah blok tanam." } },
  "hillside-golden-grass": { src: "/photos/restoration/landscape/hillside-golden-grass_DSC07778.jpg", w: 2000, h: 1333, color: "#6f6434", alt: { en: "A hillside of golden grass with young trees coming up between the clumps.", id: "Lereng berumput keemasan, pohon muda tumbuh di sela rumpun." } },
  "young-stand": { src: "/photos/restoration/landscape/young-stand_DSC03261.jpg", w: 2000, h: 1138, color: "#475922", alt: { en: "A young stand of planted trees.", id: "Tegakan pohon muda hasil penanaman." } },
  "ferns-under-young-canopy": { src: "/photos/restoration/landscape/ferns-under-young-canopy_DSC03437.jpg", w: 2000, h: 1333, color: "#576435", alt: { en: "Ferns and young trees beneath a closing canopy.", id: "Pakis dan pohon muda di bawah kanopi yang mulai menutup." } },
  "forested-hills": { src: "/photos/restoration/landscape/forested-hills_DSC00037.jpg", w: 2400, h: 1600, color: "#99ac91", alt: { en: "Forested hills rolling to the horizon.", id: "Perbukitan berhutan membentang hingga cakrawala." } },
  "canopy-through-tower-frame": { src: "/photos/restoration/landscape/canopy-through-tower-frame_DSC09381.jpg", w: 2000, h: 1333, color: "#465d43", alt: { en: "The forest canopy seen through the frame of the lookout tower.", id: "Kanopi hutan dilihat dari sela rangka menara pantau." } },
  "lookout-tower": { src: "/photos/restoration/landscape/lookout-tower_DSC09386.jpg", w: 1333, h: 2000, color: "#4d6d6c", alt: { en: "The green lookout tower.", id: "Menara pantau berwarna hijau." } },
  "coconut-palms": { src: "/photos/restoration/landscape/coconut-palms_DSC00015.jpg", w: 1333, h: 2000, color: "#576c47", alt: { en: "Coconut palms rising above the site.", id: "Pohon kelapa menjulang di lokasi." } },
  "beach-from-the-hut": { src: "/photos/restoration/landscape/beach-from-the-hut_DSC09404.jpg", w: 2000, h: 1333, color: "#706c5f", alt: { en: "The beach seen from a thatched lookout hut.", id: "Pantai dilihat dari pondok pengamatan beratap rumbia." } },
  // ---- restoration/livelihood
  "organic-garden-board": { src: "/photos/restoration/livelihood/organic-garden-board_DSC02926.jpg", w: 2000, h: 1333, color: "#7d7e42", alt: { en: "The organic demonstration garden and its information board.", id: "Kebun organik percontohan beserta papan informasinya." } },
  "maize-and-greens": { src: "/photos/restoration/livelihood/maize-and-greens_DSC02944.jpg", w: 2000, h: 1333, color: "#7a8037", alt: { en: "Maize and leafy greens in raised beds.", id: "Jagung dan sayuran daun di bedengan." } },
  "coconut-shell-beds": { src: "/photos/restoration/livelihood/coconut-shell-beds_DSC07856.jpg", w: 2000, h: 1333, color: "#6a6c4b", alt: { en: "Raised beds edged with coconut shells and split bamboo.", id: "Bedengan berpagar tempurung kelapa dan bambu belah." } },
  "garden-plots": { src: "/photos/restoration/livelihood/garden-plots_DSC07851.jpg", w: 2000, h: 1333, color: "#5b5d2f", alt: { en: "Garden plots laid out under a bamboo frame.", id: "Petak-petak kebun di bawah rangka bambu." } },
  "papaya-tree": { src: "/photos/restoration/livelihood/papaya-tree_DSC02972.jpg", w: 1333, h: 2000, color: "#536c49", alt: { en: "A papaya tree in fruit beside the garden.", id: "Pohon pepaya berbuah di samping kebun." } },
  "eggs-in-nest-boxes": { src: "/photos/restoration/livelihood/eggs-in-nest-boxes_DSC07915.jpg", w: 2000, h: 1333, color: "#564a3b", alt: { en: "Eggs in the nest boxes of the hen house.", id: "Telur di kotak sarang kandang ayam." } },
  // ---- restoration/sea-patrol
  "patrol-boat": { src: "/photos/restoration/sea-patrol/patrol-boat_DSC02813.jpg", w: 2000, h: 1333, color: "#327a9a", alt: { en: "The foundation's patrol boat on calm water in the early morning.", id: "Perahu patroli yayasan di perairan tenang pada pagi hari." } },
  "crew-at-the-bow": { src: "/photos/restoration/sea-patrol/crew-at-the-bow_DSC02872.jpg", w: 2000, h: 1333, color: "#3a7684", alt: { en: "A crew member at the bow, the coast ahead.", id: "Awak perahu di haluan, pesisir di depan." } },
  "coast-from-the-bow": { src: "/photos/restoration/sea-patrol/coast-from-the-bow_DSC02897.jpg", w: 2400, h: 1600, color: "#76a8b7", alt: { en: "The coastline from the bow of the patrol boat.", id: "Garis pantai dilihat dari haluan perahu patroli." } },
  // ---- restoration/field-team
  "brush-cutting": { src: "/photos/restoration/field-team/brush-cutting_DSC03264.jpg", w: 2000, h: 1130, color: "#415627", alt: { en: "Cutting back undergrowth around young trees.", id: "Memangkas semak di sekitar pohon muda." } },
  "clearing-vines": { src: "/photos/restoration/field-team/clearing-vines_DSC03330.jpg", w: 2000, h: 1333, color: "#45552d", alt: { en: "Clearing vines from young trees by hand.", id: "Membersihkan tumbuhan pemanjat dari pohon muda." } },
  "weeding-by-hand": { src: "/photos/restoration/field-team/weeding-by-hand_DSC03339.jpg", w: 2000, h: 1333, color: "#56622e", alt: { en: "Weeding by hand around a seedling.", id: "Menyiangi gulma dengan tangan di sekitar bibit." } },
  "hoe-and-boots": { src: "/photos/restoration/field-team/hoe-and-boots_DSC03409.jpg", w: 2000, h: 1333, color: "#4a472b", alt: { en: "A hoe and rubber boots: loosening the soil around a young tree.", id: "Cangkul dan sepatu bot: menggemburkan tanah di sekitar pohon muda." } },
  "researchers-in-the-forest": { src: "/photos/restoration/field-team/researchers-in-the-forest_DSC07945.jpg", w: 2000, h: 1333, color: "#6c6048", alt: { en: "Researchers note and photograph what they find in the forest.", id: "Peneliti mencatat dan memotret temuan mereka di hutan." } },
  // ---- restoration/visits
  "reading-the-site-map": { src: "/photos/restoration/visits/reading-the-site-map_DSC09240.jpg", w: 2000, h: 1333, color: "#645140", alt: { en: "Visitors study the restoration map inside the field hut.", id: "Tamu mempelajari peta restorasi di dalam pondok lapangan." } },
  // ---- restoration/workshop
  "mapping-on-paper": { src: "/photos/restoration/workshop/mapping-on-paper_DSC02544.jpg", w: 2000, h: 1333, color: "#525e5a", alt: { en: "Mapping a planting plan on paper during a restoration workshop.", id: "Menyusun rencana tanam di atas kertas dalam lokakarya restorasi." } },
  "hilltop-pause": { src: "/photos/restoration/workshop/hilltop-pause_DSC02503.jpg", w: 1333, h: 2000, color: "#81a5a5", alt: { en: "A pause on a hilltop above the sea during a field walk.", id: "Jeda di puncak bukit di atas laut dalam kunjungan lapangan." }, focus: "50% 55%" },
  "replanted-coastal-slope": { src: "/photos/restoration/workshop/replanted-coastal-slope_DSC02509.jpg", w: 2000, h: 1333, color: "#6c7944", alt: { en: "A coastal slope replanted with young trees, a field hut and the sea beyond.", id: "Lereng pesisir yang baru ditanami, dengan pondok lapangan dan laut di baliknya." } },
  "checking-a-planting-spot": { src: "/photos/restoration/workshop/checking-a-planting-spot_DSC02502.jpg", w: 1333, h: 2000, color: "#789066", alt: { en: "Checking a planting spot on a hill above the beach.", id: "Memeriksa titik tanam di bukit di atas pantai." } },
  // ---- conservation/animals
  "macaque-behind-bars": { src: "/photos/conservation/animals/macaque-behind-bars_DSC08922.jpg", w: 2400, h: 1600, color: "#5e4d2e", alt: { en: "A crested black macaque raises one hand through the bars of its enclosure.", id: "Seekor yaki mengangkat satu tangan di sela jeruji kandangnya." }, focus: "45% 40%" },
  "cassowary-portrait": { src: "/photos/conservation/animals/cassowary-portrait_DSC08953.jpg", w: 1333, h: 2000, color: "#6a7d46", alt: { en: "A cassowary in profile against soft green light.", id: "Seekor kasuari dalam tampak samping dengan latar cahaya hijau yang lembut." }, focus: "50% 24%" },
  "white-bellied-sea-eagle": { src: "/photos/conservation/animals/white-bellied-sea-eagle_DSC08904.jpg", w: 1333, h: 2000, color: "#535836", alt: { en: "A white-bellied sea eagle on its perch.", id: "Elang-laut perut putih di dahannya." }, focus: "50% 32%" },
  "crocodile-in-its-pool": { src: "/photos/conservation/animals/crocodile-in-its-pool_DSC08869.jpg", w: 2000, h: 1333, color: "#4d4e2d", alt: { en: "A crocodile resting at the edge of its pool.", id: "Seekor buaya beristirahat di tepi kolamnya." } },
  "palm-fruit": { src: "/photos/conservation/animals/palm-fruit_DSC08897.jpg", w: 1333, h: 2000, color: "#76581f", alt: { en: "Ripening palm fruit in the centre's grounds.", id: "Buah palem yang sedang matang di halaman pusat penyelamatan." } },
  "lories-on-a-branch": { src: "/photos/conservation/animals/lories-on-a-branch_Day-2-Story-Lab-for-Sampiri-179.jpg", w: 2000, h: 1334, color: "#8c7468", alt: { en: "Two lories share a branch and a slice of fruit.", id: "Dua ekor nuri berbagi dahan dan sepotong buah." } },
  "lories-feeding": { src: "/photos/conservation/animals/lories-feeding_Day-2-Story-Lab-for-Sampiri-056.jpg", w: 1334, h: 2000, color: "#938577", alt: { en: "Lories feeding in the aviary.", id: "Nuri sedang makan di kandang besar." } },
  "parrot-in-flight": { src: "/photos/conservation/animals/parrot-in-flight_DSC09141.jpg", w: 1243, h: 2000, color: "#857763", alt: { en: "A parrot opens its wings inside the aviary.", id: "Seekor burung paruh bengkok mengepakkan sayap di dalam kandang besar." } },
  "cockatoo-on-its-perch": { src: "/photos/conservation/animals/cockatoo-on-its-perch_DSC09334.jpg", w: 2000, h: 1333, color: "#675f4d", alt: { en: "A cockatoo on its perch in the aviary.", id: "Kakatua di dahannya di dalam kandang besar." } },
  // ---- conservation/centre
  "centre-entrance-steps": { src: "/photos/conservation/centre/centre-entrance-steps_Day-2-Story-Lab-for-Sampiri-083.jpg", w: 1334, h: 2000, color: "#676d64", alt: { en: "A group gathers on the steps of the Tasikoki rescue centre.", id: "Rombongan berkumpul di tangga Pusat Penyelamatan Satwa Tasikoki." }, focus: "50% 40%" },
  "tree-mural": { src: "/photos/conservation/centre/tree-mural_DSC08737.jpg", w: 1333, h: 2000, color: "#aea76c", alt: { en: "A mural of a tree filled with hornbills and cockatoos in the education hall.", id: "Mural pohon penuh rangkong dan kakatua di aula edukasi." } },
  "shaded-road": { src: "/photos/conservation/centre/shaded-road_DSC08766.jpg", w: 1333, h: 2000, color: "#384823", alt: { en: "Visitors walk the shaded road through the centre.", id: "Pengunjung menyusuri jalan teduh di dalam pusat penyelamatan." } },
  "preparing-fruit": { src: "/photos/conservation/centre/preparing-fruit_DSC09089.jpg", w: 1333, h: 2000, color: "#57593f", alt: { en: "A keeper prepares fruit for the birds.", id: "Seorang perawat menyiapkan buah untuk burung." } },
  "aviary-corridor": { src: "/photos/conservation/centre/aviary-corridor_DSC9485.jpg", w: 1333, h: 2000, color: "#554228", alt: { en: "A keeper works at the end of a long aviary corridor.", id: "Seorang perawat bekerja di ujung lorong kandang besar yang panjang." } },
  // ---- conservation/translocation
  "langur-in-transport-box": { src: "/photos/conservation/translocation/langur-in-transport-box_DSC9886.jpg", w: 2000, h: 1333, color: "#4f6667", alt: { en: "A Javan langur inside its transport box before the journey.", id: "Seekor lutung jawa di dalam kotak angkutnya sebelum perjalanan." } },
  "carrying-a-transport-box": { src: "/photos/conservation/translocation/carrying-a-transport-box_DSC9917.jpg", w: 1333, h: 2000, color: "#aca58e", alt: { en: "Keepers carry a transport box down a leaf-strewn path.", id: "Perawat membawa kotak angkut menyusuri jalan setapak yang bertabur daun kering." } },
  "snake-in-transport-box": { src: "/photos/conservation/translocation/snake-in-transport-box_DSC09245.jpg", w: 2000, h: 1333, color: "#849799", alt: { en: "A snake coiled on leaf litter inside a transport box.", id: "Seekor ular melingkar di atas serasah di dalam kotak angkut." } },
  "loading-crates": { src: "/photos/conservation/translocation/loading-crates_DSC9620.jpg", w: 2000, h: 1333, color: "#5b5041", alt: { en: "Crates are passed hand to hand into the truck.", id: "Peti-peti dioper dari tangan ke tangan ke dalam truk." } },
  "stacking-crates": { src: "/photos/conservation/translocation/stacking-crates_DSC9663.jpg", w: 2000, h: 1333, color: "#5f5f51", alt: { en: "Crates are stacked and secured on the truck.", id: "Peti-peti ditata dan diikat di atas truk." } },
  "crates-in-the-ship-hold": { src: "/photos/conservation/translocation/crates-in-the-ship-hold_DSC9802-2.jpg", w: 2000, h: 1333, color: "#263c34", alt: { en: "Crates stowed in the hold of the ship.", id: "Peti-peti disimpan di palka kapal." } },
  "gloved-hand-on-a-box": { src: "/photos/conservation/translocation/gloved-hand-on-a-box_DSC9476.jpg", w: 1333, h: 2000, color: "#776f45", alt: { en: "A gloved hand closes a transport box.", id: "Tangan bersarung menutup sebuah kotak angkut." } },
  // ---- conservation/specimens
  "babirusa-skull": { src: "/photos/conservation/specimens/babirusa-skull_XTN03425.jpg", w: 2000, h: 1333, color: "#285039", alt: { en: "A babirusa skull on a measuring mat.", id: "Tengkorak babirusa di atas alas ukur." } },
  "babirusa-lower-jaw-from-above": { src: "/photos/conservation/specimens/babirusa-lower-jaw-from-above_XTN03453.jpg", w: 2000, h: 1333, color: "#194b35", alt: { en: "A babirusa lower jaw seen from above.", id: "Rahang bawah babirusa dilihat dari atas." } },
  "babirusa-lower-jaw-from-the-side": { src: "/photos/conservation/specimens/babirusa-lower-jaw-from-the-side_XTN03460.jpg", w: 2000, h: 1333, color: "#4e6850", alt: { en: "The same lower jaw seen from the side.", id: "Rahang bawah yang sama dilihat dari samping." } },
  // ---- education/school-visits
  "students-in-the-hall": { src: "/photos/education/school-visits/students-in-the-hall_DSC08745.jpg", w: 2000, h: 1333, color: "#8e895e", alt: { en: "Students sit on the floor of the education hall at Tasikoki.", id: "Para pelajar duduk lesehan di aula edukasi Tasikoki." } },
  "watching-the-cassowary": { src: "/photos/education/school-visits/watching-the-cassowary_DSC08826.jpg", w: 2000, h: 1333, color: "#3e4033", alt: { en: "Visitors watch a cassowary from outside its enclosure.", id: "Pengunjung mengamati kasuari dari luar kandangnya." } },
  // ---- education/lokawaya
  "amphitheatre-over-the-valley": { src: "/photos/education/lokawaya/amphitheatre-over-the-valley_Lokawaya-1-205-of-430.jpg", w: 1333, h: 2000, color: "#778488", alt: { en: "The amphitheatre above the valley.", id: "Amfiteater di atas lembah." } },
  "amphitheatre-and-mountains": { src: "/photos/education/lokawaya/amphitheatre-and-mountains_Lokawaya-1-339-of-430.jpg", w: 2400, h: 1219, color: "#8d998d", alt: { en: "The amphitheatre and the mountains beyond.", id: "Amfiteater dan pegunungan di baliknya." } },
  "market-hall": { src: "/photos/education/lokawaya/market-hall_Lokawaya-1-250-of-430.jpg", w: 2000, h: 1333, color: "#564832", alt: { en: "Market stalls under the timber hall at Lokawaya.", id: "Lapak pasar di bawah aula kayu Lokawaya." } },
  "market-tables": { src: "/photos/education/lokawaya/market-tables_Lokawaya-1-267-of-430.jpg", w: 2000, h: 1159, color: "#766953", alt: { en: "Visitors gather around the market tables.", id: "Pengunjung berkerumun di sekitar meja pasar." } },
  "library-workshop": { src: "/photos/education/lokawaya/library-workshop_Lokawaya-1-356-of-430.jpg", w: 2000, h: 1333, color: "#6a5a43", alt: { en: "A workshop around the long table in the library.", id: "Lokakarya di meja panjang perpustakaan." } },
  "deck-over-the-valley": { src: "/photos/education/lokawaya/deck-over-the-valley_Lokawaya-1-397-of-430.jpg", w: 2000, h: 1333, color: "#7f865e", alt: { en: "Visitors at tables on the deck above the valley.", id: "Pengunjung di meja-meja pada dek di atas lembah." } },
  "musicians-on-the-deck": { src: "/photos/education/lokawaya/musicians-on-the-deck_Lokawaya-1-408-of-430.jpg", w: 2000, h: 1280, color: "#8a8665", alt: { en: "Musicians play on the deck with the valley behind them.", id: "Para pemusik tampil di dek dengan lembah di belakang mereka." } },
  "bass-player-and-mountain": { src: "/photos/education/lokawaya/bass-player-and-mountain_DSC05350.jpg", w: 2000, h: 1195, color: "#8da9a2", alt: { en: "A bass player on stage, the mountain behind him.", id: "Pemain bas di atas panggung dengan gunung di belakangnya." } },
  "clean-up-crew": { src: "/photos/education/lokawaya/clean-up-crew_DSC04835.jpg", w: 2000, h: 1334, color: "#5e5f50", alt: { en: "A clean-up crew poses with the sacks of waste they collected.", id: "Tim bersih-bersih berfoto dengan karung sampah yang mereka kumpulkan." } },
  "students-with-sacks": { src: "/photos/education/lokawaya/students-with-sacks_DSC08226.jpg", w: 2000, h: 1333, color: "#989c7d", alt: { en: "University students carry sacks of collected waste along a village road.", id: "Mahasiswa membawa karung sampah yang terkumpul menyusuri jalan desa." } },
  "painting-an-animal": { src: "/photos/education/lokawaya/painting-an-animal_DSC05534.jpg", w: 2000, h: 1352, color: "#4a635b", alt: { en: "An artist paints an animal portrait on the lawn.", id: "Seorang seniman melukis potret satwa di atas rumput." } },
  "painting-in-progress": { src: "/photos/education/lokawaya/painting-in-progress_DSC05643.jpg", w: 2000, h: 1334, color: "#677c75", alt: { en: "Bright paint on a canvas in progress.", id: "Cat warna-warni pada kanvas yang sedang dilukis." } },
  "talk-in-the-hall": { src: "/photos/education/lokawaya/talk-in-the-hall_DSC05022.jpg", w: 2000, h: 1334, color: "#473f34", alt: { en: "A speaker presents to a small audience.", id: "Seorang pembicara memaparkan materi kepada peserta." } },
  // ---- education/festival
  "mural-wall-to-colour": { src: "/photos/education/festival/mural-wall-to-colour_DSC0522.jpg", w: 2000, h: 1264, color: "#8d9087", alt: { en: "A line-drawn jungle mural, ready for visitors to colour in.", id: "Mural hutan berupa gambar garis, siap diwarnai pengunjung." } },
  "mural-wall-coloured": { src: "/photos/education/festival/mural-wall-coloured_DSC1150.jpg", w: 2000, h: 1334, color: "#8d8b79", alt: { en: "The same mural wall, now full of colour.", id: "Dinding mural yang sama, kini penuh warna." } },
  "bamboo-talk-stage": { src: "/photos/education/festival/bamboo-talk-stage_DSC1047.jpg", w: 2000, h: 1333, color: "#8e907c", alt: { en: "A talk on the bamboo stage beneath old trees.", id: "Bincang-bincang di panggung bambu di bawah pohon-pohon tua." } },
  "audience-on-mats": { src: "/photos/education/festival/audience-on-mats_DSC1073.jpg", w: 2000, h: 1333, color: "#85877a", alt: { en: "The audience sits on mats in front of the talk stage.", id: "Penonton duduk di atas tikar di depan panggung bincang." } },
  "festival-map": { src: "/photos/education/festival/festival-map_DSC0908.jpg", w: 2000, h: 1333, color: "#838e85", alt: { en: "Volunteers in green vests walk past the festival map.", id: "Relawan berompi hijau melintas di depan peta festival." } },
  // ---- education/waste
  "sorting-waste-on-the-grass": { src: "/photos/education/waste/sorting-waste-on-the-grass_DSC0715.jpg", w: 1333, h: 2000, color: "#907b76", alt: { en: "Volunteers sort plastic bottles from festival waste on the grass.", id: "Relawan memilah botol plastik dari sampah festival di atas rumput." } },
  "red-net-bag": { src: "/photos/education/waste/red-net-bag_DSC0983.jpg", w: 2000, h: 1333, color: "#9a897f", alt: { en: "A volunteer opens a red net bag for sorted waste.", id: "Seorang relawan membuka kantong jaring merah untuk sampah terpilah." } },
  "loading-sorted-waste": { src: "/photos/education/waste/loading-sorted-waste_DSC1321.jpg", w: 2000, h: 1136, color: "#938577", alt: { en: "Bags of sorted waste are loaded onto a pickup for transport.", id: "Kantong sampah terpilah dimuat ke pikap untuk diangkut." } },
  // ---- team
  "temboan-team-at-the-sign": { src: "/photos/team/temboan-team-at-the-sign_DSC08648.jpg", w: 2000, h: 1402, color: "#807c74", alt: { en: "The Temboan field team and visitors in front of the Temboan Restoration Area sign.", id: "Tim lapangan Temboan dan tamu di depan papan Area Restorasi Temboan." } },
  "field-staff-in-green-shirts": { src: "/photos/team/field-staff-in-green-shirts_DSC08666.jpg", w: 2000, h: 1333, color: "#5a5651", alt: { en: "Field staff in matching shirts at the entrance to the restoration area.", id: "Staf lapangan berkaus seragam di pintu masuk area restorasi." } },
  "workshop-group": { src: "/photos/team/workshop-group_DSC02709.jpg", w: 2000, h: 1333, color: "#a2844b", alt: { en: "Workshop participants and field staff gather in the open-sided hall.", id: "Peserta lokakarya dan staf lapangan berkumpul di aula terbuka." } },
  // ---- about
  "hq-lawn-wide": { src: "/photos/about/hq-lawn-wide_Lokawaya-1-335-of-430.jpg", w: 2000, h: 1333, color: "#676d42", alt: { en: "Visitors relax on the lawn beside the Yayasan Masarang building.", id: "Pengunjung bersantai di rumput di samping gedung Yayasan Masarang." } },
  "hq-lawn-portrait": { src: "/photos/about/hq-lawn-portrait_Lokawaya-1-336-of-430.jpg", w: 1333, h: 2000, color: "#767d54", alt: { en: "Visitors relax on the lawn beside the Yayasan Masarang building.", id: "Pengunjung bersantai di rumput di samping gedung Yayasan Masarang." }, focus: "50% 45%" },
} satisfies Record<string, CatalogPhoto>;

export type PhotoKey = keyof typeof catalog;
