# Smart Canteen Campus

Prototipe akademis untuk tugas Artificial Intelligence. Website menampilkan data observasi awal, grafik antrean, simulasi antarmuka prediksi, dan rancangan sistem AI. Model Machine Learning belum dilatih atau dievaluasi.

## Membuka cadangan lokal

Unduh seluruh berkas, ekstrak jika berbentuk ZIP, lalu klik dua kali `index.html`. Pastikan `data.js`, `app.js`, `styles.css`, dan `favicon.svg` berada di folder yang sama. Semua fitur bekerja tanpa internet, server, atau instalasi.

## Isi berkas

- `index.html`: isi halaman dan penjelasan rancangan AI.
- `styles.css`: warna, ukuran, dan tampilan responsif.
- `data.js`: seluruh 25 catatan observasi dan identitas lima kantin.
- `app.js`: pemilih waktu, detail, grafik, filter, dan contoh simulasi.
- `.nojekyll`: penanda agar GitHub Pages menyajikan berkas statis secara langsung.

## Mengedit data

Buka `data.js` dengan Notepad atau editor teks. Pada `observations`, setiap baris menyimpan `time` (waktu sebagai teks), `canteen` (ID kantin), `condition` (catatan kondisi asli), `queue` (angka perkiraan antrean), dan `tables` (catatan meja).

Contoh bentuk data: `{ time: '11.20', canteen: 'kansip', condition: 'Mulai ramai', queue: 3, tables: 'Banyak' }`.

Jangan mengubah waktu menjadi angka desimal. Pertahankan pasangan satu catatan untuk setiap waktu dan kantin. Jika menambah waktu, tambahkan juga pada `times` dan catatan kelima kantin. Gunakan teks kondisi asli dan jangan mengklaim pengukuran baru tanpa observasi. Simpan lalu muat ulang browser.

## Memperbarui GitHub Pages

Di repositori GitHub, buka `data.js`, klik ikon pensil, edit baris yang diperlukan, lalu pilih **Commit changes**. GitHub Pages akan menerbitkan perubahan setelah proses deployment selesai. Muat ulang dashboard dan periksa kartu serta tabel. Untuk perubahan beberapa berkas, pilih **Add file → Upload files** dan unggah berkas pengganti.

## Batas prototipe

Angka antrean merupakan perkiraan. Kondisi dan meja mengikuti catatan asli. Kapasitas numerik belum diukur; Kantel memiliki kapasitas fisik lebih kecil. Jumlah antrean saja belum cukup membandingkan kepadatan relatif. Contoh kategori pada simulasi bersifat ilustratif dan tidak dihitung dari data observasi. Mahasiswa tetap menentukan pilihan kantin sendiri.

## Hosting gratis

Untuk menerbitkan salinan: buat repositori **Public**, unggah isi folder ini langsung ke akar repositori, lalu buka **Settings → Pages → Deploy from a branch**, pilih **main** dan **/(root)**, lalu **Save**. Gunakan tautan pada pesan **Your site is live at**; uji pada jendela samaran sebelum membagikannya.

Panduan resmi: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
