# Parking Service API

API ini menyediakan layanan untuk mengelola parkir.

## Instalasi

1. Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di sistem Anda.
2. Clone repository ini ke dalam sistem Anda.
3. Buka terminal dan masuk ke direktori proyek.
4. Jalankan perintah `npm install` untuk menginstal semua dependensi.
5. Jalankan `npm run start` atau
6. jalankan `npm test`

## Penggunaan

### Routes

Berikut adalah daftar route yang tersedia:

- **POST /enter**: Mengizinkan kendaraan untuk memasuki area parkir.
- **PUT /exit/:id**: Mengizinkan kendaraan untuk meninggalkan area parkir berdasarkan ID tiket.
- **GET /report/type**: Mendapatkan laporan jumlah kendaraan berdasarkan tipe.
- **GET /report/color**: Mendapatkan laporan nomor plat kendaraan berdasarkan warna.