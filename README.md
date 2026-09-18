# 💍 Digital Wedding Invitation Website Template (Undangan Pernikahan Digital)

Template website undangan pernikahan digital modern, mewah, dan elegan berbasis **Vanilla Web Stack** (HTML5, CSS3, ES6+ JavaScript). Dirancang khusus sebagai template dan prototipe siap pakai untuk klien atau agensi digital.

---

## ✨ Fitur Utama (12 Sections Sesuai Standar Industri)

1. **Cover Gatekeeper (Fullscreen Door)** — Pintu masuk eksklusif dengan nama tamu personal dinamis (`?to=Nama+Tamu`) dan animasi tirai buka undangan.
2. **Hero Section** — Foto pasangan bertaraf editorial, tipografi anggun (*Cormorant Garamond* & *Pinyon Script*), dan badge tanggal pernikahan.
3. **Ayat Suci / Kutipan Sakral** — Teks surat QS. Ar-Rum (30) : 21 dalam bingkai kartu bertekstur lembut (*cream ivory*).
4. **Bride & Groom Profile** — Profil kedua mempelai dengan bingkai foto berornamen emas halus, keterangan keluarga besar, dan tombol Instagram.
5. **Save The Date & Realtime Countdown** — 4 kotak hitung mundur waktu nyata (Hari, Jam, Menit, Detik) serta integrasi tombol *"Add to Google Calendar"* dan unduh kalender `.ics`.
6. **Detail Acara (Akad & Resepsi)** — Kartu terpisah untuk Akad Nikah dan Resepsi Pernikahan dilengkapi tautan langsung ke Google Maps.
7. **Galeri Foto & Fullscreen Lightbox** — Grid foto responsif dengan efek zoom hover dan penampil foto layar penuh (mendukung keyboard arrows, swipe di layar sentuh, dan tombol navigasi).
8. **Love Story Timeline** — Perjalanan cinta naratif dari tahun ke tahun (2020 s.d 2025) dengan *milestone badges*.
9. **Wedding Gift (Cashless & Kado Fisik)** — Kartu debit bank realistis (Bank BCA, Bank BSI, DANA) berornamen chip emas dengan tombol salin 1-klik (`navigator.clipboard`) dan kartu alamat kado fisik.
10. **Wishes & RSVP (Buku Tamu Interaktif)** — Statistik kehadiran otomatis (*Counter* Hadir vs Berhalangan), formulir RSVP, dan daftar ucapan yang tersimpan di `localStorage` peramban.
11. **Penutup** — Untaian kata terima kasih tulus dari kedua keluarga besar dan tanda tangan kaligrafi digital.
12. **Footer & Kontak Sosial** — Kredit agensi digital dan tombol kontak WhatsApp serta Instagram.
13. **Floating Music Player & Nav Dock** — Piringan hitam (*vinyl disc*) berputar memainkan lagu pengiring romantis: **"Akad" oleh Payung Teduh**, lengkap dengan kontrol putar/jeda dan menu pintasan bawah.

---

## 🎨 Sistem Desain & Palet Warna

- **Latar Belakang**: `#F9FAF7` (Ivory Cream lembut), `#F4F5F0` (Earthy Soft Cream)
- **Teks Utama**: `#332720` (Espresso Gelap Mewah)
- **Aksen Alami**: `#7D8B6F` & `#5F6C52` (Sage Olive Green)
- **Aksen Kemewahan**: `#C79D4C` & `#F6EEDB` (Warm Champagne Gold)
- **Tipografi**:
  - Headings: `'Cormorant Garamond'`, serif
  - Calligraphy: `'Pinyon Script'`, cursive
  - Body & UI: `'Montserrat'`, sans-serif

---

## 🚀 Cara Menjalankan Secara Lokal

Cukup buka berkas `index.html` langsung di browser kesayangan Anda, atau jalankan server lokal sederhana:

```bash
# Menggunakan Python
python -m http.server 8080

# Atau menggunakan Node.js npx serve
npx serve .
```

Akses di peramban:
```
http://localhost:8080/?to=Bapak+Kurniawan+%26+Keluarga
```

---

## 🛠️ Cara Kustomisasi untuk Klien Baru

Semua data bisnis dan konfigurasi terpusat rapi di satu berkas: [`assets/js/config.js`](assets/js/config.js).
Anda dapat mengubah:
- Nama mempelai pria dan wanita
- Data orang tua
- Tanggal, jam, dan lokasi Akad & Resepsi
- Target countdown timer
- Nomor rekening bank (BCA, BSI, Mandiri, DANA)
- Alamat pengiriman kado fisik
- Tautan Google Maps & kalender

---

## 🌐 Panduan Deploy ke GitHub Pages

1. Masuk ke tab **Settings** di repositori GitHub Anda.
2. Pilih menu **Pages** di panel sebelah kiri.
3. Pada bagian **Build and deployment** > **Branch**, pilih branch `main` dan folder `/ (root)`.
4. Klik **Save**. Dalam 1-2 menit, website undangan pernikahan Anda akan online dan dapat diakses publik!

---

*Crafted with ❤️ by Punakawan Digital*
