// scripts/lesson-renderer.js
import { lesson1Data } from './lessons-data.js';

export function renderLesson1() {
    const mainElement = document.querySelector('.lesson-container');
    
    if (!mainElement) return;

    // Injeta a estrutura base do Grid das duas colunas
    // Corrigido para .jpg conforme o seu novo print
    mainElement.innerHTML = `
        <h1 class="lesson-title">LESSON 1</h1>
        <div class="lesson-grid">
            <section class="verb-column">
                <div class="verb-header">
                    <div class="img-placeholder main-img">
                        <img src="images/women_drinking_water.jpg" alt="To drink" style="width: 150px; height: 150px; object-fit: cover; border-radius: 50%;">
                    </div>
                    <h2>To drink<br>Drank</h2>
                </div>
                <div class="practice-list" id="drink-list"></div>
            </section>

            <section class="verb-column">
                <div class="verb-header">
                    <div class="img-placeholder main-img">
                        <img src="images/speaking.jpg" alt="To speak" style="width: 150px; height: 150px; object-fit: cover; border-radius: 50%;">
                    </div>
                    <h2>To speak<br>Spoke</h2>
                </div>
                <div class="practice-list" id="speak-list"></div>
            </section>
        </div>
    `;

    const drinkList = document.getElementById('drink-list');
    const speakList = document.getElementById('speak-list');

    // Mapeamento usando o caminho completo e com as extensões corrigidas (.jpg)
    const drinkImages = {
        "images/water.jpg": "images/water.jpg",
        "images/milk.jpg": "images/milk.jpg",
        "images/coffee.jpg": "images/coffee.jpg",
        "images/juice.jpg": "images/juice.jpg",
        "images/soda.jpg": "images/soda.jpg",
        "images/tea.jpg": "images/tea.jpg",
        "images/wine.jpg": "images/wine.jpg",
        "images/beer.jpg": "images/beer.jpg"
    };

    // Mapeamento das bandeiras com as extensões mistas (.jpg e .png) do seu print
    const flagImages = {
        "us": "images/download (1).png",
        "en": "images/download (1).png",
        "fr": "images/french.jpg",
        "de": "images/german.jpg",
        "it": "images/italian.png",
        "pt": "images/portuguese.jpg",
        "es": "images/spanish.png"
    };

    // Gera as linhas de TO DRINK
    lesson1Data.drink.forEach(item => {
        // Monta a chave esperada (ex: "images/water.jpg") usando o item.keyword do seu banco de dados
        const lookupKey = `images/${item.keyword}.jpg`;
        
        // Se a palavra for "cola", redirecionamos para a imagem da soda
        const finalKey = item.keyword === "cola" ? "images/soda.jpg" : lookupKey;

        // Busca no seu objeto mapeado ou usa o download.png como plano de fundo reserva
        const imgUrl = drinkImages[finalKey] || "images/download.png"; 

        const row = document.createElement('div');
        row.className = 'practice-row';
        row.innerHTML = `
            <button class="play-btn">▶</button>
            <p class="practice-text">${item.text}</p>
            <div class="img-placeholder icon-img" style="width: 50px; height: 40px; display: flex; align-items: center; justify-content: center;">
                <img src="${imgUrl}" alt="${item.keyword}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;">
            </div>
        `;
        drinkList.appendChild(row);
    });

    // Gera as linhas de TO SPEAK
    lesson1Data.speak.forEach(item => {
        const imgUrl = flagImages[item.flag] || "images/download (1).png"; 
        const row = document.createElement('div');
        row.className = 'practice-row';
        row.innerHTML = `
            <button class="play-btn">▶</button>
            <p class="practice-text">${item.text}</p>
            <div class="img-placeholder icon-img" style="width: 50px; height: 40px; display: flex; align-items: center; justify-content: center;">
                <img src="${imgUrl}" alt="${item.text}" style="width: 100%; height: 100%; object-fit: contain; border: 1px solid #ddd; border-radius: 2px;">
            </div>
        `;
        speakList.appendChild(row);
    });
}