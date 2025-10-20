const questions = [
    {
        question: "¿Qué es la calidad de software?",
        answers: [
            { text: "La velocidad de ejecución", correct: false },
            { text: "El cumplimiento de requisitos y estándares", correct: true },
            { text: "El tamaño del código", correct: false },
            { text: "El color de la interfaz", correct: false }
        ]
    },
    {
        question: "¿Cuál es un modelo de calidad de software?",
        answers: [
            { text: "ISO 9126", correct: true },
            { text: "HTML5", correct: false },
            { text: "CSS3", correct: false },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "¿Qué incluye las pruebas de software?",
        answers: [
            { text: "Pruebas unitarias", correct: true },
            { text: "Diseño gráfico", correct: false },
            { text: "Marketing", correct: false },
            { text: "Contabilidad", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultsElement.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResults();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResults() {
    document.getElementById('quiz-container').classList.add('hide');
    resultsElement.classList.remove('hide');
    scoreElement.innerText = `Tu puntaje: ${score} de ${questions.length}`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

startQuiz();
