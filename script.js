
/* ========================================
   MENU NAVIGASI MOBILE
======================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Membuka dan menutup menu
menuToggle.addEventListener("click", function () {
    const menuTerbuka = navMenu.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", menuTerbuka);

    menuToggle.innerHTML = menuTerbuka
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Menutup menu setelah tautan diklik
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

        // Menandai menu yang dipilih
        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

/* ========================================
   EFEK SAAT BAGIAN WEBSITE DIKLIK
======================================== */

console.log("Website Andika berhasil dijalankan!");
