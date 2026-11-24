# Jelajah Status & Peran

Game kuis Sosiologi Kelas X untuk materi **Status dan Peran Individu dalam Kelompok Sosial**. Semua soal disusun dari Modul Belajar Mandiri (Bagian A–E).

- **4 pos materi:** Individu, Status & Peran · Interaksi Sosial · Kelompok Sosial · Lembaga Sosial
- **3 jenis soal:** pilihan ganda, benar/salah, dan kelompokkan. Soal diambil acak dari bank 65 soal.
- **Login siswa:** pilih kelas (X-1 s.d. X-10), lalu pilih nama.
- **Rekap guru:** nilai tiap permainan dikirim ke Google Sheets. Guru membuka rekap lewat tombol *Masuk sebagai guru* dengan sandi.

Seluruh game ada di satu file, `index.html`.

## Pengaturan (sekali saja)

### 1. Siapkan Google Sheets untuk rekap nilai
1. Buat Google Sheets baru, misalnya **Rekap Jelajah Status & Peran**.
2. Buka **Ekstensi → Apps Script**, hapus isi bawaan, lalu tempel seluruh isi file `rekap-nilai-apps-script.gs`.
3. Ganti `GANTI_SANDI_INI` dengan sandi admin pilihan Anda, lalu simpan.
4. Klik **Terapkan → Deployment baru**, pilih jenis **Aplikasi web**:
   - *Jalankan sebagai:* **Saya**
   - *Yang memiliki akses:* **Siapa saja**
5. Klik **Terapkan**, beri izin, lalu salin **URL aplikasi web** (berakhiran `/exec`).

### 2. Tempel URL ke game
Buka `index.html`, cari baris berikut di bagian atas `<script>`:

```js
const SHEET_URL = "TEMPEL_URL_WEB_APP_DI_SINI";
```

Ganti teks di dalam tanda kutip dengan URL dari langkah 1, lalu simpan (commit).

### 3. Terbitkan dengan GitHub Pages
1. Di repo ini, buka **Settings → Pages**.
2. Pada *Source* pilih **Deploy from a branch**, branch **main**, folder **/ (root)**, lalu **Save**.
3. Setelah 1–2 menit, game bisa dibuka di `https://<nama-akun>.github.io/<nama-repo>/`.

## Mengubah daftar siswa atau soal
- **Daftar siswa** ada di `const STUDENTS = [...]` dalam `index.html`. Tiap siswa ditulis `{"l":"L","nm":"NAMA","k":"X-1","a":1}` (l = jenis kelamin, nm = nama, k = kelas, a = nomor absen).
- **Bank soal** ada di `const POS = [...]`. Jenis soal: `mc` (pilihan ganda, jawaban benar selalu ditulis pertama dan akan diacak), `tf` (benar/salah), dan `sort` (kelompokkan).

## Catatan
- Bila internet siswa terputus, nilai disimpan di perangkat dan dikirim otomatis saat kembali online.
- Kalau Apps Script diubah, buat **Deployment baru** atau perbarui deployment yang ada (Kelola deployment → Edit → Versi baru), supaya perubahannya berlaku.
- Repo publik berarti daftar nama siswa di `index.html` dapat dilihat siapa saja yang membuka repo.
