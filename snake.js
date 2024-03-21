// get the canvas and context
let canvas = document.getElementById("game-canvas");
let context = canvas.getContext("2d");

// set up the game variables
let snake = [{ x: 200, y: 200 }];
let food = {};
let direction = "right";
let canvasSize = {
  height: 400,
  width: 400,
};

// generate a random position for the food
let score = 0;

function updateScore() {
  score++;
  document.getElementById("score").innerHTML = `Score: ${score}`;
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * 39) * 10,
    y: Math.floor(Math.random() * 39) * 10,
  };
}

generateFood();

// move the snake
let speed = 100;
function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "right") {
    head.x += 10;
  } else if (direction === "left") {
    head.x -= 10;
  } else if (direction === "up") {
    head.y -= 10;
  } else if (direction === "down") {
    head.y += 10;
  }

  // check if the snake hits the wall or itself
  if (
    head.x < 0 ||
    head.x >= canvasSize.width ||
    head.y < 0 ||
    head.y >= canvasSize.height
  ) {
    alert("Game Over");
    return;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert("Game Over");
      return;
    }
  }

  // check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    generateFood();
    updateScore();
    adjustSpeed(); // decrease the speed after each food is eaten
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // draw the game
  context.clearRect(0, 0, canvasSize.height, canvasSize.width);

  context.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    context.fillRect(snake[i].x, snake[i].y, 10, 10);
  }

  context.fillStyle = "red";
  context.fillRect(food.x, food.y, 10, 10);

  // move the snake again after a delay
  setTimeout(moveSnake, speed);
}

const handleMovement = (event, value = undefined) => {
  if (
    (event?.key === "ArrowRight" || value === "ArrowRight") &&
    direction !== "left"
  ) {
    direction = "right";
  } else if (
    (event?.key === "ArrowLeft" || value === "ArrowLeft") &&
    direction !== "right"
  ) {
    direction = "left";
  } else if (
    (event?.key === "ArrowUp" || value === "ArrowUp") &&
    direction !== "down"
  ) {
    direction = "up";
  } else if (
    (event?.key === "ArrowDown" || value === "ArrowDown") &&
    direction !== "up"
  ) {
    direction = "down";
  }
};

const controllers = document.querySelectorAll(".controllers");

controllers.forEach((controller) => {
  controller.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      handleMovement(undefined, event.target.parentNode.ariaLabel);
    } else handleMovement(undefined, event.target.ariaLabel);
  });
});

// listen for arrow key presses to change the direction of the snake
document.addEventListener("keydown", function (event) {
  handleMovement(event);
});

function adjustSpeed() {
  if (score % 5 === 0) {
    delay -= 5;
  }
}

let delay = 200;
// start the game
moveSnake();
