/**
 * Rekap Nilai "Jelajah Status & Peran" (Sosiologi Kelas X)
 * Tempel seluruh kode ini di Google Sheets → Ekstensi → Apps Script.
 * GANTI sandi di bawah ini. Sandi hanya tersimpan di sini (akun Google guru), tidak di game.
 */
const ADMIN_PASSWORD = 'GANTI_SANDI_INI';

const SHEET = 'Hasil';
const HEAD = ['Waktu', 'Kelas', 'Absen', 'Nama', 'Pos dimainkan', 'Benar', 'Total', 'Nilai', 'Poin', 'Predikat',
              'Pos 1', 'Pos 2', 'Pos 3', 'Pos 4', 'Durasi (detik)', 'Pakai waktu'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SHEET);
  if (!s) {
    s = ss.insertSheet(SHEET);
    s.appendRow(HEAD);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, HEAD.length).setFontWeight('bold');
    // kolom "Pos dimainkan" dan Pos 1–4 berisi teks seperti "1, 2" dan "5/12": jangan diubah menjadi angka/tanggal
    s.getRange('E:E').setNumberFormat('@');
    s.getRange('K:N').setNumberFormat('@');
  }
  return s;
}
function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Game mengirim hasil permainan ke sini. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = JSON.parse(e.postData.contents);
    const list = Array.isArray(data) ? data : [data];
    const s = sheet_();
    list.forEach(function (x) {
      s.appendRow([new Date(x.waktu || Date.now()), String(x.kelas), x.absen, x.nama, String(x.pos), x.benar, x.total,
        x.persen, x.poin, x.predikat, x.p1 || '', x.p2 || '', x.p3 || '', x.p4 || '', x.durasi, x.timer ? 'Ya' : 'Tidak']);
    });
    return out_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/** Halaman guru di game membaca rekap dari sini (wajib sandi). */
function doGet(e) {
  if (!e || !e.parameter || e.parameter.key !== ADMIN_PASSWORD) return out_({ ok: false, error: 'sandi' });
  const s = sheet_();
  const n = s.getLastRow();
  const vals = n > 1 ? s.getRange(2, 1, n - 1, HEAD.length).getDisplayValues() : [];
  const raw = n > 1 ? s.getRange(2, 1, n - 1, 1).getValues() : [];
  const rows = vals.map(function (r, i) {
    const t = raw[i][0];
    return {
      waktu: t instanceof Date ? t.getTime() : (Number(new Date(t)) || 0),
      kelas: String(r[1]), absen: Number(r[2]), nama: r[3], pos: r[4],
      benar: Number(r[5]), total: Number(r[6]), persen: Number(r[7]), poin: Number(r[8]), predikat: r[9],
      p1: r[10], p2: r[11], p3: r[12], p4: r[13], durasi: Number(r[14]), timer: r[15] === 'Ya'
    };
  });
  return out_({ ok: true, rows: rows });
}
