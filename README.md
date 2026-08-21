<p align="center">
  <img src="./public/logo.png" alt="Office Tools Logo" width="180">
</p>

<h1 align="center">📁 Office Tools</h1>

<p align="center">
  <strong>Simple • Fast • Useful</strong>
</p>

<p align="center">
  All-in-one productivity tools for <strong>work, study, and everyday tasks</strong>.
</p>

<p align="center">
  <a href="https://github.com/Strong-Bee/Office-Tools">
    <img src="https://img.shields.io/github/stars/Strong-Bee/Office-Tools?style=for-the-badge" alt="GitHub Stars">
  </a>
  <a href="https://github.com/Strong-Bee/Office-Tools/network/members">
    <img src="https://img.shields.io/github/forks/Strong-Bee/Office-Tools?style=for-the-badge" alt="GitHub Forks">
  </a>
  <a href="https://github.com/Strong-Bee/Office-Tools/issues">
    <img src="https://img.shields.io/github/issues/Strong-Bee/Office-Tools?style=for-the-badge" alt="GitHub Issues">
  </a>
  <a href="https://github.com/Strong-Bee/Office-Tools">
    <img src="https://img.shields.io/github/license/Strong-Bee/Office-Tools?style=for-the-badge" alt="License">
  </a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-development">Development</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-support-me">Support Me</a>
</p>

---

## 📖 About

**Office Tools** adalah platform **all-in-one productivity tools** yang dirancang untuk membantu pekerjaan perkantoran, mahasiswa, siswa, guru, programmer, designer, freelancer, dan pengguna umum.

Terinspirasi dari platform seperti **iLovePDF**, Office Tools bertujuan menyediakan berbagai tools untuk mengelola:

* 📄 PDF
* 📝 Dokumen
* 🖼️ Gambar
* 📊 Spreadsheet
* 🎞️ Presentasi
* 💻 Developer utilities
* 🛠️ Productivity tools

Tujuan utama project ini adalah menyatukan berbagai pekerjaan yang biasanya membutuhkan banyak aplikasi menjadi satu platform yang:

> **Simple • Fast • Useful**

---

## ✨ Features

### 📄 PDF Tools

* Merge PDF
* Split PDF
* Compress PDF
* PDF to Word
* PDF to Excel
* PDF to PowerPoint
* Word to PDF
* Excel to PDF
* PowerPoint to PDF
* JPG to PDF
* PDF to JPG
* Rotate PDF
* Delete PDF Pages
* Extract PDF Pages
* Reorder PDF Pages
* Protect PDF
* Unlock PDF
* Add Watermark
* Add Page Numbers

### 📝 Document Tools

* Word document converter
* Text extraction
* Document compressor
* Document merger
* Document splitter
* TXT converter
* DOC/DOCX utilities
* RTF utilities

### 🖼️ Image Tools

* Image Compressor
* Image Resizer
* Image Converter
* JPG to PNG
* PNG to JPG
* WebP Converter
* Image Cropper
* Image Rotator
* Image Metadata Viewer
* Image to PDF
* Background utilities

### 📊 Office Tools

* Excel utilities
* CSV utilities
* Spreadsheet converter
* PowerPoint utilities
* Presentation converter
* Document format converter

### 💻 Developer Tools

* JSON Formatter
* JSON Validator
* Base64 Encoder/Decoder
* URL Encoder/Decoder
* Timestamp Converter
* Text Formatter

### 🛠️ Productivity Tools

* QR Code Generator
* Barcode Generator
* Password Generator
* Word Counter
* Character Counter
* Case Converter
* Unit Converter
* Color Converter

---

## 🎯 Who Is Office Tools For?

Office Tools dibuat untuk berbagai kebutuhan.

