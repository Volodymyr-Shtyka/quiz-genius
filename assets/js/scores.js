// DOM Elements
const highscoresList = document.getElementById("highscores");

/**
 * Updates and renders the highscores.
 */
function updateHighscores() {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    sortAndRenderHighscores(highscores);
}

function sortAndRenderHighscores(highscores) {
    console.log(highscores);
}

// Initially render highscores when the page loads
updateHighscores();