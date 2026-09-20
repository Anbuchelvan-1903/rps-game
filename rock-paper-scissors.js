// Initialize score object from localStorage or set default values
const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// Initialize UI elements with default message
document.querySelector(".result").innerHTML = "Let's play ";
document.querySelector(".moves").innerHTML =
  ` You <img title="Your-move" class="move-icon" src="assets/question-mark.png">  <img title="Computer-move" class="move-icon" src="assets/question-mark.png"> Computer`;
document.querySelector(".score").innerHTML =
  `Wins: ${score.wins} Losses: ${score.losses}  Ties: ${score.ties}`;

// Generate a random move (rock, paper, or scissors) for the computer
function randomMove() {
  const move = ["rock", "paper", "scissors"];
  return move[Math.floor(Math.random() * 3)];
}

//This block replace onclick in html and stops manual playing while autoplaying
const rockBtn = document.querySelector(".js-rockBtn");
rockBtn.addEventListener("click", () => {
  if (isAutoplay === false) {
    playGame("rock");
  } else alert(`While Autoplaying ,Player can't play manually`);
});
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "r") {
    rockBtn.click();
  }
});
const paperBtn = document.querySelector(".js-paperBtn");
paperBtn.addEventListener("click", () => {
  if (isAutoplay === false) {
    playGame("paper");
  } else alert(`While Autoplaying ,Player can't play manually`);
});
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "p") {
    paperBtn.click();
  }
});
const scissorsBtn = document.querySelector(".js-scissorsBtn");
scissorsBtn.addEventListener("click", () => {
  if (isAutoplay === false) {
    playGame("scissors");
  } else alert(`While Autoplaying ,Player can't play manually`);
});
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "s") {
    scissorsBtn.click();
  }
});


// Main game logic: compares player move with computer move and updates score
function playGame(playerMove) {
  const computerMove = randomMove();
  let result;

  // Determine the outcome of the game
  if (playerMove === computerMove) {
    result = "Tie";
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win";
  } else {
    result = "You lose";
  }

  // Update the score object based on game result
  if (result === "Tie") {
    score.ties++;
  } else if (result === "You win") {
    score.wins++;
  } else {
    score.losses++;
  }

  // Persist the updated score to localStorage
  localStorage.setItem("score", JSON.stringify(score));

  // Update the webpage with the result, moves, and current score
  document.querySelector(".result").innerHTML = result;
  document.querySelector(".moves").innerHTML =
    ` You <img title="Your-move" class="move-icon" src="assets/${playerMove}.png">  <img title="Computer-move"   class="move-icon" src="assets/${computerMove}.png"> Computer`;
  document.querySelector(".score").innerHTML =
    `Wins: ${score.wins} Losses: ${score.losses}  Ties: ${score.ties}`;
}

// Reset the score object, clear localStorage, and update UI with reset messages

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  reset();
});

function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  document.querySelector(".result").innerHTML = "Let's play again";
  document.querySelector(".moves").innerHTML =
    ` You <img title="Your-move" class="move-icon" src="assets/question-mark.png">  <img title="Computer-move" class="move-icon" src="assets/question-mark.png"> Computer`;
  document.querySelector(".score").innerHTML =
    `Wins: ${score.wins} Losses: ${score.losses}  Ties: ${score.ties}`;

  // Stop autoplay and restore the button to its default state.
  clearInterval(intervalId);
  isAutoplay = false;
  autoPlayBtn.innerHTML = "AutoPlay";
  autoPlayBtn.style.background = "hsl(165, 100%, 40%)";
}

// Toggle automatic gameplay, running a random move every second until stopped or reset.

const autoPlayBtn = document.querySelector(".autoplay-btn");
autoPlayBtn.addEventListener("click", () => {
  autoPlay();
});

let isAutoplay = false;
let intervalId;

function autoPlay() {
  autoPlayBtn.innerHTML = "Stop AutoPlay";
  autoPlayBtn.style.background = "hsla(0, 100%, 50%, 0.75)";
  if (!isAutoplay) {
    intervalId = setInterval(() => {
      let playerMove = randomMove();
      playGame(playerMove);
    }, 1000);
    isAutoplay = true;
  } else {
    autoPlayBtn.innerHTML = "AutoPlay";
    autoPlayBtn.style.background = "hsl(165, 100%, 40%)";
    clearInterval(intervalId);
    isAutoplay = false;
  }
}
