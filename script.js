
// ==========================================
// BLOG ANDIKA AKBAR
// JAVASCRIPT UNTUK INTERAKSI WEBSITE
// ==========================================


// 1. DATA ARTIKEL BLOG
// Kamu bisa mengubah judul, kategori, tanggal,
// ringkasan, isi cerita, dan nama file foto.
// Nama foto harus sesuai dengan file di folder img.

const artikel = [
    {
        judul: "Hari-Hari Sederhana yang Berarti",
        kategori: "Keseharian",
        tanggal: "19 Oktober 2026",
        ringkasan: "Tentang kegiatan sehari-hari dan cara menikmati momen sederhana dalam hidup.",
        foto: "img/cerita-1.jpg",
        isi: [
            "Setiap hari memiliki cerita tersendiri. Ada kegiatan yang sudah biasa dilakukan, ada pengalaman baru, dan ada momen sederhana yang membuat hari terasa berharga.",
            "Aku ingin belajar menikmati proses kehidupan tanpa harus selalu menunggu sesuatu yang besar terjadi. Bagiku, hal-hal kecil juga layak untuk diingat.",
            "Melalui blog ini, aku ingin mencatat perjalanan hari demi hari agar bisa kubaca kembali di masa depan."
        ]
    },
    {
        judul: "Belajar Menjadi Lebih Baik",
        kategori: "Pengalaman",
        tanggal: "18 Oktober 2026",
        ringkasan: "Setiap pengalaman memberikan kesempatan untuk belajar dan memperbaiki diri.",
        foto: "img/cerita-2.jpg",
        isi: [
            "Dalam kehidupan, selalu ada hal baru yang bisa dipelajari. Terkadang semuanya berjalan lancar, tetapi terkadang aku juga perlu mencoba lagi.",
            "Aku ingin menggunakan waktu dengan lebih baik, bertanggung jawab terhadap kegiatan sehari-hari, dan berani mencoba hal-hal yang bermanfaat.",
            "Aku percaya bahwa kemajuan kecil tetap berarti selama aku terus berusaha."
        ]
    },
    {
        judul: "Menikmati Waktu Luang",
        kategori: "Hobi",
        tanggal: "17 Oktober 2026",
        ringkasan: "Menyisihkan waktu untuk beristirahat, melakukan hobi, dan menikmati suasana.",
        foto: "img/cerita-3.jpg",
        isi: [
            "Di tengah rutinitas, waktu luang memberikan kesempatan untuk beristirahat dan melakukan kegiatan yang kusukai.",
            "Aku ingin lebih banyak menghargai waktu, menikmati suasana di sekitarku, dan menyimpan momen yang menyenangkan.",
            "Tidak semua kenangan harus berasal dari perjalanan jauh. Terkadang, momen yang paling sederhana justru paling mudah diingat."
        ]
    }
];


// 2. MENGAMBIL ELEMEN HTML
// Variabel ini menghubungkan JavaScript
// dengan bagian-bagian di dalam index.html.

const articleGrid = document.getElementById("articleGrid");
const emptyMessage = document.getElementById("emptyMessage");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const articleModal = document.getElementById("articleModal");
const modalClose = document.getElementById("modalClose");

const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalImage = document.getElementById("modalImage");
const modalBody = document.getElementById("modalBody");


// 3. MENAMPILKAN TAHUN OTOMATIS
// Tahun akan mengikuti tahun perangkat pengunjung.

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// 4. MENAMPILKAN KARTU ARTIKEL
// Fungsi ini membuat kartu berdasarkan data artikel.

