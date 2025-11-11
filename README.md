# Backend E-commerce

REST API komprehensif untuk platform e-commerce, dibangun menggunakan Node.js, Express, Sequelize, dan PostgreSQL. Proyek ini menggunakan ES Modules (`import`/`export`) dan mencakup fungsionalitas untuk produk, varian, stok, keranjang, wishlist, dan autentikasi JWT.

## Fitur

* **Autentikasi Pengguna**: Registrasi dan Login menggunakan JWT (JSON Web Tokens).
* **Login Fleksibel**: Pengguna dapat login menggunakan **email** atau **nomor HP**.
* **Keamanan Password**: Password pengguna disimpan secara aman menggunakan hashing `bcrypt`.
* **Manajemen Role**: Sistem autentikasi mendukung role 'admin' dan 'user', dengan middleware `verifyAdmin` untuk melindungi rute sensitif.
* **Manajemen Produk (CRUD)**: Endpoint untuk membuat dan mengambil daftar produk.
* **Struktur Produk Kompleks**:
    * **Categories**: Produk diorganisir berdasarkan kategori.
    * **ProductVariant**: Setiap produk dapat memiliki beberapa varian (misal: ukuran, tipe) dengan harga tambahan.
    * **StockProduct**: Stok, harga, dan gambar dikelola per-item (berdasarkan produk, varian, dan warna).
* **Query Lanjutan**: Endpoint `GET /products` mendukung filtering (berdasarkan `category`, `search`), sorting (`sortBy`, `order`), dan paginasi (`page`, `limit`).
* **Keranjang (Cart)**: Fungsionalitas untuk menambah produk ke keranjang dan melihat isi keranjang per pengguna.
* **Wishlist**: Fungsionalitas untuk menambah produk ke wishlist dan melihat wishlist per pengguna. Rute ini diamankan dengan `verifyToken`.
* **ES Modules**: Proyek ini dikonfigurasi sebagai ES Module (`"type": "module"`).

## Teknologi yang Digunakan

* **Node.js**: Lingkungan eksekusi server.
* **Express.js**: Framework web untuk membangun API.
* **Sequelize**: ORM (Object-Relational Mapper) untuk interaksi database.
* **PostgreSQL**: Database relasional (menggunakan driver `pg`).
* **JSON Web Token (jsonwebtoken)**: Untuk autentikasi berbasis token.
* **Bcrypt**: Untuk hashing password.
* **Dotenv**: Untuk mengelola variabel lingkungan.
* **CORS**: Middleware untuk mengaktifkan Cross-Origin Resource Sharing.

## Prasyarat dan Instalasi

### Prasyarat

* Node.js (v14 atau lebih baru direkomendasikan).
* Server database PostgreSQL yang sedang berjalan.

### Langkah Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/rizki-kudeng/ecommerce-be.git](https://github.com/rizki-kudeng/ecommerce-be.git)
    cd ecommerce-be
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Buat file `.env`:**
    Buat file bernama `.env` di root proyek dan isi dengan variabel lingkungan yang diperlukan. Anda dapat menggunakan `src/utils/db.js` dan `src/controllers/authControllers.js` sebagai referensi.
    ```env
    # Konfigurasi Database (PostgreSQL)
    DB_NAME=nama_database_anda
    DB_USER=user_db_anda
    DB_PASSWORD=password_db_anda
    DB_HOST=localhost
    DB_PORT=5432
    DB_DIALECT=postgres

    # Kunci Rahasia JWT
    JWT_SECRET=kunci_rahasia_anda_yang_sangat_aman
    ```

4.  **Siapkan Database:**
    * Pastikan server PostgreSQL Anda berjalan.
    * Buat database (misalnya `ecommerce_db`) yang namanya sesuai dengan `DB_NAME` di file `.env` Anda.

5.  **Jalankan Server:**
    ```bash
    npm start
    ```
    * Server akan berjalan di `http://localhost:3001`.
    * Saat pertama kali dijalankan, `sequelize.sync({alter: true})` akan secara otomatis membuat atau memperbarui tabel database Anda berdasarkan model yang didefinisikan di `src/models/`.

