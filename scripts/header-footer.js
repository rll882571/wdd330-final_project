import { renderLesson1 } from './lesson-renderer.js';

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // RENDERIZAÇÃO DO HEADER (MENU COM HAMBÚRGUER MOBILE)
    // =========================================================================
    const headerElement = document.getElementById("main-header");

    if (headerElement) {
        headerElement.innerHTML = `
            <div class="header-container">
                <div class="header-logo">
                    <a href="index.html">
                        <img src="images/download.png" alt="Logo do Projeto" class="logo-image">
                    </a>
                </div>
                
                <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>

                <nav class="header-nav" id="header-nav">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="lesson1.html">Lessons</a></li>
                        <li><a href="activities.html">Activities</a></li>
                        <li><a href="progress.html">My Progress</a></li>
                        <li><a href="about.html">About Us</a></li>
                    </ul>
                </nav>
            </div>
        `;

        // Escuta o clique do botão para abrir/fechar
        const menuToggle = document.getElementById("menu-toggle");
        const headerNav = document.getElementById("header-nav");

        if (menuToggle && headerNav) {
            menuToggle.addEventListener("click", () => {
                menuToggle.classList.toggle("active");
                headerNav.classList.toggle("active");
            });
        }

        // APLICAÇÃO RESPONSIVA: Fecha o menu automaticamente caso mude para tela grande
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) { 
                if (menuToggle) menuToggle.classList.remove('active');
                if (headerNav) headerNav.classList.remove('active');
            }
        });
    }

    // =========================================================================
    // RENDERIZAÇÃO DO FOOTER
    // =========================================================================
    const footerElement = document.getElementById("main-footer");

    if (footerElement) {
        footerElement.innerHTML = `
            <div class="footer-container">
                <p>Follow us on social media</p>

                <div class="social-links">
                    <a href="https://instagram.com/seu_instagram" target="_blank">
                        <img src="images/instagram.png" alt="Instagram" class="social-icon">
                    </a>
                    <a href="https://facebook.com/sua_pagina" target="_blank">
                        <img src="images/facebook.png" alt="Facebook" class="social-icon">
                    </a>
                </div>

                <p class="copyright">
                    © ${new Date().getFullYear()} English Course
                </p>
            </div>
        `;
    }

    // =========================================================================
    // DISPARA A LIÇÃO APENAS SE ESTIVER NA PÁGINA COM O CONTAINER (lesson1.html)
    // =========================================================================
    const pagesContainer = document.getElementById('book-pages-container');
    if (pagesContainer) {
        renderLesson1();
    }
});