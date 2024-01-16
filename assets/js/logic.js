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

// Event listener for the start button
startButton.addEventListener("click", beginQuiz);

// Event listener for the choices container
choicesContainer.addEventListener("click", handleChoiceSelection);

// Event listener for the submit button
submitButton.addEventListener("click", recordUserScore);

/**
 * Initiates the quiz when the start button is clicked.
 */
function beginQuiz() {
    startButton.parentElement.classList.add("hide");
    document.getElementById("questions").classList.remove("hide");
    countdownTimer = setInterval(updateTimer, 1000);
    displayCurrentQuestion();
}

/**
 * Displays the current question.
 */
function displayCurrentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.title;
    choicesContainer.innerHTML = "";

    // Create buttons for each choice
    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.setAttribute("data-index", index);
        choicesContainer.appendChild(choiceButton);
    });
}

/**
 * Handles the click event on choices.
 * @param {Event} event - The click event.
 */
function handleChoiceSelection(event) {
    if (event.target.matches("button")) {
        const selectedChoiceIndex = parseInt(event.target.getAttribute("data-index"));
        assessUserAnswer(selectedChoiceIndex);
    }
}

/**
 * Checks the selected answer and updates the score and feedback.
 * @param {number} selectedChoiceIndex - The index of the selected answer.
 */
function assessUserAnswer(selectedChoiceIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedChoiceIndex === currentQuestion.choices.indexOf(currentQuestion.answer)) {
        userScore += 10;
        feedbackMessage.innerText = "Correct!";
    } else {
        timeLeft -= 10;
        feedbackMessage.innerText = "Wrong!";
    }

    // Display the feedback message
    feedbackMessage.classList.remove("hide");

    // Set a timeout to hide the feedback message after 1 second
    setTimeout(function () {
        feedbackMessage.classList.add("hide");
    }, 1000); // 1000 milliseconds = 1 second

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayCurrentQuestion();
    } else {
        endQuiz();
    }
}

/**
 * Ends the quiz and displays the final score.
 */
function endQuiz() {
    clearInterval(countdownTimer);
    document.getElementById("questions").classList.add("hide");
    endScreen.classList.remove("hide");
    finalScoreDisplay.textContent = userScore;
}

/**
 * Updates the timer, ensures time is not negative, and ends the quiz if needed.
 */
function updateTimer() {
    timeLeft--;

    // Ensure time is not negative
    if (timeLeft < 0) {
        timeLeft = 0;
    }

    if (timeLeft === 0 || currentQuestionIndex >= questions.length) {
        endQuiz();
    }

    timerDisplay.textContent = timeLeft;
}

/**
 * Saves the user's score and redirects to the highscores page.
 */
function recordUserScore() {
    const userInitials = initialsInput.value.trim();

    if (userInitials !== "") {
        const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        highscores.push({initials: userInitials, score: userScore});
        localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "highscores.html";
    } else {
        alert("Please enter your initials.");
    }
}