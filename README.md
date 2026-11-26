Landing page streamer (GitHub Pages)
Pasang di GitHub Pages
Buat repo baru di GitHub, lalu upload `index.html` dan `stats.json` ke root repo.
Buka Settings > Pages. Pada Source pilih "Deploy from a branch", branch `main`, folder `/ (root)`, lalu Save.
Tunggu beberapa menit. Alamatnya: `https://USERNAME.github.io/NAMA-REPO/`
Isi angka dan link TikTok (manual)
Edit `stats.json` langsung di GitHub (klik file > ikon pensil > Commit changes):
`tiktok_username`: sudah diisi `its.toobey` (tanpa @). Mengatur tombol TikTok, "Tonton Live", dan tombol live counter.
`followers`, `total_viewer_live`, `total_likes`: isi angka. Kosong berarti placeholder tetap tampil.
`video_tiktok`: daftar link video TikTok (https://www.tiktok.com/@user/video/123...). Jika diisi, bagian portofolio menampilkan video aslinya.
Edit teks dan link lain
Buka `index.html`, lalu cari dan ganti teks dalam kurung siku, misalnya `[NAMA STREAMER]`, `[Nama Game 1]`, `@[username]`. Link tombol yang masih `href="#"` diganti dengan link aslinya.
Catatan
Untuk preview lokal, jalankan `python3 -m http.server` di folder ini lalu buka `http://localhost:8000`. Membuka file langsung (file://) tidak bisa membaca `stats.json`.
Untuk link download game, pakai sumber legal.
