const questions = [
    {
        question: "¿Qué son las normas en la calidad de software?",
        answers: [
            { text: "Herramientas de desarrollo", correct: false },
            { text: "Estándares como ISO/IEC 25010", correct: true },
            { text: "Lenguajes de programación", correct: false },
            { text: "Sistemas operativos", correct: false }
        ]
    },
    {
        question: "¿Cuál es un ejemplo de modelo de calidad?",
        answers: [
            { text: "Modelo de McCall", correct: true },
            { text: "Modelo OSI", correct: false },
            { text: "Modelo TCP/IP", correct: false },
            { text: "Modelo de datos relacional", correct: false }
        ]
    },
    {
        question: "¿Qué promueven los estándares como CMMI?",
        answers: [
            { text: "Procesos consistentes", correct: true },
            { text: "Diseños gráficos", correct: false },
            { text: "Redes sociales", correct: false },
            { text: "Juegos en línea", correct: false }
        ]
    },
    {
        question: "¿Qué mejora el uso de patrones de diseño en el código?",
        answers: [
            { text: "La mantenibilidad", correct: true },
            { text: "La velocidad de internet", correct: false },
            { text: "El precio del hardware", correct: false },
            { text: "El clima", correct: false }
        ]
    },
    {
        question: "¿Qué tipo de pruebas evalúan la integración de componentes?",
        answers: [
            { text: "Pruebas de integración", correct: true },
            { text: "Pruebas de usabilidad", correct: false },
            { text: "Pruebas de rendimiento", correct: false },
            { text: "Pruebas de seguridad", correct: false }
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
    saveEvaluation(score, questions.length);
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

document.getElementById('evaluation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const funcionalidad = parseFloat(document.getElementById('funcionalidad').value);
    const usabilidad = parseFloat(document.getElementById('usabilidad').value);
    const mantenibilidad = parseFloat(document.getElementById('mantenibilidad').value);
    const eficiencia = parseFloat(document.getElementById('eficiencia').value);
    const portabilidad = parseFloat(document.getElementById('portabilidad').value);

    const total = funcionalidad + usabilidad + mantenibilidad + eficiencia + portabilidad;
    const average = total / 5;

    const resultText = `Nombre: ${nombre}. Puntaje total: ${total.toFixed(2)} / 25. Puntaje promedio: ${average.toFixed(2)} / 5.`;
    document.getElementById('result').innerText = resultText;

    // Guardar en archivo de texto (simulado con localStorage, pero en realidad se guardaría en un archivo)
    const evaluationData = {
        nombre: nombre,
        funcionalidad: funcionalidad,
        usabilidad: usabilidad,
        mantenibilidad: mantenibilidad,
        eficiencia: eficiencia,
        portabilidad: portabilidad,
        total: total,
        average: average,
        timestamp: new Date().toISOString()
    };

    // Usar localStorage para simular, pero para archivo real necesitaríamos backend
    let evaluations = JSON.parse(localStorage.getItem('evaluations')) || [];
    evaluations.push(evaluationData);
    localStorage.setItem('evaluations', JSON.stringify(evaluations));

    // Opcional: Descargar como archivo JSON
    const dataStr = JSON.stringify(evaluationData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'evaluacion.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
});

function saveEvaluation(score, max) {
    const evaluations = JSON.parse(localStorage.getItem('evaluations')) || [];
    evaluations.push({ score, max, date: new Date().toISOString() });
    localStorage.setItem('evaluations', JSON.stringify(evaluations));
    // Also save to file if possible, but since it's client-side, localStorage is used
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

startQuiz();
