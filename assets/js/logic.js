// DOM Elements
const startButton = document.getElementById("start");
const timerDisplay = document.getElementById("time");
const questionTitle = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScoreDisplay = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackMessage = document.getElementById("feedback");

// User progress variables
let currentQuestionIndex = 0;
let countdownTimer;
let timeLeft = 75; // Initial time for the quiz
let userScore = 0;