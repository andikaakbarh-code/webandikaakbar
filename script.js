
// ========================================
// 1. DATA ARTIKEL
// ========================================

// Setiap objek di bawah adalah satu artikel.
// Ganti judul, tanggal, kategori, foto, dan isi sesuai kebutuhan.

const artikel = [
    {
        judul: "Belajar Hal Baru Setiap Hari",
        kategori: "Kehidupan",
        tanggal: "22 Oktober 2026",
        foto: "img/cerita-1.jpg",
        ringkasan:
            "Setiap hari adalah kesempatan untuk belajar dan menjadi lebih baik.",
        isi: [
            "Menurut saya, belajar tidak selalu harus dilakukan di dalam kelas. Kita juga bisa belajar dari pengalaman, kesalahan, dan hal-hal sederhana yang terjadi setiap hari.",
            "Hal yang terpenting adalah memiliki kemauan untuk terus mencoba, tidak mudah menyerah, dan mengambil pelajaran dari setiap pengalaman.",
            "Semoga kita semua bisa terus berkembang dan menjadi pribadi yang lebih baik."
        ]
    },

    {
        judul: "Perjalanan Belajar Membuat Website",
        kategori: "Teknologi",
        tanggal: "21 Oktober 2026",
        foto: "img/cerita-2.jpg",
        ringkasan:
            "Mengenal HTML, CSS, dan JavaScript dalam membangun website pribadi.",
        isi: [
            "Saat mulai belajar membuat website, saya mengenal tiga bagian penting yaitu HTML, CSS, dan JavaScript.",
            "HTML digunakan untuk menyusun struktur halaman. CSS membantu mengatur desain dan warna, sedangkan JavaScript membuat halaman bisa berinteraksi dengan pengunjung.",
            "Walaupun terkadang menemukan error, saya bisa belajar memperbaikinya secara bertahap."
        ]
    },

    {
        judul: "Pengalaman yang Memberikan Pelajaran",
        kategori: "Pengalaman",
        tanggal: "20 Oktober 2026",
        foto: "img/cerita-3.jpg",
        ringkasan:
            "Pengalaman sederhana bisa memberikan pelajaran yang berarti.",
        isi: [
            "Dalam kehidupan sehari-hari, kita bisa mengalami berbagai hal yang memberikan pelajaran baru.",
            "Saya belajar bahwa proses tidak selalu berjalan sesuai rencana. Terkadang kita harus mencoba lagi, mengevaluasi kesalahan, dan mencari cara yang lebih baik.",
            "Bagi saya, setiap langkah kecil tetap berarti selama kita mau terus berusaha."
        ]
    }
];


// ========================================
// 2. MENGAMBIL ELEMEN HTML
// ========================================

