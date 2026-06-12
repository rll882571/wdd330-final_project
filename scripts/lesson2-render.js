// scripts/lesson2-render.js
import { lesson2Data } from './lesson2-data.js'; // 🔥 Importação corrigida

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

export function renderLesson2() {
    const pagesContainer = document.getElementById('book-pages-container');
    if (!pagesContainer) return;

    pagesContainer.innerHTML = ""; // Limpa o container para renderizar a Lesson 2

    // ==========================================================================
    // FOLHA 1: VERBS (To like / To eat)
    // ==========================================================================
    const pageVerbs = document.createElement('main');
    pageVerbs.className = 'lesson-container';
    pageVerbs.innerHTML = `
        <h1 class="lesson-title">LESSON 2</h1>
        <div class="lesson-grid">
            <section class="verb-column">
                <div class="verb-header">
                    <div class="img-placeholder main-img">
                        <img src="images/like_hand.jpg" alt="To like" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                    </div>
                    <h2>To like<br>Liked</h2>
                </div>
                <div class="practice-list" id="like-list"></div>
            </section>

            <section class="verb-column">
                <div class="verb-header">
                    <div class="img-placeholder main-img">
                        <img src="images/eating.jpg" alt="To eat" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                    </div>
                    <h2>To eat<br>Ate</h2>
                </div>
                <div class="practice-list" id="eat-list"></div>
            </section>
        </div>
    `;
    pagesContainer.appendChild(pageVerbs);

    // Mapeamento de imagens para a coluna TO LIKE
    const likeImages = {
        "images/money.jpg": "images/money.jpg", 
        "images/ice_cream.jpg": "images/ice_cream.jpg",
        "images/me.jpg": "images/me.jpg", 
        "images/you.jpg": "images/you.jpg",
        "images/liked_it.jpg": "images/liked_it.jpg", 
        "images/chocolate.jpg": "images/chocolate.jpg",
        "images/coke.jpg": "images/coke.jpg", 
        "images/wine.jpg": "images/wine.jpg",
        "images/english.jpg": "images/english.jpg"
    };

    // Mapeamento de imagens para a coluna TO EAT
    const eatImages = {
        "images/meat.jpg": "images/meat.jpg", 
        "images/apples.jpg": "images/apples.jpg",
        "images/ham.jpg": "images/ham.jpg", 
        "images/bread.jpg": "images/bread.jpg",
        "images/cheese.jpg": "images/cheese.jpg", 
        "images/hamburger.jpg": "images/hamburger.jpg",
        "images/sausage.jpg": "images/sausage.jpg", 
        "images/chicken.jpg": "images/chicken.jpg",
        "images/fries.jpg": "images/fries.jpg", 
        "images/potato.jpg": "images/potato.jpg"
    };

    // Renderiza as linhas de TO LIKE
    const likeList = document.getElementById('like-list');
    lesson2Data.like.forEach(item => {
        const finalKey = `images/${item.keyword}.jpg`;
        const imgUrl = likeImages[finalKey] || "images/download.png"; 

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
        likeList.appendChild(row);
    });

    // Renderiza as linhas de TO EAT
    const eatList = document.getElementById('eat-list');
    lesson2Data.eat.forEach(item => {
        const finalKey = `images/${item.keyword}.jpg`;
        const imgUrl = eatImages[finalKey] || "images/download.png"; 

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
        eatList.appendChild(row);
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
                    <h3 class="block-title">DO </h3>
                    <div id="do-list" class="grammar-list"></div>
                </div>

                <div class="grammar-block">
                    <h3 class="block-title">DON'T </h3>
                    <div id="dont-list" class="grammar-list"></div>
                </div>

                <div class="grammar-block">
                    <h3 class="block-title">DID</h3>
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
                    <h3 class="block-title">DOESN'T </h3>
                    <div id="doesnt-list" class="grammar-list"></div>
                </div>

                <div class="grammar-block">
                    <h3 class="block-title">DIDN'T </h3>
                    <div id="didnt-list" class="grammar-list"></div>
                </div>
            </div>
        </div>

        <div class="connectives-layout">
            <div class="grammar-block">
                <h3 class="block-title">WITH </h3>
                <div id="with-list" class="grammar-list"></div>
            </div>
            <div class="grammar-block">
                <h3 class="block-title">AND </h3>
                <div id="and-list" class="grammar-list"></div>
            </div>
        </div>
    `;
    pagesContainer.appendChild(pageGrammar);

    // Função auxiliar para renderizar as linhas de gramática
    const renderGrammarRow = (containerId, dataArray) => {
        const container = document.getElementById(containerId);
        if (!container || !dataArray) return;
        
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

    // Injetando os dados da gramática puxando do lesson2Data
    renderGrammarRow('do-list', lesson2Data.grammar.doQuestions);
    renderGrammarRow('does-list', lesson2Data.grammar.doesQuestions);
    renderGrammarRow('dont-list', lesson2Data.grammar.dontNegative);
    renderGrammarRow('doesnt-list', lesson2Data.grammar.doesntNegative);
    renderGrammarRow('did-list', lesson2Data.grammar.didQuestions);
    renderGrammarRow('didnt-list', lesson2Data.grammar.didntNegative);
    renderGrammarRow('with-list', lesson2Data.grammar.connectivesWith);
    renderGrammarRow('and-list', lesson2Data.grammar.connectivesAnd);

    // ==========================================================================
    // FOLHA 3: READING (Frases finais de leitura)
    // ==========================================================================
    const pageReading = document.createElement('section');
    pageReading.className = 'lesson-container';
    pageReading.innerHTML = `
        <h1 class="lesson-title">READING</h1>
        <div class="reading-list" id="reading-list"></div>
    `;
    pagesContainer.appendChild(pageReading);

    const readingList = document.getElementById('reading-list');
    lesson2Data.reading.forEach(item => {
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

    // ==========================================================================
    // FOLHA 4: EXERCISE (Interativo com validação automática)
    // ==========================================================================
    const pageExercise = document.createElement('section');
    pageExercise.className = 'lesson-container exercise-page';
    pageExercise.innerHTML = `
        <h1 class="lesson-title">EXERCISE</h1>
        
        <div class="exercise-section">
            <h2 class="exercise-subtitle">Complete with DO or DOES</h2>
            <div class="exercise-grid-inputs">
                ${lesson2Data.exercises.completeDoDoes.map((item, index) => `
                    <div class="exercise-item-row">
                        <div class="input-wrapper">
                            <input type="text" class="input-do-does" data-correct="${item.correct}" placeholder="">
                            <span class="feedback-icon"></span>
                        </div>
                        <p class="exercise-text-inline">${item.text}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="exercise-section">
            <h2 class="exercise-subtitle">Change the sentences from affirmative to negative.</h2>
            <div class="exercise-grid-negative">
                ${lesson2Data.exercises.transformNegative.map((item, index) => `
                    <div class="exercise-block-neg">
                        <p class="sentence-label">${item.label}</p>
                        <div class="input-wrapper-full">
                            <input type="text" class="input-negative" data-correct="${item.correct}" placeholder="">
                            <span class="feedback-icon"></span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="exercise-section">
            <h2 class="exercise-subtitle">Answer the questions using the following example:</h2>
            <div class="example-box">
                <p class="example-q">Do you drink soda?</p>
                <p class="example-a">No, I dont drink soda.</p>
            </div>

            <div class="exercise-open-questions">
                ${lesson2Data.exercises.openAnswers.map((item, index) => `
                    <div class="exercise-block-open">
                        <p class="question-label">${item.question}</p>
                        <div class="input-wrapper-full">
                            <input type="text" class="input-open" data-correct="${item.correct}" placeholder="No, ">
                            <span class="feedback-icon"></span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <button id="btn-check-answers" class="check-answers-btn">Check Answers</button>
    `;
    pagesContainer.appendChild(pageExercise);

    // --- LÓGICA DE VALIDAÇÃO DO BOTÃO CHECK ---
    document.getElementById('btn-check-answers').onclick = () => {
        const allInputs = pageExercise.querySelectorAll('input[data-correct]');
        
        allInputs.forEach(input => {
            const userAnswer = input.value.trim().toLowerCase().replace(/\s+/g, ' ');
            const correctAnswer = input.getAttribute('data-correct').toLowerCase().trim();
            const feedbackSpan = input.parentNode.querySelector('.feedback-icon');

            if (userAnswer === "") {
                feedbackSpan.innerHTML = "";
                input.style.borderColor = "#718096"; 
            } else if (userAnswer === correctAnswer || (input.classList.contains('input-open') && userAnswer.startsWith('no'))) {
                feedbackSpan.innerHTML = "✔️";
                feedbackSpan.style.color = "#2ec4b6";
                input.style.borderColor = "#2ec4b6";
            } else {
                feedbackSpan.innerHTML = "❌";
                feedbackSpan.style.color = "#e53e3e";
                input.style.borderColor = "#e53e3e";
            }
        });
    };
}