// DOM Elements
const highscoresList = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");

// Event listener for Clear Highscores button
clearBtn.addEventListener("click", handleClearHighscores);

/**
 * Handles the click event on the Clear Highscores button.
 */
function handleClearHighscores() {
    localStorage.removeItem("highscores");
    updateHighscores();
}

/**
 * Updates and renders the highscores.
 */
function updateHighscores() {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    sortAndRenderHighscores(highscores);
}

/**
 * Sorts and renders the highscores list.
 * @param {Array} highscores - The array containing highscore objects.
 */
function sortAndRenderHighscores(highscores) {
    highscores.sort((a, b) => b.score - a.score);
    highscoresList.innerHTML = "";

    highscores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${score.initials} - ${score.score}`;
        highscoresList.appendChild(listItem);
    });
}

// Initially render highscores when the page loads
updateHighscores();