function tampilkanArtikel(kategoriDipilih = "Semua") {
    articleGrid.innerHTML = "";

    const artikelTerpilih = artikel
        .map((data, index) => ({ ...data, index }))
        .filter(data => {
            return kategoriDipilih === "Semua" ||
                   data.kategori === kategoriDipilih;
        });

    emptyMessage.hidden = artikelTerpilih.length > 0;

    artikelTerpilih.forEach(data => {
        const kartu = document.createElement("article");
        kartu.className = "article-card";

        // Membuat gambar artikel.
        const pembungkusGambar = document.createElement("div");
        pembungkusGambar.className = "article-image";

        const gambar = document.createElement("img");

        // FOTO ARTIKEL DIATUR DI DATA ARTIKEL DI ATAS.
        // Contoh: foto: "img/cerita-1.jpg"

        gambar.src = "img/foto2.jpeg"
        gambar.alt = "img/foto2.jpeg"
        gambar.loading = "lazy";

        // Jika foto belum tersedia, gunakan gambar contoh.
        gambar.onerror = function () {
            this.onerror = null;
            this.src =
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80";
        };

        pembungkusGambar.appendChild(gambar);

        const informasi = document.createElement("div");
        informasi.className = "article-info";

        const meta = document.createElement("div");
        meta.className = "article-meta";
        meta.textContent = data.kategori + " · " + data.tanggal;

        const judul = document.createElement("h3");
        judul.textContent = data.judul;

        const ringkasan = document.createElement("p");
        ringkasan.textContent = data.ringkasan;

        const tombol = document.createElement("button");
        tombol.className = "read-more";
        tombol.textContent = "Baca cerita lengkap ↗";

        // Ketika tombol diklik, buka cerita lengkap.
        tombol.addEventListener("click", function () {
            bukaArtikel(data.index);
        });

        informasi.append(meta, judul, ringkasan, tombol);
        kartu.append(pembungkusGambar, informasi);
        articleGrid.appendChild(kartu);
    });
}


// 5. FILTER KATEGORI ARTIKEL
// Pengunjung bisa memilih Semua, Keseharian,
// Pengalaman, atau Hobi.

const tombolFilter = document.querySelectorAll(".filter-btn");

tombolFilter.forEach(tombol => {
    tombol.addEventListener("click", function () {

        // Hapus status aktif dari semua tombol.
        tombolFilter.forEach(item => {
            item.classList.remove("active");
        });

        // Tandai tombol yang dipilih.
        this.classList.add("active");

        // Tampilkan artikel sesuai kategori.
        tampilkanArtikel(this.dataset.category);
    });
});


// 6. MEMBUKA POPUP ARTIKEL
// Isi cerita ditampilkan tanpa pindah halaman.

function bukaArtikel(index) {
    const data = artikel[index];

    if (!data) {
        return;
    }

    modalCategory.textContent = data.kategori;
    modalTitle.textContent = data.judul;
    modalDate.textContent = data.tanggal;

    // FOTO DI DALAM POPUP MENGGUNAKAN FOTO ARTIKEL.
    modalImage.src = data.foto;
    modalImage.alt = data.judul;

    modalImage.onerror = function () {
        this.onerror = null;
        this.src =
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80";
    };

    // Kosongkan isi sebelumnya.
    modalBody.innerHTML = "";

    // Buat paragraf untuk setiap bagian cerita.
    data.isi.forEach(paragraf => {
        const p = document.createElement("p");
        p.textContent = paragraf;
        modalBody.appendChild(p);
    });

    articleModal.classList.add("show");
    document.body.classList.add("modal-open");
    modalClose.focus();
}


// 7. FUNGSI MENUTUP POPUP

function tutupArtikel() {
    articleModal.classList.remove("show");
    document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", tutupArtikel);


// Tutup popup jika area gelap di luar artikel diklik.

articleModal.addEventListener("click", function (event) {
    if (event.target === articleModal) {
        tutupArtikel();
    }
});


// Tutup popup menggunakan tombol Escape.

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        tutupArtikel();
    }
});


// 8. MENU NAVIGASI PADA HP
// Klik ikon menu untuk membuka atau menutup navigasi.

menuToggle.addEventListener("click", function () {
    const menuTerbuka = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", menuTerbuka);
    menuToggle.textContent = menuTerbuka ? "✕" : "☰";
});


// Tutup menu setelah salah satu tautan dipilih.

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// 9. MENAMPILKAN ARTIKEL SAAT HALAMAN DIBUKA

tampilkanArtikel();
