// O seu arquivo JS principal (ex: header.js ou main.js)
import { renderLesson1 } from './lesson-renderer.js';

document.addEventListener("DOMContentLoaded", () => {
    const headerElement = document.getElementById("main-header");

    // Seu código do header dinâmico continua aqui...
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

    // DISPARA A RENDERIZAÇÃO AUTOMÁTICA DA LIÇÃO 1
    renderLesson1();
});
let currentTrackPage = 0;

function moveCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    
    // Altera entre a página 0 e a página 1
    currentTrackPage += direction;
    
    // Evita passar do limite de páginas (temos apenas 2 páginas)
    if (currentTrackPage < 0) currentTrackPage = 0;
    if (currentTrackPage > 1) currentTrackPage = 1;
    
    // Desloca o slider em -50% (já que cada página ocupa metade do track de 200%)
    track.style.transform = `translateX(-${currentTrackPage * 50}%)`;
}