const articleContainer = document.getElementById("articleContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const emptyMessage = document.getElementById("emptyMessage");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const articleModal = document.getElementById("articleModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalText = document.getElementById("modalText");


// ========================================
// 3. MENAMPILKAN ARTIKEL
// ========================================

function tampilkanArtikel() {
    // Ambil teks pencarian dan kategori pilihan.
    const kataKunci = searchInput.value.toLowerCase().trim();
    const kategoriDipilih = categoryFilter.value;

    // Kosongkan kartu sebelumnya agar tidak menumpuk.
    articleContainer.innerHTML = "";

    // Saring artikel berdasarkan pencarian dan kategori.
    const artikelTerpilih = artikel.filter(function(data) {
        const cocokKataKunci =
            data.judul.toLowerCase().includes(kataKunci) ||
            data.ringkasan.toLowerCase().includes(kataKunci) ||
            data.kategori.toLowerCase().includes(kataKunci);

        const cocokKategori =
            kategoriDipilih === "Semua" ||
            data.kategori === kategoriDipilih;

        return cocokKataKunci && cocokKategori;
    });

    // Tampilkan pesan jika tidak ada artikel yang cocok.
    emptyMessage.hidden = artikelTerpilih.length > 0;

    // Buat satu kartu untuk setiap artikel terpilih.
    artikelTerpilih.forEach(function(data) {
        const kartu = document.createElement("article");
        kartu.className = "article-card";

        // PEMBUNGKUS GAMBAR
        const pembungkusGambar = document.createElement("div");
        pembungkusGambar.className = "article-image";

        // BUAT GAMBAR UNTUK ARTIKEL INI
        const gambar = document.createElement("img");

        // PENTING: gunakan foto milik artikel yang sedang diproses.
        gambar.src = data.foto;
        gambar.alt = data.judul;
        gambar.loading = "lazy";

        // Jika gambar lokal tidak ditemukan, gunakan gambar cadangan.
        gambar.onerror = function() {
            this.onerror = null;
            this.src =
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80";
        };

        pembungkusGambar.appendChild(gambar);

        // ISI KARTU ARTIKEL
        const isiKartu = document.createElement("div");
        isiKartu.className = "article-body";

        const kategori = document.createElement("p");
        kategori.className = "article-category";
        kategori.textContent = data.kategori;

        const judul = document.createElement("h3");
        judul.textContent = data.judul;

        const tanggal = document.createElement("p");
        tanggal.className = "article-date";
        tanggal.textContent = data.tanggal;

        const ringkasan = document.createElement("p");
        ringkasan.className = "article-excerpt";
        ringkasan.textContent = data.ringkasan;

        const tombolBaca = document.createElement("button");
        tombolBaca.className = "read-more";
        tombolBaca.type = "button";
        tombolBaca.textContent = "Baca selengkapnya →";

        // Klik tombol akan membuka isi lengkap artikel.
        tombolBaca.addEventListener("click", function() {
            bukaArtikel(data);
        });

        // Susun isi kartu.
        isiKartu.appendChild(kategori);
        isiKartu.appendChild(judul);
        isiKartu.appendChild(tanggal);
        isiKartu.appendChild(ringkasan);
        isiKartu.appendChild(tombolBaca);

        // Masukkan gambar dan isi ke kartu.
        kartu.appendChild(pembungkusGambar);
        kartu.appendChild(isiKartu);

        // Masukkan kartu ke halaman.
        articleContainer.appendChild(kartu);
    });
}


// ========================================
// 4. POPUP ISI LENGKAP ARTIKEL
// ========================================

function bukaArtikel(data) {
    modalImage.src = data.foto;
    modalImage.alt = data.judul;

    // Jika gambar artikel gagal dimuat, tampilkan gambar cadangan.
    modalImage.onerror = function() {
        this.onerror = null;
        this.src =
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80";
    };

    modalCategory.textContent = data.kategori;
    modalTitle.textContent = data.judul;
    modalDate.textContent = data.tanggal;

    // Kosongkan isi popup sebelum memasukkan paragraf.
    modalText.innerHTML = "";

    data.isi.forEach(function(paragraf) {
        const p = document.createElement("p");
        p.textContent = paragraf;
        modalText.appendChild(p);
    });

    articleModal.hidden = false;
    document.body.style.overflow = "hidden";

    modalClose.focus();
}


// ========================================
// 5. MENUTUP POPUP
// ========================================

function tutupArtikel() {
    articleModal.hidden = true;
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", tutupArtikel);
modalOverlay.addEventListener("click", tutupArtikel);

// Tombol Escape pada keyboard menutup popup.
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !articleModal.hidden) {
        tutupArtikel();
    }
});


// ========================================
// 6. PENCARIAN DAN FILTER
// ========================================

searchInput.addEventListener("input", tampilkanArtikel);
categoryFilter.addEventListener("change", tampilkanArtikel);


// ========================================
// 7. MENU NAVIGASI HP
// ========================================

menuToggle.addEventListener("click", function() {
    const menuTerbuka = navMenu.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", menuTerbuka);
    menuToggle.setAttribute(
        "aria-label",
        menuTerbuka ? "Tutup menu" : "Buka menu"
    );
});

// Setelah menu dipilih, tutup menu pada tampilan HP.
navMenu.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// ========================================
// 8. TAHUN OTOMATIS DI FOOTER
// ========================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ========================================
// 9. JALANKAN WEBSITE
// ========================================

// Tampilkan artikel saat halaman pertama kali dibuka.
tampilkanArtikel();
