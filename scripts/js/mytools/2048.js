var identifier = document.querySelector('.containers');
if (identifier .getAttribute('title') === null){
    identifier .setAttribute("title", "");

var gameBoard = document.getElementById("gameboard");
var cells = [];
var score = 0;

function initializeGame() {
    // Create the cells
    for (var i = 0; i < 4; i++) {
        cells[i] = [];
        for (var j = 0; j < 4; j++) {
            var cell = document.createElement("div");
            cell.className = "tile tile-0";
            cell.style.top = (i * 100) + "px";
            cell.style.left = (j * 100) + "px";
            gameBoard.appendChild(cell);
            cells[i][j] = {
                value: 0,
                element: cell
            };
        }
    }
    addRandomTile();
    updateScore();
}
function startNewGame() {
    // Remove all existing tiles
    gameBoard.innerHTML = "";
    // Re-initialize the game
    cells = [];
    score = 0;
    initializeGame();
}

function addRandomTile() {
    var emptyCells = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (cells[i][j].value === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        var randomIndex = Math.floor(Math.random() * emptyCells.length);
        var randomCell = emptyCells[randomIndex];
        var newValue = 2;
        cells[randomCell.x][randomCell.y].value = newValue;
        cells[randomCell.x][randomCell.y].element.className = "tile tile-" + newValue;
        cells[randomCell.x][randomCell.y].element.textContent = newValue;
    }
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;
}

function move(direction) {
    var moved = false;
    switch (direction) {
        case "up":
            for (var j = 0; j < 4; j++) {
                for (var i = 1; i < 4; i++) {
                    if (cells[i][j].value !== 0) {
                        for (var k = i; k > 0; k--) {
                            if (cells[k - 1][j].value === 0) {
                                cells[k - 1][j].value = cells[k][j].value;
                                cells[k][j].value = 0;
                                cells[k - 1][j].element.className = "tile tile-" + cells[k - 1][j].value;
                                cells[k - 1][j].element.textContent = cells[k - 1][j].value;
                                cells[k][j].element.className = "tile tile-0";
                                cells[k][j].element.textContent = "";
                                moved = true;
                            } else if (cells[k - 1][j].value === cells[k][j].value) {
                                cells[k - 1][j].value *= 2;
                                score += cells[k - 1][j].value;
                                cells[k][j].value = 0;
                                cells[k - 1][j].element.className = "tile tile-" + cells[k - 1][j].value;
                                cells[k - 1][j].element.textContent = cells[k - 1][j].value;
                                cells[k][j].element.className = "tile tile-0";
                                cells[k][j].element.textContent = "";
                                moved = true;
                            }
                        }
                    }
                }
            }
            break;
        case "down":
            for (var j = 0; j < 4; j++) {
                for (var i = 2; i >= 0; i--) {
                    if (cells[i][j].value !== 0) {
                        for (var k = i; k < 3; k++) {
                            if (cells[k + 1][j].value === 0) {
                                cells[k + 1][j].value = cells[k][j].value;
                                cells[k][j].value = 0;
                                cells[k + 1][j].element.className = "tile tile-" + cells[k + 1][j].value;
                                cells[k + 1][j].element.textContent = cells[k + 1][j].value;
                                cells[k][j].element.className = "tile tile-0";
                                cells[k][j].element.textContent = "";
                                moved = true;
                            } else if (cells[k + 1][j].value === cells[k][j].value) {
                                cells[k + 1][j].value *= 2;
                                score += cells[k + 1][j].value;
                                cells[k][j].value = 0;
                                cells[k + 1][j].element.className = "tile tile-" + cells[k + 1][j].value;
                                cells[k + 1][j].element.textContent = cells[k + 1][j].value;
                                cells[k][j].element.className = "tile tile-0";
                                cells[k][j].element.textContent = "";
                                moved = true;
                            }
                        }
                    }
                }
            }
            break;
        case "left":
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (cells[i][j].value !== 0) {
                        for (var k = j; k > 0; k--) {
                            if (cells[i][k - 1].value === 0) {
                                cells[i][k - 1].value = cells[i][k].value;
                                cells[i][k].value = 0;
                                cells[i][k - 1].element.className = "tile tile-" + cells[i][k - 1].value;
                                cells[i][k - 1].element.textContent = cells[i][k - 1].value;
                                cells[i][k].element.className = "tile tile-0";
                                cells[i][k].element.textContent = "";
                                moved = true;
                            } else if (cells[i][k - 1].value === cells[i][k].value) {
                                cells[i][k - 1].value *= 2;
                                score += cells[i][k - 1].value;
                                cells[i][k].value = 0;
                                cells[i][k - 1].element.className = "tile tile-" + cells[i][k - 1].value;
                                cells[i][k - 1].element.textContent = cells[i][k - 1].value;
                                cells[i][k].element.className = "tile tile-0";
                                cells[i][k].element.textContent = "";
                                moved = true;
                                }
                            }
                        }
                    }
                }
            break;
        case "right":
            for (var i = 0; i < 4; i++) {
                for (var j = 2; j >= 0; j--) {
                    if (cells[i][j].value !== 0) {
                        for (var k = j; k < 3; k++) {
                            if (cells[i][k + 1].value === 0) {
                                cells[i][k + 1].value = cells[i][k].value;
                                cells[i][k].value = 0;
                                cells[i][k + 1].element.className = "tile tile-" + cells[i][k + 1].value;
                                cells[i][k + 1].element.textContent = cells[i][k + 1].value;
                                cells[i][k].element.className = "tile tile-0";
                                cells[i][k].element.textContent = "";
                                moved = true;
                            } else if (cells[i][k + 1].value === cells[i][k].value) {
                                cells[i][k + 1].value *= 2;
                                score += cells[i][k + 1].value;
                                cells[i][k].value = 0;
                                cells[i][k + 1].element.className = "tile tile-" + cells[i][k + 1].value;
                                cells[i][k + 1].element.textContent = cells[i][k + 1].value;
                                cells[i][k].element.className = "tile tile-0";
                                cells[i][k].element.textContent = "";
                                moved = true;
                            }
                        }
                    }
                }
            }
        break;
    }
        if (moved) {
            addRandomTile();
            updateScore();
        }
}
// Add event listeners for the arrow keys
document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowUp":
            event.preventDefault();
            move("up");
            break;
        case "ArrowDown":
            event.preventDefault();
            move("down");
            break;
        case "ArrowLeft":
            event.preventDefault();
            move("left");
            break;
        case "ArrowRight":
            event.preventDefault();
            move("right");
            break;
    }
    });
  
