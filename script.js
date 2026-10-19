
/* ==================================================
   BLOG ANDIKAAAKBAR
   JavaScript — Fitur Website
================================================== */


/* 1. DATA ARTIKEL */

const articles = [
    {
        id: 1,
        title: "Memulai Perjalanan Belajar Pemrograman",
        category: "Teknologi",
        date: "19 Oktober 2026",
        excerpt: "Memahami dasar HTML, CSS, dan JavaScript sebagai langkah awal membangun website.",
        content: `
            <p>Belajar pemrograman bisa dimulai dari hal sederhana. HTML membangun struktur halaman, CSS mengatur tampilan, dan JavaScript memberikan interaksi.</p>
            <p>Mulailah dengan membuat proyek kecil, mencoba kode sendiri, dan memahami setiap kesalahan yang ditemukan.</p>
            <p>Kemampuan berkembang melalui latihan yang konsisten, bukan hanya dengan membaca teori.</p>
        `
    },
    {
        id: 2,
        title: "Konsistensi dalam Pengembangan Diri",
        category: "Pengembangan Diri",
        date: "18 Oktober 2026",
        excerpt: "Perubahan besar dapat dimulai dari kebiasaan kecil yang dilakukan secara teratur.",
        content: `
            <p>Kita tidak harus menguasai semuanya dalam satu hari. Memberikan waktu untuk belajar sedikit demi sedikit dapat membantu membangun pemahaman.</p>
            <p>Tentukan tujuan yang realistis, evaluasi perkembangan, dan berikan diri sendiri kesempatan untuk memperbaiki kesalahan.</p>
            <p>Proses yang konsisten membantu kita berkembang secara bertahap.</p>
        `
    },
    {
        id: 3,
        title: "Memahami Dasar Bisnis",
        category: "Bisnis",
        date: "17 Oktober 2026",
        excerpt: "Memulai bisnis membutuhkan pemahaman pelanggan, perencanaan, dan pengelolaan keuangan.",
        content: `
            <p>Bisnis bukan hanya tentang menjual produk. Bisnis juga berkaitan dengan memahami kebutuhan pelanggan dan memberikan solusi yang bernilai.</p>
            <p>Sebelum memulai, pelajari calon pelanggan, biaya operasional, harga jual, dan strategi pemasaran.</p>
            <p>Evaluasi hasil secara berkala agar keputusan bisnis didasarkan pada informasi yang jelas.</p>
        `
    },
    {
        id: 4,
        title: "Belajar dari Setiap Pengalaman",
        category: "Pengalaman",
        date: "16 Oktober 2026",
        excerpt: "Pengalaman memberikan kesempatan untuk memahami sesuatu dari sudut pandang yang berbeda.",
        content: `
            <p>Setiap pengalaman dapat memberikan pelajaran baru. Hal yang tidak berjalan sesuai rencana dapat menjadi kesempatan untuk mengevaluasi pendekatan kita.</p>
            <p>Catat apa yang berhasil, pahami hal yang perlu diperbaiki, dan gunakan pengetahuan tersebut untuk langkah berikutnya.</p>
        `
    },
    {
        id: 5,
        title: "Membangun Kebiasaan Membaca",
        category: "Pengembangan Diri",
        date: "15 Oktober 2026",
        excerpt: "Membaca dan menulis membantu kita memperluas wawasan sekaligus menyusun pemikiran.",
        content: `
            <p>Membaca memberi kita akses terhadap ide dan pengetahuan baru. Menulis membantu menyusun informasi tersebut agar lebih mudah dipahami.</p>
            <p>Cobalah membaca beberapa halaman setiap hari dan tuliskan hal penting yang kamu pelajari.</p>
        `
    },
    {
        id: 6,
        title: "Mengenal Dunia Website",
        category: "Teknologi",
        date: "14 Oktober 2026",
        excerpt: "Mengenal cara kerja website dan komponen yang membentuk halaman web modern.",
        content: `
            <p>Website umumnya dibangun menggunakan HTML, CSS, dan JavaScript. Ketiganya mempunyai fungsi yang berbeda tetapi saling melengkapi.</p>
            <p>Setelah memahami dasar tersebut, kamu dapat mempelajari desain responsif, aksesibilitas, dan cara menerbitkan website ke internet.</p>
        `
    }
];


/* 2. MENGAMBIL ELEMEN HTML */

