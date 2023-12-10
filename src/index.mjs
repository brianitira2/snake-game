import "./styles.css";

const playBoard = document.querySelector(".play-board");
const arrowControls = document.querySelector('.arrow-controls');

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 1, velocityY = 0;
let snakeBody = [];
let gameOver = false;
let score = 0;
let highScore = 0;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

changeFoodPosition();

const handleGameOver = () => {
  alert(`Game over! Your score is ${score}`);
  resetGame();
}

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  }
}

const changeDirectionFromControls = (direction) => {
  if (direction === 'up' && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (direction === 'down' && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (direction === 'left' && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (direction === 'right' && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

const initGame = () => {
  if (gameOver) return handleGameOver();

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    updateScore();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      break;
    }
  }

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
  }

  playBoard.innerHTML = htmlMarkup;
};

const updateScore = () => {
  const scoreElement = document.querySelector('.score');
  scoreElement.textContent = `Score: ${score}`;
  updateHighScore();
};

const resetGame = () => {
  snakeX = 5;
  snakeY = 10;
  velocityX = 1;
  velocityY = 0;
  snakeBody = [];
  gameOver = false;
  score = 0;
  updateScore();
  changeFoodPosition();
};

const updateHighScore = () => {
  if (score > highScore) {
    highScore = score;
    const highScoreElement = document.querySelector('.high-score');
    highScoreElement.textContent = `High Score: ${highScore}`;
  }
};

setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);

arrowControls.addEventListener('click', (event) => {
  if (event.target.classList.contains('arrow')) {
    const direction = event.target.id;
    changeDirectionFromControls(direction);
  }
});
