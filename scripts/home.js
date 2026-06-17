// scripts/home.js

// --- LÓGICA DO CARROSSEL (Sua função original) ---
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

// --- LÓGICA DE PROGRESSÃO EM CADEIA (Das lições 2 a 6) ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Varre as lições de 2 a 6 para verificar o progresso
    for (let i = 2; i <= 16; i++) {
        const previousLessonNumber = i - 1;
        
        // Verifica se a lição ANTERIOR foi concluída no localStorage
        const isPreviousLessonDone = localStorage.getItem(`lesson${previousLessonNumber}Completed`) === 'true';
        
        // Procura o link da lição atual com base no atributo href (ex: href="lesson2.html")
        const currentLessonLink = document.querySelector(`a[href="lesson${i}.html"]`);

        if (currentLessonLink) {
            if (!isPreviousLessonDone) {
                // 1. Adiciona a classe de CSS para aplicar o efeito visual de bloqueio
                currentLessonLink.classList.add('lesson-locked');
                
                // 2. Intercepta o clique para impedir o acesso e avisar o aluno
                currentLessonLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    alert(`⚠️ Please complete Lesson ${previousLessonNumber} before accessing Lesson ${i}!`);
                });

                // 3. Insere dinamicamente o emoji do cadeado dentro do card
                const card = currentLessonLink.querySelector('.lesson-card');
                if (card) {
                    const lockOverlay = document.createElement('div');
                    lockOverlay.className = 'lock-overlay';
                    lockOverlay.innerHTML = '🔒';
                    card.appendChild(lockOverlay);
                }
            }
        }
    }
});