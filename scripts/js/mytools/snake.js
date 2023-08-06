// Get the canvas element
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var Score = document.getElementById("score");

// Game variables
var gridSize = 20; // Size of each grid cell
var gridWidth = canvas.width / gridSize;
var gridHeight = canvas.height / gridSize;

var isGameRunning = false; // Flag to track if the game is already running
var gameLoopTimeout; // Reference to the game loop timeout
var score = 0;

// Snake variables
var snake = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 0,
  cells: [],
  maxCells: 4,
};

// Food variables
var food = {
  x: 0,
  y: 0,
};

// Game loop
function gameLoop() {
  // Update game state
  update();

  // Render game state
  render();

  // Call the game loop again
  if (isGameRunning) {
    // Call the game loop again after a delay
    gameLoopTimeout = setTimeout(gameLoop, 100); // Adjust the delay (in milliseconds) as desired
  }
}

// Game initialization
function init() {
  // Initialize the snake
  snake.x = Math.floor(gridWidth / 2);
  snake.y = Math.floor(gridHeight / 2);
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = 1;
  snake.dy = 0;

  // Generate initial food position
  food.x = Math.floor(Math.random() * gridWidth);
  food.y = Math.floor(Math.random() * gridHeight);

  // Start the game loop
  gameLoop();
}

// Input handling
document.addEventListener("keydown", function (event) {
    // Get the key code
    var key = event.keyCode;
  
    // Change snake direction based on arrow keys
    if (key === 37 && snake.dx !== 1) {
      // Left arrow key
      snake.dx = -1;
      snake.dy = 0;
    } else if (key === 38 && snake.dy !== 1) {
      // Up arrow key
      snake.dx = 0;
      snake.dy = -1;
    } else if (key === 39 && snake.dx !== -1) {
      // Right arrow key
      snake.dx = 1;
      snake.dy = 0;
    } else if (key === 40 && snake.dy !== -1) {
      // Down arrow key
      snake.dx = 0;
      snake.dy = 1;
    }
  });

// Render function
function render() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the snake
    context.fillStyle = "#000";
    snake.cells.forEach(function (cell) {
      context.fillRect(cell.x * gridSize, cell.y * gridSize, gridSize, gridSize);
    });
  
    // Draw the food
    context.fillStyle = "#F00";
    context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }


// Update function
function update() {
    // Update snake position
    snake.x += snake.dx;
    snake.y += snake.dy;
  
    // Check for collisions with the wall
    if (snake.x < 0) {
        snake.x = gridWidth;
    }
    else if (snake.y < 0) {
        snake.y = gridHeight;
    }
    else if (snake.x >= gridWidth){
        snake.x = 0;
    }
    else if (snake.y >= gridHeight){
        snake.y = 0;
    }
  
    // Check for collisions with the food
    if (snake.x === food.x && snake.y === food.y) {
      // Increase snake length
      snake.maxCells++;
      score += 1;
      Score.innerText = "Score: " + score;
  
      // Generate new food position only when eaten
      generateFoodPosition();
    }
  
    // Update snake cells
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
  
    // Check for collisions with the snake's cells
    for (var i = 1; i < snake.cells.length; i++) {
      if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
        // Handle collision with snake's cells
        // Set game over message and reset game state
        alert("Game Over - Self collision!");
        // Reset game state
        resetGame();
        break;
      }
    }
  }

// Function to generate new food position
function generateFoodPosition() {
    var newX, newY;
    var isOnSnake;
  
    do {
      // Generate random coordinates
      newX = Math.floor(Math.random() * gridWidth);
      newY = Math.floor(Math.random() * gridHeight);
  
      // Check if the new position is on the snake
      isOnSnake = snake.cells.some(function (cell) {
        return cell.x === newX && cell.y === newY;
      });
    } while (isOnSnake);
  
    // Set the new food position
    food.x = newX;
    food.y = newY;
  }

// Start button element
var startButton = document.getElementById("startButton");

// Start button click event handler
startButton.addEventListener('click', function () {
    if (!isGameRunning) {
      startGame();
      isGameRunning = true;
    } else {
      restartGame();
    }
  });

// Function to start the game
function startGame() {
    // Reset game state
    resetGame();
  
    // Start the game loop
    gameLoop();
}

// Function to restart the game
function restartGame() {
    // Clear the game loop timeout if it exists
    if (gameLoopTimeout) {
      clearTimeout(gameLoopTimeout);
    }
  
    // Reset game state
    resetGame();
  
    // Start the game loop again
    gameLoop();
  }

// Function to reset the game state
function resetGame() {
    score = 0;
    snake.x = 0;
    snake.y = 0;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = 1;
    snake.dy = 0;
    food.x = Math.floor(Math.random() * gridWidth);
    food.y = Math.floor(Math.random() * gridHeight);
  }