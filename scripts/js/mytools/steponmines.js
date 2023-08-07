// Game settings
var gridSize = 10; // Size of the game grid
var numMines = 10; // Number of mines

// Game state
var gameboard = []; // Represents the game grid
var gameOver = false; // Flag to indicate if the game is over

// Create the game grid
function createGameboard() {
    const gameboardElement = document.getElementById("gameboard");
    gameboardElement.innerHTML = "";
    for (let i = 0; i < gridSize; i++) {
        gameboard[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleCellClick);
            cell.addEventListener("contextmenu", handleCellClick);
            gameboardElement.appendChild(cell);
            gameboard[i][j] = { isMine: false, isRevealed: false, isFlagged: false };
        }
    }
    placeMines();
}

// Place mines randomly on the game grid
function placeMines() {
    let minesPlaced = 0;

    while (minesPlaced < numMines) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        if (!gameboard[row][col].isMine) {
        gameboard[row][col].isMine = true;
        minesPlaced++;
        }
    }
}

// Handle cell click event
function handleCellClick(event) {
    event.preventDefault(); // Prevent default behavior of the right mouse button
    if (gameOver) {
        return;
    }
  
    const row = Number(event.target.dataset.row);
    const col = Number(event.target.dataset.col);
  
    if (event.button === 2) { // Check if right mouse button is clicked
        markCellAsTrap(row, col);
    } else {
        const cell = gameboard[row][col];
        if (cell.isFlagged) {
            return; // Prevent left-clicking on a flagged cell
        }

        if (cell.isMine) {
            handleMineClick(row, col);
        } else {
            revealCell(row, col);
        }
    }
    checkWin();
 }

  // Handle mine click event
function handleMineClick(row, col) {
    gameOver = true;
    revealMines();
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cell.innerHTML = "💣"; // Add the bomb icon
    cell.classList.add("mine-cell");
    alert("Game Over! You clicked on a mine.");
  }

// Mark a cell as a trap
function markCellAsTrap(row, col) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

    if (!gameboard[row][col].isRevealed) {
        if (cell.classList.contains("flagged")) {
            // Unmark the cell if already flagged
            cell.classList.remove("flagged");
            gameboard[row][col].isFlagged = false;
        } else {
            // Mark the cell as a trap
            cell.classList.add("flagged");
            gameboard[row][col].isFlagged = true;
        }
    }
}

// Reveal a cell
function revealCell(row, col) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (!gameboard[row][col].isRevealed) {
        gameboard[row][col].isRevealed = true;
        cell.classList.add("revealed");

        if (!gameboard[row][col].isMine) {
            const count = countAdjacentMines(row, col);
            if (count > 0) {
                cell.textContent = count;
                cell.classList.add(`adjacent-${count}`);
            } else {
                revealAdjacentCells(row, col);
            }
        }
    }
}

// Reveal adjacent cells recursively
function revealAdjacentCells(row, col) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;

            if (isValidCell(newRow, newCol) && !gameboard[newRow][newCol].isRevealed) {
                revealCell(newRow, newCol);
            }
        }
    }
}

// Count the number of adjacent mines
function countAdjacentMines(row, col) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (isValidCell(newRow, newCol) && gameboard[newRow][newCol].isMine) {
                count++;
            }
        }
    }
  return count;
}

// Check if the cell coordinates are valid
function isValidCell(row, col) {
    return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
}

// Reveal all mines
function revealMines() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (gameboard[i][j].isMine) {
                const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
                cell.classList.add("mine");
            }
        }
    }
}

// Check if the player has won the game
function checkWin() {
    let numCellsRevealed = 0;
  
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (gameboard[i][j].isRevealed) {
          numCellsRevealed++;
        }
      }
    }
  
    if (numCellsRevealed === gridSize * gridSize - numMines) { // Correct win condition
      gameOver = true;
      alert("Congratulations! You won the game!");
    }
  }



// Prevent context menu from appearing on the gameboard
document.getElementById("gameboard").addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

// Restart the game
function restartGame() {
  gameOver = false;
  createGameboard();
}

// Initialize the game
function initGame() {

  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", restartGame);
  createGameboard();
}

// Start the game
initGame();