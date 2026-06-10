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