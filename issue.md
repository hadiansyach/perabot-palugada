# Rencana Perubahan UI/UX & Responsivitas Layar

## Deskripsi Tugas
Tugas ini bertujuan untuk merombak total tampilan antarmuka (UI) dari *landing page* saat ini agar sesuai dengan referensi desain terbaru (seperti pada contoh *screenshot*), serta memastikan tampilan tersebut responsif secara optimal di seluruh perangkat (Mobile, Tablet, Desktop). Logo brand dan *favicon* juga akan diseragamkan menggunakan aset khusus.

Dokumen ini adalah pedoman tingkat tinggi (*high-level instruction*) yang dirancang khusus agar mudah dipahami dan diimplementasikan oleh Junior Programmer atau model AI pendamping.

## Arahan Gaya Desain (Berdasarkan Screenshot Referensi)
Desain baru harus mengusung tema **"Modern, Clean, & Elegant Simplicity"**.
- **Latar Belakang & Ruang:** Penggunaan *white space* (ruang kosong) yang lapang, latar belakang warna bersih (seperti putih atau abu-abu sangat muda/krem).
- **Sudut Lengkung (Border Radius):** Setiap kartu, gambar besar, dan kontainer harus memiliki sudut yang membulat (contoh: `rounded-3xl` atau `rounded-[2rem]`).
- **Pill-shaped Elements:** Menu navigasi dan tombol filter kategori harus menggunakan gaya desain kapsul (lonjong).
- **Overlay Glassmorphism:** Teks informasi di atas gambar utama harus menggunakan efek kaca transparan (`backdrop-blur`).
- **Tipografi:** *Headline* harus besar, berani (bold), dan padat (tracking ketat), sedangkan paragraf pendukung berukuran lebih kecil dengan warna netral.

---

## Langkah Implementasi (High-Level)

### 1. Standardisasi Logo & Favicon
- **Gunakan aset:** `public/ic-bucket.png`
- **Instruksi:**
  1. Pasang `ic-bucket.png` sebagai *favicon* utama pada konfigurasi `<head>` di dalam `src/routes/__root.tsx`.
  2. Ganti logo inisial "PP" yang ada pada bagian **Header / Navbar** dengan gambar `ic-bucket.png`.
  3. Ganti logo inisial "PP" pada bagian **Footer** dengan gambar `ic-bucket.png`.

### 2. Merombak Navbar / Header
- Ubah tata letak Navbar menjadi seperti referensi:
  - **Sisi Kiri:** Logo `ic-bucket.png` berdampingan dengan nama brand.
  - **Sisi Tengah:** Pindahkan link menu navigasi ke posisi tengah, dan ubah tampilannya menjadi satu kontainer berbentuk *pill* (kapsul) berwarna abu-abu/krem muda.
  - **Sisi Kanan:** Tambahkan deretan ikon (seperti *Favorite/Heart*, *Shopping Bag/Cart* dengan indikator angka, dan avatar user kecil).

### 3. Membangun "Split Hero Section"
- Bagi bagian pahlawan (*hero*) menjadi dua area berdampingan pada layar desktop:
  - **Kolom Kiri (Kartu Teks & Mini Katalog):**
    - Latar belakang abu-abu muda melengkung (`rounded-3xl`).
    - *Heading* besar seperti: "Elevate Your Space with Elegant Simplicity Furniture Design".
    - Deretan tombol filter bergaya kapsul bergaris (*outline*).
    - Sisipkan satu kartu produk berukuran kecil (*featured product*) di dalam kolom kiri ini.
  - **Kolom Kanan (Gambar Hero Besar):**
    - Gambar furnitur estetis (ukuran besar, `rounded-3xl`, memenuhi kolom kanan).
    - Tambahkan elemen kotak melayang (*floating box*) di dalam gambar menggunakan efek *glassmorphism* (`backdrop-blur`) untuk nama produk, *rating* bintang, dan tombol aksi (contoh: "View Product").

### 4. Menambahkan Section Filosofi & Statistik (Trust Indicators)
- Tepat di bawah Hero Section, buat struktur informasi berikut:
  - **Baris 1:** Judul besar "Add Comfort To Your Living" di sisi kiri, dan paragraf pendek di sisi kanan.
  - **Baris 2 (Grid Angka):** Buat 4 kolom sejajar berisi statistik dominan seperti:
    - **900+** (Products that we have created)
    - **21K+** (Happy & loyal customers)
    - **95%** (Customers purchase & return again)
    - **400+** (Unique Design we crafted)

### 5. Aturan Responsivitas (Tailwind Breakpoints)
Pastikan semua desain di atas beradaptasi menggunakan utilitas responsif Tailwind:
- **Mobile (`< 768px`):** 
  - Navbar berubah menjadi ringkas (navigasi tengah mungkin disembunyikan atau dijadikan menu *hamburger*).
  - Kolom kiri dan kanan pada *Hero Section* menjadi bertumpuk atas-bawah (`flex-col`).
  - Grid statistik berubah menjadi 2x2 atau 1 kolom vertikal bersusun.
- **Tablet (`md:`, `768px - 1024px`):** 
  - Navigasi menyesuaikan layar menengah.
  - Gambar dan teks mulai menggunakan tata letak *grid* horizontal, tapi porsinya mungkin 50:50.
- **Desktop (`lg:` & `xl:`, `> 1024px`):** 
  - Tampilan persis sama seperti *layout* referensi (Navigasi Kapsul di tengah, Hero Section terbagi kiri-kanan, dan statistik 4 kolom horizontal).

---

## Catatan Tambahan untuk Programmer / AI
- Jangan hapus logika fungsional yang sudah dibuat (seperti fungsi tautan *WhatsApp* atau modal klik produk), cukup sesuaikan tempat memanggilnya ke dalam komponen UI yang baru.
- Lakukan penyelarasan warna (*color matching*) dengan menggunakan warna netral (`neutral-800`, `neutral-500`, `gray-100`) agar nuansa *elegant simplicity* benar-benar terasa.