## Susunan Proyek
/ ├── src/ │ ├── app.js # File server Express utama │ ├── controllers/ # Berisi logika bisnis (misal: authControllers.js, productControllers.js) │ ├── middleware/ │ │ └── authMiddleware.js # Middleware untuk verifikasi token JWT dan role admin │ ├── models/ │ │ ├── index.js # File pusat untuk mendefinisikan semua relasi model │ │ ├── products.js # Model untuk tabel Products │ │ ├── user.js # Model untuk tabel User │ │ ├── productVariant.js # Model untuk tabel ProductVariant │ │ ├── stockProduct.js # Model untuk tabel StockProduct │ │ ├── carts.js # Model untuk tabel Carts │ │ ├── categories.js # Model untuk tabel Categories │ │ └── wishlist.js # Model untuk tabel Wishlist │ ├── routes/ │ │ ├── index.js # Router utama yang menggabungkan semua rute API │ │ ├── auth.js # Rute untuk /auth (login, register) │ │ ├── products.js # Rute untuk /products │ │ ├── cart.js # Rute untuk /carts │ │ ├── wishlist.js # Rute untuk /wishlists │ │ └── (rute lainnya...) │ └── utils/ │ ├── bcrypt.js # Fungsi helper untuk Bcrypt │ └── db.js # Konfigurasi koneksi database Sequelize ├── .gitignore ├── package.json └── package-lock.json
## Contoh Penggunaan (Alur API)

### 1. Registrasi Pengguna

* **Method:** `POST`
* **URL:** `http://localhost:3001/auth/register`
* **Body (JSON):**
    ```json
    {
      "username": "userbaru",
      "email": "user@example.com",
      "phone": "081234567890",
      "password": "password123"
    }
    ```

### 2. Login Pengguna

* **Method:** `POST`
* **URL:** `http://localhost:3001/auth/login`
* **Body (JSON):** (Bisa menggunakan email atau nomor HP)
    ```json
    {
      "identifier": "user@example.com",
      "password": "password123"
    }
    ```
* **Respon Sukses:**
    ```json
    {
      "message": "Login berhasil",
      "token": "eyJh... (token JWT Anda)"
    }
    ```

### 3. Mendapatkan Daftar Produk (dengan Filtering)

* **Method:** `GET`
* **URL:** `http://localhost:3001/products?category=1&search=kemeja&sortBy=name&order=ASC&page=1&limit=5`

### 4. Membuat Kategori, Produk, Varian, dan Stok

* `POST /categories` (Membuat Kategori)
* `POST /products` (Membuat Produk, butuh `categoryId`)
* `POST /variants` (Membuat Varian, butuh `productId`)
* `POST /stocks` (Membuat Stok, butuh `productId`, `variantId`, `color`, `stock`, `price`)

### 5. Menambah ke Keranjang

* **Method:** `POST`
* **URL:** `http://localhost:3001/carts`
* **Body (JSON):** (ID didapat dari data produk, varian, dan stok)
    ```json
    {
      "userId": 1,
      "productId": 1,
      "variantId": 1,
      "stockId": 1,
      "quantity": 2,
      "price": 150000
    }
    ```

### 6. Melihat Wishlist Pengguna (Membutuhkan Token)

* **Method:** `GET`
* **URL:** `http://localhost:3001/wishlists/1` (dimana 1 adalah `user_id`)
* **Header:**
    * `Authorization`: `Bearer (token JWT Anda)`

## Kontribusi

Kontribusi selalu diterima! Jika Anda memiliki saran untuk perbaikan, silakan fork repositori ini dan buat *pull request*, atau buka *issue* dengan tag "enhancement".

1.  Fork Proyek
2.  Buat Branch Fitur Anda (`git checkout -b fitur/FiturLuarBiasa`)
3.  Commit Perubahan Anda (`git commit -m 'Menambahkan FiturLuarBiasa'`)
4.  Push ke Branch (`git push origin fitur/FiturLuarBiasa`)
5.  Buka *Pull Request*

## Lisensi

Didistribusikan di bawah Lisensi MIT.

---

**MIT License**

Copyright (c) 2025 [Nama Pemilik Proyek/GitHub Username]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.