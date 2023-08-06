var canvas = document.getElementById('tetrisCanvas');
var context = canvas.getContext('2d');
var scale = 20;
var score = 0;

// Create a matrix representing the game board
function createMatrix(width, height) {
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

// Draw the game board
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'blue';
                context.fillRect((x + offset.x) * scale, (y + offset.y) * scale, scale, scale);
            }
        });
    });
}

// Merge the current piece into the game board matrix
function merge(matrix, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                matrix[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

// Check for a collision between the player and the game board
function collide(matrix, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (
                m[y][x] !== 0 && // Check if the player's cell is not empty
                (matrix[y + o.y] && matrix[y + o.y][x + o.x]) !== 0 // Check if the corresponding cell in the matrix is not empty
            ) {
                return true; // Collision detected
            }
        }
    }
    return false; // No collision
}

// Rotate the player's piece
function playerRotate(matrix, direction, player) {
    const pos = player.pos;
    const m = player.matrix;
    const len = m.length;
    const transposed = Array.from(Array(len), () => Array(len).fill(0));

    // Transpose the matrix
    for (let y = 0; y < len; y++) {
        for (let x = 0; x < len; x++) {
            transposed[x][y] = m[y][x];
        }
    }

    if (direction > 0) {
        // Reverse the rows
        transposed.forEach(row => row.reverse());
    } else {
        // Reverse the columns
        transposed.reverse();
    }

    // Check if the rotated matrix collides with the game boundaries or existing blocks
    if (!collide(matrix, { matrix: transposed, pos })) {
        player.matrix = transposed;
    }
}

// Move the player's piece
function playerMove(offset) {
    player.pos.x += offset;
    if (collide(matrix, player)) {
        player.pos.x -= offset;
    }
}

// Drop the player's piece by one row
function playerDrop() {
    player.pos.y++;
    if (collide(matrix, player)) {
        player.pos.y--;
        merge(matrix, player);
        playerReset();
        arenaSweep(); // Check for completed rows and update the score
    }
    dropCounter = 0;
}

// Reset the player's piece to a new random piece
function playerReset() {
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
    player.pos.y = 0;
    player.pos.x = Math.floor(matrix[0].length / 2) - Math.floor(player.matrix[0].length / 2);
    if (collide(matrix, player)) {
        matrix.forEach(row => row.fill(0));
        // Game over condition
        alert("Game over!");
    }
}

// Create a new piece based on the specified type
function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0 ,0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

// Clear completed rows from the game board
function arenaSweep() {
    outer: for (let y = matrix.length - 1; y >= 0; --y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] === 0) {
                continue outer;
            }
        }
        const row = matrix.splice(y, 1)[0].fill(0);
        matrix.unshift(row);
        y++;
        // Increment the player's score
        score += 10;
    }
}


var dropCounter = 0;
var dropInterval = 1000;

var lastTime = 0;
function update(time = 0) {
    document.removeEventListener('keydown', handleKeyPress);
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
        dropCounter = 0;
    }
    document.addEventListener('keydown', handleKeyPress);
    draw();
    requestAnimationFrame(update);
}

// Draw the game
function draw() {
    context.fillStyle = '#FFF'; // Change the background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);

    var Score = document.getElementById('score');
    Score.innerText = "Score: " + score;

    drawMatrix(matrix, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}

// Handle keyboard events
function handleKeyPress(event) {
    if (event.keyCode === 37) { // Left arrow key
        playerMove(-1); // Move left by 1 unit
    } else if (event.keyCode === 39) { // Right arrow key
        playerMove(1); // Move right by 1 unit
    } else if (event.keyCode === 40) { // Down arrow key
        playerDrop(); // Move down by 1 unit
    } else if (event.keyCode === 38) { // Up arrow key
        playerRotate(matrix, 1, player); // Rotate the player's piece
    }
}

var matrix = createMatrix(12, 20);

var player = {
    pos: { x: 0, y: 0 },
    matrix: null,
};

// Add a click event listener to the start button
document.getElementById('startButton').addEventListener('click', () => {
    startGame();
});
// Function to start the game
var isGameRunning = false;

// Function to start the game
function startGame() {
    // Reset the game state
    matrix.forEach(row => row.fill(0));
    playerReset();

    // Start the game update loop
    isGameRunning = true;
    update();
}