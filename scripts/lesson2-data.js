// lessons-data.js

// Lista de dados completa da Lesson 1 (Grammar, Verbs e Reading)
export const lesson2Data = {
    // --- PARTE DA PRIMEIRA PÁGINA (VERBOS E PRÁTICA ANTERIOR) ---
    // --- PARTE DA PRIMEIRA PÁGINA (VERBOS E PRÁTICA DA LESSON 2) ---
    like: [
        { text: "I like money", keyword: "money" },
        { text: "You like ice cream", keyword: "ice_cream" },
        { text: "He likes me", keyword: "me" },
        { text: "She likes you", keyword: "you" },
        { text: "I liked it", keyword: "liked_it" },
        { text: "You liked chocolate", keyword: "chocolate" },
        { text: "He likes to drink coke", keyword: "coke" },
        { text: "She likes wine", keyword: "wine" },
        { text: "We like to speak English", keyword: "english" }
    ],
    eat: [
        { text: "We eat meat", keyword: "meat" },
        { text: "She eats apples", keyword: "apples" },
        { text: "He eats ham", keyword: "ham" },
        { text: "I eat bread", keyword: "bread" },
        { text: "You eat cheese", keyword: "cheese" },
        { text: "I eat hamburger", keyword: "hamburger" },
        { text: "She ate sausage", keyword: "sausage" },
        { text: "He eats chicken", keyword: "chicken" },
        { text: "You eat fries", keyword: "fries" },
        { text: "I ate potato", keyword: "potato" }
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