| Pengguna         | Contoh Penggunaan                               |
| ---------------- | ----------------------------------------------- |
| 🧑‍💼 Karyawan   | Mengelola dokumen kantor dan PDF                |
| 🎓 Mahasiswa     | Menggabungkan tugas dan mengubah format dokumen |
| 🧑‍🎓 Siswa      | Mengolah tugas dan file pembelajaran            |
| 👨‍🏫 Guru       | Mengelola materi dan dokumen                    |
| 💻 Programmer    | JSON, Base64, URL, dan developer utilities      |
| 🎨 Designer      | Resize, compress, dan convert gambar            |
| 🧑‍💻 Freelancer | Mengelola dokumen dan file client               |
| 🏢 Perusahaan    | Workflow dokumen dan file management            |

---

## 🚀 Why Office Tools?

Banyak pekerjaan sederhana membutuhkan banyak aplikasi berbeda.

Contohnya:

```text
Merge PDF        → Aplikasi A
Compress PDF     → Aplikasi B
Resize Image     → Aplikasi C
Convert DOCX     → Aplikasi D
JSON Formatter   → Aplikasi E
```

Office Tools mencoba menyatukan semuanya menjadi satu platform:

```text
                 ┌─────────────────────┐
                 │    OFFICE TOOLS     │
                 ├─────────────────────┤
                 │ PDF Tools           │
                 │ Document Tools      │
                 │ Image Tools         │
                 │ Office Tools        │
                 │ Developer Tools     │
                 │ Productivity Tools  │
                 └─────────────────────┘
                           │
                           ▼
                    One Platform
```

---

## 🎨 Design Philosophy

Office Tools dikembangkan dengan beberapa prinsip utama:

* **Simple** — mudah digunakan oleh siapa saja
* **Fast** — proses file secepat mungkin
* **Useful** — setiap tool memiliki fungsi praktis
* **Responsive** — nyaman digunakan di desktop, tablet, maupun mobile
* **Modern** — menggunakan UI yang bersih dan modern
* **Privacy-focused** — data dan file pengguna diperlakukan dengan aman
* **Accessible** — dapat digunakan oleh sebanyak mungkin pengguna

---

## 🔐 Privacy

Privacy merupakan salah satu bagian penting dari Office Tools.

Prinsip yang ingin diterapkan:

* File pengguna tidak disimpan lebih lama dari yang diperlukan.
* File sementara dapat dihapus secara otomatis.
* Tidak menjual data pengguna.
* Tidak menggunakan file pengguna untuk tujuan yang tidak diizinkan.
* Upload dan download menggunakan koneksi yang aman.
* Tool yang memungkinkan akan melakukan pemrosesan langsung di browser.
* Pemrosesan server-side akan menggunakan mekanisme cleanup yang sesuai.

> **Your files are yours.**

> **Catatan:** Kebijakan privacy aktual mengikuti implementasi dan konfigurasi server yang digunakan pada deployment.

---

## 🏗️ Project Architecture

Office Tools dirancang agar setiap tool dapat dikembangkan secara modular.

```text
office-tools/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── ui/
│   ├── pdf/
│   ├── documents/
│   ├── images/
│   └── utilities/
│
├── public/
│
├── docs/
│
├── tests/
│
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

> Struktur aktual dapat berubah mengikuti perkembangan project.

---

## 🧩 Tool Categories

Office Tools menggunakan sistem kategori agar pengguna dapat menemukan tools dengan mudah.

```text
PDF
├── Merge
├── Split
├── Compress
├── Convert
├── Protect
└── Edit

Documents
├── Word
├── TXT
├── RTF
└── Document Converter

Images
├── Compress
├── Resize
├── Convert
├── Crop
└── Image → PDF

Office
├── Excel
├── CSV
└── PowerPoint

Developer
├── JSON
├── Base64
├── URL
└── Timestamp

