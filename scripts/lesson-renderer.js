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
    }
}

export function renderLesson1() {
    const pagesContainer = document.getElementById('book-pages-container');
    if (!pagesContainer) return;

    pagesContainer.innerHTML = ""; // Limpa o container para renderizar tudo em ordem

    // ==========================================================================
    // FOLHA 1: VERBS (To drink / To speak) - A primeira parte que havia sumido!
    // ==========================================================================
    const pageVerbs = document.createElement('main');
    pageVerbs.className = 'lesson-container';
    pageVerbs.innerHTML = `
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
    pagesContainer.appendChild(pageVerbs);

    // Mapeamentos de Imagens para a Folha 1
    const drinkImages = {
        "images/water.jpg": "images/water.jpg", "images/milk.jpg": "images/milk.jpg",
        "images/coffee.jpg": "images/coffee.jpg", "images/juice.jpg": "images/juice.jpg",
        "images/soda.jpg": "images/soda.jpg", "images/tea.jpg": "images/tea.jpg",
        "images/wine.jpg": "images/wine.jpg", "images/beer.jpg": "images/beer.jpg",
        "images/coke.jpg": "images/coke.jpg"
    };

    const flagImages = {
        "us": "images/download (1).png", "en": "images/download (1).png",
        "fr": "images/french.jpg", "de": "images/german.jpg",
        "it": "images/italian.png", "br": "images/portuguese.jpg",
        "es": "images/spanish.png"
    };

    // Renderiza as linhas de TO DRINK
    const drinkList = document.getElementById('drink-list');
    lesson1Data.drink.forEach(item => {
        const finalKey = item.keyword === "coke" ? "images/coke.jpg" : `images/${item.keyword}.jpg`;
        const imgUrl = drinkImages[finalKey] || "images/download.png"; 

        const row = document.createElement('div');
        row.className = 'practice-row';
        row.innerHTML = `
            <button class="play-btn">▶</button>
            <p class="practice-text">${item.text}</p>
            <div class="img-placeholder icon-img">
                <img src="${imgUrl}" alt="${item.keyword}">
            </div>
        `;
        row.querySelector('.play-btn').onclick = () => falarComElevenLabs(item.text);
        drinkList.appendChild(row);
    });

    // Renderiza as linhas de TO SPEAK
    const speakList = document.getElementById('speak-list');
    lesson1Data.speak.forEach(item => {
        const imgUrl = flagImages[item.flag] || "images/download (1).png"; 
        const row = document.createElement('div');
        row.className = 'practice-row';
        row.innerHTML = `
            <button class="play-btn">▶</button>
            <p class="practice-text">${item.text}</p>
            <div class="img-placeholder icon-img">
                <img src="${imgUrl}" alt="${item.text}">
            </div>
        `;
        row.querySelector('.play-btn').onclick = () => falarComElevenLabs(item.text);
        speakList.appendChild(row);
    });


    // ==========================================================================
    // FOLHA 2: GRAMMAR (Estruturas de perguntas e negativas)
    // ==========================================================================
    const pageGrammar = document.createElement('section');
    pageGrammar.className = 'lesson-container';
    pageGrammar.innerHTML = `
        <h1 class="lesson-title">GRAMMAR</h1>
        
        <div class="grammar-layout">
            <div class="grammar-column">
                <div class="grammar-block">
                    <h3 class="block-title">DO _____</h3>
                    <div id="do-list" class="grammar-list"></div>
                </div>

                <div class="grammar-block">
                    <h3 class="block-title">DON'T _____</h3>
                    <div id="dont-list" class="grammar-list"></div>
                </div>

                <div class="grammar-block">
                    <h3 class="block-title">DID _____</h3>
                    <div id="did-list" class="grammar-list"></div>
                </div>
            </div>

            <div class="grammar-center-images">
                <img src="images/question_mark.png" alt="Question Mark" class="center-img-top">
                <img src="images/smoothie_banana.png" alt="Banana Smoothie" class="center-img-bottom">
            </div>

            <div class="grammar-column">
                <div class="grammar-block">
                    <h3 class="block-title"><u>DOES</u></h3>
                    <div id="does-list" class="grammar-list"></div>
                </div>

                <div class="grammar-block">
                    <h3 class="block-title">DOESN'T _____</h3>
                    <div id="doesnt-list" class="grammar-list"></div>
                </div>

                <div class="grammar-block">
                    <h3 class="block-title">DIDN'T _____</h3>
                    <div id="didnt-list" class="grammar-list"></div>
                </div>
            </div>
        </div>

        <div class="connectives-layout">
            <div class="grammar-block">
                <h3 class="block-title">WITH _____</h3>
                <div id="with-list" class="grammar-list"></div>
            </div>
            <div class="grammar-block">
                <h3 class="block-title">AND _____</h3>
                <div id="and-list" class="grammar-list"></div>
            </div>
        </div>
    `;
    pagesContainer.appendChild(pageGrammar);

    // Função auxiliar para renderizar as linhas de gramática sem imagens laterais
    const renderGrammarRow = (containerId, dataArray) => {
        const container = document.getElementById(containerId);
        dataArray.forEach(item => {
            const row = document.createElement('div');
            row.className = 'grammar-row';
            row.innerHTML = `
                <button class="play-btn">▶</button>
                <p class="practice-text grammar-text">${item.text}</p>
            `;
            row.querySelector('.play-btn').onclick = () => falarComElevenLabs(item.text);
            container.appendChild(row);
        });
    };

    // Injetando os dados da gramática nos blocos correspondentes
    renderGrammarRow('do-list', lesson1Data.grammar.doQuestions);
    renderGrammarRow('does-list', lesson1Data.grammar.doesQuestions);
    renderGrammarRow('dont-list', lesson1Data.grammar.dontNegative);
    renderGrammarRow('doesnt-list', lesson1Data.grammar.doesntNegative);
    renderGrammarRow('did-list', lesson1Data.grammar.didQuestions);
    renderGrammarRow('didnt-list', lesson1Data.grammar.didntNegative);
    renderGrammarRow('with-list', lesson1Data.grammar.connectivesWith);
    renderGrammarRow('and-list', lesson1Data.grammar.connectivesAnd);


    // ==========================================================================
    // FOLHA 3: READING (Frases finais de leitura limpas)
    // ==========================================================================
    const pageReading = document.createElement('section');
    pageReading.className = 'lesson-container';
    pageReading.innerHTML = `
        <h1 class="lesson-title">READING</h1>
        <div class="reading-list" id="reading-list"></div>
    `;
    pagesContainer.appendChild(pageReading);

    const readingList = document.getElementById('reading-list');
    lesson1Data.reading.forEach(item => {
        const row = document.createElement('div');
        row.className = 'practice-row reading-row';
        
        const imageHtml = item.image 
            ? `<div class="img-placeholder icon-img"><img src="${item.image}" alt="Illustration"></div>`
            : `<div class="img-placeholder icon-img" style="visibility: hidden;"></div>`;

        row.innerHTML = `
            <button class="play-btn">▶</button>
            <p class="practice-text reading-text">${item.text}</p>
            ${imageHtml}
        `;
        
        row.querySelector('.play-btn').onclick = () => falarComElevenLabs(item.text);
        readingList.appendChild(row);
    });
}