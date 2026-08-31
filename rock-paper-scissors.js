// Initialize score object from localStorage or set default values
const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Initialize UI elements with default message
document.querySelector('.result').innerHTML = 'waiting for the game to begin';
document.querySelector('.score').innerHTML = 'waiting for the game to begin';
document.querySelector('.moves').innerHTML = 'waiting for the game to begin';

// Generate a random move (rock, paper, or scissors) for the computer
function randomMove() {
  const move = ['rock', 'paper', 'scissors'];
  return move[Math.floor(Math.random() * 3)];
}

// Main game logic: compares player move with computer move and updates score
function playGame(playerMove) {
  const computerMove = randomMove();
  let result;

  // Determine the outcome of the game
  if (playerMove === computerMove) {
    result = 'Tie';
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    result = 'You win';
  } else {
    result = 'You lose';
  }

  // Update the score object based on game result
  if (result === 'Tie') {
    score.ties++;
  }
  else if (result === 'You win') {
    score.wins++;
  }
  else {
    score.losses++;
  }

  // Persist the updated score to localStorage
  localStorage.setItem('score', JSON.stringify(score));

  // Update the webpage with the result, moves, and current score
  document.querySelector('.result').innerHTML = result;
  document.querySelector('.moves').innerHTML = ` You <img class="move-icon" src="/assets/${playerMove}.png">  <img class="move-icon" src="/assets/${computerMove}.png"> Computer`;
  document.querySelector('.score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses}  Ties: ${score.ties}`;
}

// Reset the score object, clear localStorage, and update UI with reset messages
function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  document.querySelector('.result').innerHTML = 'result has been reset';
  document.querySelector('.moves').innerHTML = 'moves has not been detected';
  document.querySelector('.score').innerHTML = 'score has been reset';
}