const articlesGrid = document.getElementById("articlesGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.getElementById("filterButtons");

const articleDialog = document.getElementById("articleDialog");
const dialogContent = document.getElementById("dialogContent");
const dialogClose = document.getElementById("dialogClose");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const currentYear = document.getElementById("currentYear");


/* 3. FILTER AKTIF */

let activeCategory = "Semua";


/* 4. MENGAMANKAN TEKS */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}


/* 5. MEMBUAT KARTU ARTIKEL */

function createArticleCard(article) {
    return `
        <article class="article-card">

            <div class="article-image">
                <span>BLOG ANDIKAAAKBAR</span>
            </div>

            <div class="article-content">

                <span class="article-category">
                    ${escapeHTML(article.category)}
                </span>

                <h3>${escapeHTML(article.title)}</h3>

                <p>${escapeHTML(article.excerpt)}</p>

                <div class="article-meta">

                    <time>${escapeHTML(article.date)}</time>

                    <button
                        class="read-more"
                        type="button"
                        data-article-id="${article.id}">
                        BACA ARTIKEL →
                    </button>

                </div>
            </div>

        </article>
    `;
}


/* 6. MENAMPILKAN ARTIKEL */

function renderArticles() {
    if (!articlesGrid) return;

    const keyword = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const results = articles.filter(function (article) {
        const categoryMatches =
            activeCategory === "Semua" ||
            article.category === activeCategory;

        const allText = [
            article.title,
            article.category,
            article.excerpt,
            article.content
        ].join(" ").toLowerCase();

        return categoryMatches && allText.includes(keyword);
    });

    if (results.length === 0) {
        articlesGrid.innerHTML = `
            <div class="no-results">
                <h3>Artikel tidak ditemukan</h3>
                <p>Coba kata kunci atau kategori lainnya.</p>
            </div>
        `;
        return;
    }

    articlesGrid.innerHTML = results
        .map(createArticleCard)
        .join("");
}


/* 7. FITUR PENCARIAN */

if (searchInput) {
    searchInput.addEventListener("input", renderArticles);
}


/* 8. FITUR FILTER KATEGORI */

if (filterButtons) {
    filterButtons.addEventListener("click", function (event) {
        const button = event.target.closest(".filter-btn");

        if (!button) return;

        activeCategory = button.dataset.category;

        filterButtons.querySelectorAll(".filter-btn")
            .forEach(function (item) {
                const active = item === button;

                item.classList.toggle("active", active);
                item.setAttribute("aria-pressed", String(active));
            });

        renderArticles();
    });
}


/* 9. MEMBUKA ARTIKEL */

if (articlesGrid) {
    articlesGrid.addEventListener("click", function (event) {
        const button = event.target.closest("[data-article-id]");

        if (!button) return;

        const article = articles.find(function (item) {
            return item.id === Number(button.dataset.articleId);
        });

        if (!article || !articleDialog || !dialogContent) return;

        dialogContent.innerHTML = `
            <span class="article-category">
                ${escapeHTML(article.category)}
            </span>

            <h2 id="dialogTitle">
                ${escapeHTML(article.title)}
            </h2>

            <p class="dialog-date">
                ${escapeHTML(article.date)}
            </p>

            <div class="article-full-content">
                ${article.content}
            </div>
        `;

        if (typeof articleDialog.showModal === "function") {
            articleDialog.showModal();
        }
    });
}


/* 10. MENUTUP POPUP ARTIKEL */

if (dialogClose && articleDialog) {
    dialogClose.addEventListener("click", function () {
        articleDialog.close();
    });

    articleDialog.addEventListener("click", function (event) {
        if (event.target === articleDialog) {
            articleDialog.close();
        }
    });
}


/* 11. MENU NAVIGASI MOBILE */

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
        );
    });

    navLinks.addEventListener("click", function (event) {
        if (!event.target.closest("a")) return;

        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    });
}


/* 12. MODE TERANG DAN GELAP */

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    if (!themeToggle) return;

    themeToggle.textContent = isDark ? "☀" : "◐";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
    );
}

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("andika-blog-theme");
} catch (error) {
    savedTheme = null;
}

applyTheme(savedTheme === "dark");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const isDark =
            !document.body.classList.contains("dark-mode");

        applyTheme(isDark);

        try {
            localStorage.setItem(
                "andika-blog-theme",
                isDark ? "dark" : "light"
            );
        } catch (error) {
            // Tema tetap berubah meskipun penyimpanan tidak tersedia.
        }
    });
}


/* 13. TAHUN OTOMATIS */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* 14. JALANKAN WEBSITE */

renderArticles();
