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

// Add event listener to the new game button
var newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", startNewGame);

startNewGame();
}