Utilities
├── QR Code
├── Barcode
├── Password Generator
├── Word Counter
└── Unit Converter
```

---

## 📦 Planned Features

Berikut beberapa fitur yang direncanakan untuk pengembangan Office Tools:

### PDF

* [ ] PDF Merge
* [ ] PDF Split
* [ ] PDF Compress
* [ ] PDF Converter
* [ ] PDF Editor
* [ ] PDF OCR
* [ ] PDF Metadata Editor

### Documents

* [ ] Word Converter
* [ ] Excel Converter
* [ ] PowerPoint Converter
* [ ] Document Compressor
* [ ] Document Merger
* [ ] Document Splitter

### Images

* [ ] Image Compressor
* [ ] Image Converter
* [ ] Image Resizer
* [ ] Image Cropper
* [ ] Image Metadata Tools

### Productivity

* [ ] QR Code Generator
* [ ] Barcode Generator
* [ ] Password Generator
* [ ] JSON Formatter
* [ ] Developer Utilities

### Platform

* [ ] Drag & Drop File Upload
* [ ] Batch File Processing
* [ ] File Preview
* [ ] Processing Progress
* [ ] Dark Mode
* [ ] User Accounts
* [ ] Processing History
* [ ] API
* [ ] REST API Documentation
* [ ] API Authentication
* [ ] Admin Dashboard
* [ ] Usage Analytics
* [ ] Internationalization / i18n

---

## 🖥️ User Experience

Workflow utama Office Tools dirancang sesederhana mungkin:

```text
User
 │
 ▼
Select Tool
 │
 ▼
Upload / Drag & Drop File
 │
 ▼
Process File
 │
 ▼
Preview Result
 │
 ▼
Download
```

Contoh workflow **Merge PDF**:

```text
┌───────────────────────────────────────┐
│              Merge PDF                │
│                                       │
│   Drag & Drop your PDF files here     │
│                                       │
│           [ Select Files ]            │
│                                       │
│   file-1.pdf                  ✓       │
│   file-2.pdf                  ✓       │
│                                       │
│           [ Merge PDF ]               │
└───────────────────────────────────────┘
```

---

## ⚡ Performance

Office Tools ditargetkan untuk memberikan performa yang baik melalui:

* Fast file processing
* Minimal UI latency
* Efficient memory usage
* Batch processing
* Streaming untuk file berukuran besar
* Client-side processing jika memungkinkan
* Automatic cleanup untuk temporary files
* Lazy loading untuk fitur yang diperlukan
* Optimized asset delivery

---

## 🔧 Development

### Prerequisites

Pastikan environment sudah memiliki:

* Node.js
* npm / pnpm / yarn
* Git

### Clone Repository

```bash
git clone https://github.com/Strong-Bee/Office-Tools.git
cd Office-Tools
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Copy file environment:

```bash
cp .env.example .env
```

Kemudian sesuaikan konfigurasi di dalam `.env`.

### Start Development Server

```bash
npm run dev
```

### Build Production

```bash
npm run build
```

### Start Production

```bash
npm start
```

> Sesuaikan command dengan package manager dan konfigurasi project yang digunakan.

---

## 🧪 Testing

Jalankan test:

```bash
npm test
```

Lint:

```bash
npm run lint
```

Type checking:

```bash
npm run typecheck
```

Jika project menggunakan command berbeda, gunakan script yang tersedia pada `package.json`.

---

## 🤝 Contributing

Kontribusi sangat terbuka.

Jika ingin berkontribusi:

### 1. Fork Repository

Fork repository melalui GitHub.

### 2. Clone Repository

```bash
git clone https://github.com/Strong-Bee/Office-Tools.git
cd Office-Tools
```

### 3. Buat Branch

```bash
git checkout -b feature/new-tool
```

### 4. Buat Perubahan

Implementasikan perubahan sesuai kebutuhan.

### 5. Jalankan Quality Checks

```bash
npm run lint
npm run typecheck
npm test
```

### 6. Commit

Gunakan conventional commit jika memungkinkan:

```bash
git commit -m "feat: add new productivity tool"
```

### 7. Push

```bash
git push origin feature/new-tool
```

### 8. Pull Request

Buat Pull Request ke branch utama repository.

### Contribution Ideas

Anda dapat berkontribusi dengan:

* 🛠️ Menambahkan tool baru
* 🐛 Memperbaiki bug
* 🎨 Meningkatkan UI/UX
* ⚡ Meningkatkan performa
* 🧪 Menambahkan test
* 📖 Memperbaiki dokumentasi
* 📦 Menambahkan dukungan format file baru
* ♿ Meningkatkan accessibility
* 🌍 Membantu translation / i18n

---

## 🗺️ Roadmap

