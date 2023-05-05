// // get the canvas and context
// let canvas = document.getElementById('game-canvas');
// let context = canvas.getContext('2d');

// // set up the game variables
// let snake = [{ x: 200, y: 200 }];
// let food = {};
// let direction = 'right';

// // generate a random position for the food
// // function generateFood() {
// //   food = {
// //     x: Math.floor(Math.random() * 39) * 10,
// //     y: Math.floor(Math.random() * 39) * 10,
// //   };

// //   // make sure the food isn't generated on the snake
// //   for (let i = 0; i < snake.length; i++) {
// //     if (food.x === snake[i].x && food.y === snake[i].y) {
// //       updateScore();
// //       generateFood();
// //       break;
// //     }
// //   }
// // }

// let score = 0;

// function updateScore() {
//   score++;
//   document.getElementById('score').innerHTML = `Score: ${score}`;
// }

// function generateFood() {
//   food = {
//     x: Math.floor(Math.random() * 39) * 10,
//     y: Math.floor(Math.random() * 39) * 10,
//   };
// }

// generateFood();

// // move the snake
// function moveSnake() {
//   let head = { x: snake[0].x, y: snake[0].y };

//   if (direction === 'right') {
//     head.x += 10;
//   } else if (direction === 'left') {
//     head.x -= 10;
//   } else if (direction === 'up') {
//     head.y -= 10;
//   } else if (direction === 'down') {
//     head.y += 10;
//   }

//   // check if the snake hits the wall or itself
//   if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
//     alert('Game Over');
//     return;
//   }

//   for (let i = 1; i < snake.length; i++) {
//     if (head.x === snake[i].x && head.y === snake[i].y) {
//       alert('Game Over');
//       return;
//     }
//   }

//   // check if the snake eats the food
//   if (head.x === food.x && head.y === food.y) {
//     generateFood();
//     updateScore();
//   } else {
//     snake.pop();
//   }

//   snake.unshift(head);

//   // draw the game
//   context.clearRect(0, 0, 400, 400);

//   context.fillStyle = 'green';
//   for (let i = 0; i < snake.length; i++) {
//     context.fillRect(snake[i].x, snake[i].y, 10, 10);
//   }

//   context.fillStyle = 'red';
//   context.fillRect(food.x, food.y, 10, 10);

//   // move the snake again after a delay
//   setTimeout(moveSnake, 100);
// }

// // listen for arrow key presses to change the direction of the snake
// document.addEventListener('keydown', function (event) {
//   if (event.key === 'ArrowRight' && direction !== 'left') {
//     direction = 'right';
//   } else if (event.key === 'ArrowLeft' && direction !== 'right') {
//     direction = 'left';
//   } else if (event.key === 'ArrowUp' && direction !== 'down') {
//     direction = 'up';
//   } else if (event.key === 'ArrowDown' && direction !== 'up') {
//     direction = 'down';
//   }
// });

// // start the game
// moveSnake();
// get the canvas and context
let canvas = document.getElementById('game-canvas');
let context = canvas.getContext('2d');

// set up the game variables
let snake = [{ x: 200, y: 200 }];
let food = {};
let direction = 'right';

// generate a random position for the food
let score = 0;

function updateScore() {
  score++;
  document.getElementById('score').innerHTML = `Score: ${score}`;
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

  if (direction === 'right') {
    head.x += 10;
  } else if (direction === 'left') {
    head.x -= 10;
  } else if (direction === 'up') {
    head.y -= 10;
  } else if (direction === 'down') {
    head.y += 10;
  }

  // check if the snake hits the wall or itself
  if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
    alert('Game Over');
    return;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert('Game Over');
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
  context.clearRect(0, 0, 400, 400);

  context.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    context.fillRect(snake[i].x, snake[i].y, 10, 10);
  }

  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, 10, 10);

  // move the snake again after a delay
  setTimeout(moveSnake, speed);
}

// listen for arrow key presses to change the direction of the snake
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  } else if (event.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (event.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (event.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  }
});

function adjustSpeed() {
  if (score % 5 === 0) {
    delay -= 5;
  }
}

let delay = 200;
// start the game
moveSnake();
