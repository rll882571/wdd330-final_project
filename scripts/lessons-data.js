// lessons-data.js

// Lista de dados completa da Lesson 1 (Grammar, Verbs e Reading)
export const lesson1Data = {
    // --- PARTE DA PRIMEIRA PÁGINA (VERBOS E PRÁTICA ANTERIOR) ---
    drink: [
        { text: "I drink water", keyword: "water" },
        { text: "You drink milk", keyword: "milk" },
        { text: "He drinks coffee", keyword: "coffee" },
        { text: "She drinks juice", keyword: "juice" },
        { text: "I drank soda", keyword: "soda" },
        { text: "You drank tea", keyword: "tea" },
        { text: "He drank coke", keyword: "coke" },
        { text: "She drank wine", keyword: "wine" },
        { text: "I drink beer", keyword: "beer" }
    ],
    speak: [
        { text: "I speak English", flag: "us" },
        { text: "You speak Spanish", flag: "es" },
        { text: "He speaks French", flag: "fr" },
        { text: "She speaks German", flag: "de" },
        { text: "I spoke Portuguese", flag: "br" },
        { text: "You spoke Italian", flag: "it" }
    ],

    // --- SEGUNDA PÁGINA: ESTRUTURAS DE GRAMÁTICA ---
    grammar: {
        doQuestions: [
            { text: "DO I drink water?" },
            { text: "DO you drink milk?" },
            { text: "DO I speak English?" },
            { text: "DO you speak Spanish?" }
        ],
        doesQuestions: [
            { text: "DOES she drink juice?" },
            { text: "DOES she drink beer?" },
            { text: "DOES he speak French?" },
            { text: "DOES he speak English?" }
        ],
        dontNegative: [
            { text: "I DON'T drink sparkling water" },
            { text: "You DON'T speak French" }
        ],
        doesntNegative: [
            { text: "She DOESN'T drink juice" },
            { text: "She DOESN'T speak Italian" }
        ],
        didQuestions: [
            { text: "DID you speak Spanish?" },
            { text: "DID you drink fizzy drink?" }
        ],
        didntNegative: [
            { text: "I DIDN'T drink smoothie" },
            { text: "I DIDN'T speak Japanese" }
        ],
        connectivesWith: [
            { text: "I drink coffee WITH milk" },
            { text: "I spoke English with Maria" }
        ],
        connectivesAnd: [
            { text: "I speak Portuguese AND Spanish" },
            { text: "I don't drink beer OR wine" }
        ]
    },

    // --- TERCEIRA PÁGINA: LEITURA (READING) ---
    reading: [
        { text: "I spoke English with Jennifer and Susan.", image: "" },
        { text: "You drank soda and Jennifer drank juice.", image: "images/juice.png" },
        { text: "I drink coconut water.", image: "" },
        { text: "She doesn't speak Italian or French.", image: "" },
        { text: "I didn't drink beer or wine with Jennifer.", image: "images/wine.png" }
    ],
    exercises: {
        completeDoDoes: [
            { text: "I drink juice with you?", correct: "do" },
            { text: "you speak Spanish and Portuguese?", correct: "do" },
            { text: "I speak English?", correct: "do" },
            { text: "he speak Spanish and Portuguese?", correct: "does" },
            { text: "you speak French?", correct: "do" },
            { text: "Jennifer drink orange juice?", correct: "does" }, // Ajustado erro de digitação do PDF 'drink drink'
            { text: "she drink milk and soda?", correct: "does" },
            { text: "Paul drink coffee and milk?", correct: "does" }
        ],
        transformNegative: [
            { label: "she drinks beer.", correct: "she doesn't drink beer" },
            { label: "He drank sparkling water.", correct: "he didn't drink sparkling water." },
            { label: "I spoke English with Jennifer.", correct: "i didn't speak English with jennifer." },
            { label: "John speaks Portuguese and German.", correct: "john doesn't speak portuguese and german." },
            { label: "John drinks juice with Jennifer and Mike.", correct: "john doesn't drink juice with jennifer and mike." }
        ],
        openAnswers: [
            { 
                question: "Did you drink milk?", 
                correct: "no, i didn't drink milk." // Exemplo padrão baseado no PDF
            },
            { 
                question: "Does she speak portuguese and Spanish?", 
                correct: "no, she doesn't speak portuguese or spanish." 
            },
            { 
                question: "Do I speak portuguese?", 
                correct: "no, i don't speak portuguese." 
            }
        ]
    }
};