### Phase 1 — Core Tools

```text
PDF
├── Merge
├── Split
├── Compress
└── Convert

Images
├── Compress
├── Resize
└── Convert
```

### Phase 2 — Office

```text
Word
Excel
PowerPoint
CSV
TXT
```

### Phase 3 — Productivity

```text
QR Generator
Barcode Generator
Password Generator
Text Tools
Developer Tools
Unit Converter
```

### Phase 4 — Platform

```text
User Account
History
Batch Processing
Cloud Storage
API
Admin Dashboard
```

### Phase 5 — Advanced

```text
AI Document Processing
OCR
Document Summarization
AI PDF Assistant
Smart File Conversion
Workflow Automation
```

---

## 🔮 Future Vision

Office Tools tidak hanya ingin menjadi PDF converter.

Visinya adalah menjadi:

> **A complete digital toolbox for work, study, and everyday productivity.**

Satu platform untuk membantu:

```text
Work
  ↓
Study
  ↓
Create
  ↓
Convert
  ↓
Organize
```

---

## 📊 Project Status

> 🚧 **Office Tools is currently under active development.**

Beberapa fitur mungkin masih dalam tahap development dan belum tersedia pada production.

Periksa **Issues**, **Pull Requests**, dan **Roadmap** repository untuk melihat perkembangan terbaru.

---

## 📜 License

Project ini dapat menggunakan lisensi sesuai kebutuhan pengembangan.

Contoh:

```text
MIT License
```

Jika menggunakan MIT License, pastikan file `LICENSE` juga tersedia di root repository.

---

## ⭐ Support

Jika **Office Tools** bermanfaat untuk Anda:

* ⭐ Berikan Star pada repository
* 🐛 Laporkan bug
* 💡 Ajukan feature request
* 🤝 Berkontribusi melalui Pull Request
* 📢 Bagikan project kepada orang lain

Setiap dukungan membantu project berkembang lebih jauh.

---

## 💖 Support Me

Jika **Office Tools** membantu pekerjaan, kuliah, sekolah, atau project Anda, Anda dapat mendukung pengembangan project ini.

### ⭐ Star the Repository

Cara paling sederhana untuk mendukung project adalah memberikan ⭐ pada repository GitHub.

<p align="center">
  <a href="https://github.com/Strong-Bee/Office-Tools">
    <img
      src="https://img.shields.io/github/stars/Strong-Bee/Office-Tools?style=for-the-badge&logo=github"
      alt="Star Office Tools"
    >
  </a>
</p>

### ☕ Support the Developer

Jika ingin memberikan dukungan secara langsung, Anda dapat menggunakan platform donasi berikut:

<p align="center">
  <a href="https://trakteer.id/lintang_syahdewo" target="_blank" rel="noopener noreferrer">
    <img
      src="https://img.shields.io/badge/Support%20Me-Trakteer-red?style=for-the-badge"
      alt="Support Me on Trakteer"
    >
  </a>
</p>

### 🤝 Other Ways to Support

Dukungan tidak harus berupa donasi.

Anda juga dapat membantu dengan:

* ⭐ Memberikan Star
* 🐛 Melaporkan bug
* 💡 Mengusulkan fitur baru
* 🔧 Membuat Pull Request
* 📖 Memperbaiki dokumentasi
* 🌍 Membantu translation / i18n
* 📢 Membagikan Office Tools
* 💬 Memberikan feedback dan ide

**Setiap dukungan sangat berarti untuk pengembangan Office Tools.**

---

## 📞 Feedback & Community

Menemukan bug atau memiliki ide?

Silakan gunakan:

* **GitHub Issues** untuk bug report dan feature request
* **Pull Requests** untuk kontribusi kode
* **Discussions** untuk diskusi dan ide

---

<div align="center">

<img src="./public/logo.png" alt="Office Tools Logo" width="100">

# 📁 Office Tools

### Simple • Fast • Useful

**A complete digital toolbox for work, study, and everyday productivity.**

<br>

⭐ **Star the repository if you find Office Tools useful.**

<br>

Made with ❤️ for **Work • Study • Productivity**

</div>
