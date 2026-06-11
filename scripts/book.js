import { renderLesson1 } from './lesson-renderer.js';

document.addEventListener("DOMContentLoaded", () => {
    // HEADER
    const headerElement = document.getElementById("main-header");

    if (headerElement) {
        headerElement.innerHTML = `
            <div class="header-container">
                <div class="header-logo">
                    <a href="index.html">
                        <img src="images/download.png" alt="Logo do Projeto" class="logo-image">
                    </a>
                </div>
                <nav class="header-nav">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="lessons.html">Lessons</a></li>
                        <li><a href="activities.html">Activities</a></li>
                        <li><a href="progress.html">My Progress</a></li>
                        <li><a href="about.html">About Us</a></li>
                    </ul>
                </nav>
            </div>
        `;
    }

    // FOOTER
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

    // Renderiza a Lesson 1
    renderLesson1();
});

let currentTrackPage = 0;

function moveCarousel(direction) {
    const track = document.getElementById('carouselTrack');

    currentTrackPage += direction;

    if (currentTrackPage < 0) currentTrackPage = 0;
    if (currentTrackPage > 1) currentTrackPage = 1;

    track.style.transform = `translateX(-${currentTrackPage * 50}%)`;
}

// Necessário para o onclick do HTML funcionar
window.moveCarousel = moveCarousel;