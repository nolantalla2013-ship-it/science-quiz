const questions = [
  {
    question: "What is the main source of energy for Earth?",
    answers: ["The Moon", "The Sun", "Volcanoes", "The wind"],
    correct: 1
  },
  {
    question: "What is the basic unit of life?",
    answers: ["Atom", "Organ", "Cell", "Tissue"],
    correct: 2
  },
  {
    question: "Which state of matter has a fixed shape?",
    answers: ["Solid", "Liquid", "Gas", "Vapor"],
    correct: 0
  },
  {
    question: "What force pulls objects toward Earth?",
    answers: ["Friction", "Magnetism", "Electricity", "Gravity"],
    correct: 3
  },
  {
    question: "What gas do plants absorb during photosynthesis?",
    answers: ["Oxygen", "Carbon dioxide", "Helium", "Hydrogen"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");

document.getElementById("start-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;

  startScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;

  showQuestion();
}

function showQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  progress.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = q.question;
  answersDiv.innerHTML = "";
  feedback.textContent = "";
  nextBtn.hidden = true;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    answersDiv.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];
  const buttons = answersDiv.querySelectorAll("button");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (selectedIndex === q.correct) {
    score++;
    feedback.textContent = "Correct! Great job!";
    feedback.style.color = "#16803d";
  } else {
    feedback.textContent =
      `Not quite! The correct answer is ${q.answers[q.correct]}.`;
    feedback.style.color = "#c0392b";
  }

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "See Results"
      : "Next Question";

  nextBtn.hidden = false;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  document.getElementById("final-score").textContent =
    `You scored ${score} out of ${questions.length}!`;
}