// Save game data to local storage
function saveGame() {
    const gameData = {
      cells: cells,
      score: score
    };
    const gameDataString = JSON.stringify(gameData);
  
    // Prompt the user to save the game data as a file
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(new Blob([gameDataString], { type: "application/json" }));
    downloadLink.download = "gameData.json";
    downloadLink.click();
  }
  // Load game data to local storage
  function loadGameDataFromFile(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const gameDataString = e.target.result;
      const gameData = JSON.parse(gameDataString);

      // Restore the game state using the loaded data
      cells = gameData.cells;
      score = gameData.score;
      displayGame();
    };

    reader.readAsText(file);
  }

  function displayGame() {
    // Clear the existing game board
    gameBoard.innerHTML = "";

    // Create the cells and display their values
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = document.createElement("div");
            cell.className = "tile tile-" + cells[i][j].value;
            cell.style.top = (i * 100) + "px";
            cell.style.left = (j * 100) + "px";
            cell.textContent = cells[i][j].value;
            gameBoard.appendChild(cell);
            cells[i][j].element = cell;
        }
    }

    // Update the score
    updateScore();
}

  function handleFileSelection(event) {
    const file = event.target.files[0];
    loadGameDataFromFile(file);
  }


  // Attach event listeners to save and load buttons
  var saveGameButton = document.getElementById("save-button");
  saveGameButton.addEventListener("click", saveGame);
  var loadGameButton = document.getElementById("load-button");
  loadGameButton.addEventListener("click", function() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.addEventListener("change", handleFileSelection);
    fileInput.click();
  });

// Add event listener to the new game button
var newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", startNewGame);

startNewGame();
}