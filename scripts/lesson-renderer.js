// scripts/lesson-renderer.js
import { lesson1Data } from './lessons-data.js';

// --- CONFIGURAÇÕES DA ELEVENLABS ---
const API_KEY_ELEVEN = "sk_2f650b3196aca4ee39ec79c3546e67089bce5a3f67908215"; 
const VOICE_ID = "hpp4J3VqNfWAUOO0d1Us"; // Voz "Rachel"
const audioPlayer = new Audio();

// --- FUNÇÃO DE ÁUDIO (ELEVENLABS) ---
async function falarComElevenLabs(texto) {
    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
            method: "POST",
            headers: {
                "xi-api-key": API_KEY_ELEVEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: texto,
                model_id: "eleven_multilingual_v2",
                voice_settings: { stability: 0.5, similarity_boost: 0.75 }
            })
        });

        if (!response.ok) throw new Error("Erro na API de Áudio");

        const blob = await response.blob();
        const urlAudio = URL.createObjectURL(blob);
        audioPlayer.src = urlAudio;
        audioPlayer.play();
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar áudio. Verifique sua chave ElevenLabs.");
    }
}

export function renderLesson1() {
    const mainElement = document.querySelector('.lesson-container');
    
    if (!mainElement) return;

    // Injeta a estrutura base do Grid das duas colunas (.jpg corrigidos)
    mainElement.innerHTML = `
        <h1 class="lesson-title">LESSON 1</h1>
        <div class="lesson-grid">
            <section class="verb-column">
                <div class="verb-header">
                    <div class="img-placeholder main-img">
                        <img src="images/women_drinking_water.jpg" alt="To drink" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                    </div>
                    <h2>To drink<br>Drank</h2>
                </div>
                <div class="practice-list" id="drink-list"></div>
            </section>

            <section class="verb-column">
                <div class="verb-header">
                    <div class="img-placeholder main-img">
                        <img src="images/speaking.jpg" alt="To speak" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
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
        "images/beer.jpg": "images/beer.jpg",
        "images/coke.jpg": "images/coke.jpg"
    };

    // Mapeamento das bandeiras locais
    const flagImages = {
        "us": "images/download (1).png",
        "en": "images/download (1).png",
        "fr": "images/french.jpg",
        "de": "images/german.jpg",
        "it": "images/italian.png",
        "br": "images/portuguese.jpg", // Mapeado para o código "br" presente no seu arquivo de dados
        "es": "images/spanish.png"
    };

    // Gera as linhas de TO DRINK
    lesson1Data.drink.forEach(item => {
        const lookupKey = `images/${item.keyword}.jpg`;
        const finalKey = item.keyword === "coke" ? "images/coke.jpg" : lookupKey;
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

        // Evento de clique no botão de Play desta linha específica
        row.querySelector('.play-btn').onclick = () => {
            falarComElevenLabs(item.text);
        };

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

        // Evento de clique no botão de Play desta linha específica
        row.querySelector('.play-btn').onclick = () => {
            falarComElevenLabs(item.text);
        };

        speakList.appendChild(row);
    });
}