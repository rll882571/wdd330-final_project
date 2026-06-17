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
    // FOLHA 1: VERBS (To drink / To speak)
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
                <img src="images/question.jpg" alt="Question Mark" class="center-img-top">
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
                ${lesson1Data.exercises.completeDoDoes.map((item, index) => `
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
                ${lesson1Data.exercises.transformNegative.map((item, index) => `
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
                ${lesson1Data.exercises.openAnswers.map((item, index) => `
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

    // ==========================================================================
    // FOLHA 5: SPEAKING (COM BOTÕES CORRIGIDOS E VERIFICAÇÃO MANUAL)
    // ==========================================================================
    const pageSpeaking = document.createElement('section');
    pageSpeaking.className = 'lesson-container speaking-page';
    pageSpeaking.innerHTML = `
        <h1 class="lesson-title">SPEAKING PRACTICE</h1>
        <p class="speaking-instruction">Click the play button, record your voice and click "Check" to verify the answer in affirmative form:</p>
        
        <div class="speaking-list">
            ${lesson1Data.speaking.map((item, index) => `
                <div class="speaking-card" id="speaking-card-${index}">
                    <div class="speaking-question-row">
                        <button class="play-btn speak-ask-btn" data-text="${item.question}" title="Ouvir Pergunta">▶</button>
                        <span class="question-display-text">Pergunta ${index + 1}</span>
                    </div>

                    <div class="speaking-action-row">
                        <button class="mic-btn" data-index="${index}">🎤 Gravar Resposta</button>
                        <div class="speaking-feedback-box">
                            <p class="transcript-label">Você disse:</p>
                            <p class="transcript-text" id="transcript-${index}">...</p>
                        </div>
                        <div class="speaking-validation-wrapper">
                            <button class="check-speak-btn" data-index="${index}">Check</button>
                            <span class="speech-feedback-icon" id="speech-icon-${index}"></span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    pagesContainer.appendChild(pageSpeaking);

    // --- ATUALIZAÇÃO DA LÓGICA DE EVENTOS (SPEECH) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // Tocar áudio da pergunta
    pageSpeaking.querySelectorAll('.speak-ask-btn').forEach(btn => {
        btn.onclick = () => falarComElevenLabs(btn.getAttribute('data-text'));
    });

    // Controle de reconhecimento por card
    pageSpeaking.querySelectorAll('.mic-btn').forEach(btn => {
        const index = parseInt(btn.getAttribute('data-index'));
        const recognition = SpeechRecognition ? new SpeechRecognition() : null;

        if (recognition) {
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                btn.textContent = "🛑 Gravando...";
                btn.classList.add('recording');
            };

            recognition.onresult = (event) => {
                let spokenText = event.results[0][0].transcript.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                const transcriptParagraph = document.getElementById(`transcript-${index}`);
                transcriptParagraph.textContent = `"${spokenText}"`;
                transcriptParagraph.setAttribute('data-spoken', spokenText); 
            };

            recognition.onerror = (e) => {
                console.error("Erro no reconhecimento de voz:", e.error);
                btn.textContent = "🎤 Gravar Resposta";
                btn.classList.remove('recording');
            };

            recognition.onend = () => {
                btn.textContent = "🎤 Gravar Resposta";
                btn.classList.remove('recording');
            };

            btn.onclick = () => {
                recognition.start();
            };
        } else {
            btn.onclick = () => alert("Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome.");
        }
    });

    // Lógica dedicada para o botão individual "Check" de cada linha
    pageSpeaking.querySelectorAll('.check-speak-btn').forEach(btn => {
        btn.onclick = () => {
            const index = btn.getAttribute('data-index');
            const targetData = lesson1Data.speaking[index];
            const transcriptParagraph = document.getElementById(`transcript-${index}`);
            const spokenText = transcriptParagraph.getAttribute('data-spoken') || "";
            const feedbackIcon = document.getElementById(`speech-icon-${index}`);

            if (!spokenText || spokenText === "...") {
                feedbackIcon.innerHTML = "⚠️ Grave primeiro!";
                feedbackIcon.style.color = "#718096";
                return;
            }

            const correctResponse = targetData.correctResponse.toLowerCase().trim();
            const alternateResponseWithoutYes = correctResponse.replace(/^yes\s+/, "").trim();

            if (spokenText === correctResponse || spokenText === alternateResponseWithoutYes) {
                feedbackIcon.innerHTML = "✔️ Correto!";
                feedbackIcon.style.color = "#2ec4b6";
                transcriptParagraph.style.color = "#2ec4b6";
            } else {
                feedbackIcon.innerHTML = "❌ Tente de novo";
                feedbackIcon.style.color = "#e53e3e";
                transcriptParagraph.style.color = "#e53e3e";
            }
        };
    });

    // ==========================================================================
    // ÁREA FINAL: BOTÃO FINALIZAR LIÇÃO (ENCAMINHA PARA O TESTE)
    // ==========================================================================
    const pageNavigation = document.createElement('div');
    pageNavigation.style.textAlign = 'center';
    pageNavigation.style.margin = '4rem auto';
    pageNavigation.innerHTML = `
        <button id="btn-finish-lesson" class="check-answers-btn" style="background-color: var(--secondary-color); padding: 1.2rem 3.5rem; font-size: 1.5rem;">
            Finalizar Lição & Ir para o Teste 🚀
        </button>
    `;
    pagesContainer.appendChild(pageNavigation);

    // Evento de clique unificado para salvar o progresso e mudar de página
    document.getElementById('btn-finish-lesson').onclick = () => {
        // Como esta é a renderizadora da Lesson 1, salvamos estaticamente a lesson1Completed
        localStorage.setItem('lesson1Completed', 'true');
        window.location.href = 'assessment.html';
    };
}