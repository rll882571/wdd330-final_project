// scripts/test-renderer.js

// --- CONFIGURAÇÕES DA ELEVENLABS ---
const API_KEY_ELEVEN = "sk_2f650b3196aca4ee39ec79c3546e67089bce5a3f67908215"; 
const VOICE_ID = "hpp4J3VqNfWAUOO0d1Us"; // Voz "Rachel"
const audioPlayer = new Audio();

// Banco de dados interno do Teste
const testData = {
    listening: [
        { id: 1, text: "I drink coffee with milk every morning.", correct: "i drink coffee with milk every morning" },
        { id: 2, text: "She doesn't speak French or Italian.", correct: "she doesn't speak french or italian" },
        { id: 3, text: "Did you drink juice with Jennifer yesterday?", correct: "did you drink juice with jennifer yesterday" },
        { id: 4, text: "He speaks English and Portuguese very well.", correct: "he speaks english and portuguese very well" },
        { id: 5, text: "I didn't drink soda, I drank sparkling water.", correct: "i didn't drink soda i drank sparkling water" }
    ],
    multipleChoice: [
        {
            question: "Choose the correct sentence:",
            options: [
                "Does he speaks English?",
                "Do he speak English?",
                "Does he speak English?",
                "Is he speak English?"
            ],
            correct: 2
        },
        {
            question: "Complete: 'Yesterday, I _________ tea with my friend.'",
            options: ["drink", "drank", "drinks", "drinking"],
            correct: 1
        }
    ],
    grammarFill: [
        { label: "Paul _________ (not drink) wine, he prefers beer.", correct: "doesn't drink" },
        { label: "_________ you speak with your boss last night?", correct: "did" }
    ]
};

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
        console.error("Erro ao reproduzir áudio:", error);
    }
}

// --- RENDERIZAÇÃO DA PÁGINA DE TESTE ---
document.addEventListener("DOMContentLoaded", () => {
    const testContainer = document.getElementById('test-pages-container');
    if (!testContainer) return;

    testContainer.innerHTML = `
        <main class="lesson-container">
            <h1 class="lesson-title">LESSON 1 - FINAL TEST</h1>
            <p class="speaking-instruction">Responda a todas as seções com atenção e clique em "Finalizar Teste" no final.</p>

            <section class="exercise-section">
                <h2 class="exercise-subtitle">1. Listening: Listen and Write</h2>
                
                <div class="exercise-open-questions">
                    ${testData.listening.map((item, index) => `
                        <div class="exercise-block-open">
                            <div class="exercise-item-row">
                                <button class="play-btn listen-test-btn" data-text="${item.text}">▶</button>
                                <span class="sentence-label">Frase ${index + 1}</span>
                            </div>
                            <div class="input-wrapper-full">
                                <input type="text" class="input-open" data-correct="${item.correct}" placeholder="Clique no play e digite o que ouviu...">
                                <span class="feedback-icon"></span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="exercise-section">
                <h2 class="exercise-subtitle">2. Multiple Choice</h2>
                <div class="exercise-open-questions">
                    ${testData.multipleChoice.map((item, qIndex) => `
                        <div class="exercise-block-open choice-block">
                            <p class="question-label"><strong>Q${qIndex + 1}:</strong> ${item.question}</p>
                            <div class="exercise-open-questions" style="gap: 0.5rem; margin-top: 0.8rem; text-align: left;">
                                ${item.options.map((option, oIndex) => `
                                    <label class="exercise-text-inline" style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-style: normal;">
                                        <input type="radio" name="question-${qIndex}" value="${oIndex}" data-correct="${item.correct}" style="width: 20px; height: 20px;">
                                        <span>${option}</span>
                                    </label>
                                `).join('')}
                            </div>
                            <p class="speech-feedback-icon feedback-icon-radio" style="margin-top: 8px; text-align: left;"></p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="exercise-section">
                <h2 class="exercise-subtitle">3. Grammar: Fill in the Blanks</h2>
                <div class="exercise-open-questions">
                    ${testData.grammarFill.map((item) => `
                        <div class="exercise-block-open">
                            <p class="sentence-label">${item.label}</p>
                            <div class="input-wrapper-full">
                                <input type="text" class="input-negative" data-correct="${item.correct}" placeholder="Responda aqui...">
                                <span class="feedback-icon"></span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <div class="exercise-section" style="text-align: center; border-top: 2px dashed #e2e8f0; padding-top: 2rem;">
                <button id="btn-submit-test" class="check-answers-btn">
                    Finalizar Teste
                </button>
                <div id="test-score-result" class="lesson-title" style="margin-top: 2rem; font-size: 1.8rem;"></div>
            </div>
        </main>
    `;

    // --- EVENTO DOS BOTÕES DE AUDIO DO LISTENING ---
    testContainer.querySelectorAll('.listen-test-btn').forEach(btn => {
        btn.onclick = () => falarComElevenLabs(btn.getAttribute('data-text'));
    });

    // --- LÓGICA DE VALIDAÇÃO GERAL ---
    document.getElementById('btn-submit-test').onclick = () => {
        let totalQuestions = 0;
        let correctAnswers = 0;

        // 1. Validando Inputs de Texto (Listening e Grammar Fill)
        const textInputs = testContainer.querySelectorAll('input[type="text"][data-correct]');
        textInputs.forEach(input => {
            totalQuestions++;
            const userAnswer = input.value.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, ' ');
            const correctAnswer = input.getAttribute('data-correct').toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            const feedbackSpan = input.parentNode.querySelector('.feedback-icon');

            if (userAnswer === correctAnswer && userAnswer !== "") {
                correctAnswers++;
                feedbackSpan.innerHTML = " ✔️";
                feedbackSpan.style.color = "#2ec4b6";
                input.style.borderColor = "#2ec4b6";
            } else {
                feedbackSpan.innerHTML = " ❌";
                feedbackSpan.style.color = "#e53e3e";
                input.style.borderColor = "#e53e3e";
            }
        });

        // 2. Validando Múltipla Escolha (Radio Buttons)
        testData.multipleChoice.forEach((item, qIndex) => {
            totalQuestions++;
            const radios = testContainer.querySelectorAll(`input[name="question-${qIndex}"]`);
            const feedbackBlock = radios[0].closest('.choice-block').querySelector('.feedback-icon-radio');
            let selectedValue = null;

            radios.forEach(radio => {
                if (radio.checked) {
                    selectedValue = parseInt(radio.value);
                }
            });

            if (selectedValue === item.correct) {
                correctAnswers++;
                feedbackBlock.innerHTML = "✔️ Correto!";
                feedbackBlock.style.color = "#2ec4b6";
            } else {
                feedbackBlock.innerHTML = `❌ Incorreto!`;
                feedbackBlock.style.color = "#e53e3e";
            }
        });

        // 3. Exibindo o Resultado Final
        const resultDiv = document.getElementById('test-score-result');
        const percent = Math.round((correctAnswers / totalQuestions) * 100);
        
        resultDiv.innerHTML = `Result: ${correctAnswers} / ${totalQuestions} (${percent}%)`;
        if (percent >= 70) {
            resultDiv.style.color = "#2ec4b6";
        } else {
            resultDiv.style.color = "#e53e3e";
        }
        
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
});