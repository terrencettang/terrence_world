var identifier = document.querySelector('#game-area');
if (identifier .getAttribute('title') === null){
    identifier .setAttribute("title", "");

// Get spaceship and game area elements
var spaceship = document.getElementById('spaceship');
var gameArea = document.getElementById('game-area');
var startButton = document.getElementById('start-button');

var asteroidSpeed = 1; // Initial speed

// Flag to track game over state
let gameOver = false;

var asteroidCreationInterval = null;
var asteroidInterval = 2000;

// Set up event listener for spaceship movement
document.addEventListener('keydown', handleKeyPress);

// Variables to store spaceship position
var spaceshipX = gameArea.offsetWidth / 2;
var spaceshipY = gameArea.offsetHeight - spaceship.offsetHeight - 10;
spaceship.style.left = spaceshipX + 'px';
spaceship.style.top = spaceshipY + 'px';

// Function to handle spaceship movement
function handleKeyPress(event) {
    const key = event.key;
    const stepSize = 10;

    // Move spaceship left or right
    if (key === 'ArrowLeft') {
        spaceshipX -= stepSize;
        if (spaceshipX < spaceship.offsetWidth/2) spaceshipX = spaceship.offsetWidth/2;
    } else if (key === 'ArrowRight') {
        spaceshipX += stepSize;
        if (spaceshipX > gameArea.offsetWidth - spaceship.offsetWidth/2) spaceshipX = gameArea.offsetWidth - spaceship.offsetWidth/2;
    }

    // Move spaceship up or down
    if (key === 'ArrowUp') {
        spaceshipY -= stepSize;
        if (spaceshipY < 0) spaceshipY = 0;
    } else if (key === 'ArrowDown') {
        spaceshipY += stepSize;
        if (spaceshipY > gameArea.offsetHeight - spaceship.offsetHeight) spaceshipY = gameArea.offsetHeight - spaceship.offsetHeight;
    }

    spaceship.style.left = spaceshipX + 'px';
    spaceship.style.top = spaceshipY + 'px';
}
// Function to create a new asteroid
function createAsteroid(asteroidSpeed) {
    if (gameOver) {
        return; // Stop creating asteroids if the game is over
    }
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');

    // Set random position and speed for the asteroid
    const asteroidX = Math.random() * (gameArea.offsetWidth);
    if (asteroidX < spaceship.offsetWidth / 2){
        asteroidX = spaceship.offsetWidth / 2
    } else if (asteroidX > gameArea.offsetWidth - spaceship.offsetWidth/2){
        asteroidX = gameArea.offsetWidth - spaceship.offsetWidth/2;
    }

    asteroid.style.left = asteroidX + 'px';

    // Function to move the asteroid downwards
    function moveAsteroid() {
        const asteroidY = asteroid.offsetTop + asteroidSpeed;
        asteroid.style.top = asteroidY + 'px';

        // Check collision with spaceship
        if (collisionCheck(asteroid, spaceship)) {
            endGame();
        }

        // Check if asteroid reached the bottom
        if (asteroidY >= gameArea.offsetHeight) {
            asteroid.remove();
        } else {
            requestAnimationFrame(moveAsteroid);
        }
    }
    // Start moving the asteroid
    requestAnimationFrame(moveAsteroid);

    // Append the asteroid to the game area
    gameArea.appendChild(asteroid);
}

// Function to check collision between two elements
function collisionCheck(circle1, circle2) {
    // Get the coordinates and dimensions of the first circle
    const circle1Rect = circle1.getBoundingClientRect();
    const circle1X = circle1Rect.left + circle1Rect.width / 2;
    const circle1Y = circle1Rect.top + circle1Rect.height / 2;
    const circle1Radius = circle1Rect.width / 2;

    // Get the coordinates and dimensions of the second circle
    const circle2Rect = circle2.getBoundingClientRect();
    const circle2X = circle2Rect.left + circle2Rect.width / 2;
    const circle2Y = circle2Rect.top + circle2Rect.height / 2;
    const circle2Radius = circle2Rect.width / 2;

    // Calculate the distance between the centers of the two circles
    const deltaX = circle2X - circle1X;
    const deltaY = circle2Y - circle1Y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Check if the distance is less than the sum of the radii
    if (distance < circle1Radius + circle2Radius) {
        return true; // Collision detected
    } else {
        return false; // No collision
    }
}

// Function to end the game
function endGame() {
    gameStarted = false;
    gameOver = true;
    alert('Game Over!');
    startButton.disabled = false;
    // Remove all asteroids from the game area and the DOM
    const asteroids = document.getElementsByClassName('asteroid');
    while (asteroids.length > 0) {
        asteroids[0].parentNode.removeChild(asteroids[0]);
    }
}

// Variables to store game state and timer
var gameStarted = false;
var startTime = null;
var elapsedTimeElement = document.getElementById('elapsedTime');

// Function to restart the game
function startGame() {
    gameStarted = true;
    startTime = null;
    startTime = new Date().getTime();
    gameOver = false;
    startButton.disabled = true;
    spaceshipX = gameArea.offsetWidth / 2;
    spaceshipY = gameArea.offsetHeight - spaceship.offsetHeight - 10;
    spaceship.style.left = spaceshipX + 'px';
    spaceship.style.top = spaceshipY + 'px';

    elapsedTimeElement.textContent = 0;
    setInterval(updateGame, 1000);
}

// Function to update the game
function updateGame() {
    if (gameStarted) {
      // Calculate elapsed time in seconds
      const currentTime = new Date().getTime();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  
      // Update the game with the elapsed time
      elapsedTimeElement.textContent = elapsedTime;
      // Update the game with the elapsed time
        updateDifficulty(elapsedTime);
    }
    if (gameOver) {
        return;
    }
  }

  // Function to update the difficulty level based on elapsed time
function updateDifficulty(elapsedTime) {
    // Increase the difficulty level over time
    if (elapsedTime >= 0 && elapsedTime < 10) {
        asteroidSpeed = 1;
    } else if (elapsedTime >= 10 && elapsedTime < 20) {
        asteroidSpeed = 2; 
    } else if (elapsedTime >= 20 && elapsedTime < 30) {
        asteroidSpeed = 3;
    } else if (elapsedTime >= 30 && elapsedTime < 40) {
        asteroidSpeed = 4;
    } else if (elapsedTime >= 40 && elapsedTime < 50) {
        asteroidSpeed = 5;
    } else if (elapsedTime >= 50 && elapsedTime < 60) {
        asteroidSpeed = 6;
    } else if (elapsedTime >= 60 && elapsedTime < 70) {
        asteroidSpeed = 7;
    } else if (elapsedTime >= 70 && elapsedTime < 80) {
        asteroidSpeed = 8;
    } else{
        asteroidSpeed = 9;
    }
    
    // Adjust the game elements and logic based on the difficulty level
    // Additional code to update game difficulty...
  
    // Adjust the interval for creating asteroids based on the difficulty level
    asteroidInterval = 2000 / asteroidSpeed;
    clearInterval(asteroidCreationInterval);
    asteroidCreationInterval = setInterval(createAsteroid(asteroidSpeed), asteroidInterval);
  }

// Add event listener for restart button
startButton.addEventListener('click', startGame);
}