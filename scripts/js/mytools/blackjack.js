// Card variables
var path = location.origin + "/terrence_world/img/cards/";
var suits = ["hearts", "clubs", "diamonds", "spades"];
var values = [
  "ace", "king", "queen", "jack",
  "10", "9", "8", "7",
  "6", "5", "4", "3", "2"
];
var points = [
  11, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2
];

// DOM variables
var playerHandElement = document.getElementById("player-hand");
var dealerHandElement = document.getElementById("dealer-hand");
var playerPointsElement = document.getElementById("player-points");
var dealerPointsElement = document.getElementById("dealer-points");
var messageElement = document.getElementById("win_message");
var startButton = document.getElementById("start-button");
var hitButton = document.getElementById("hit-button");
var standButton = document.getElementById("stand-button");

// Game variables
var deck = [];
var playerHand = [];
var dealerHand = [];
var playerPoints = 0;
var dealerPoints = 0;
var gameOver = false;

// Helper function to create a new deck of cards
function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx],
        point: points[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

// Helper function to calculate the total points in a hand
function calculatePoints(hand) {
    let total_point = 0;
    let hasAce = false;

    for (let i = 0; i < hand.length; i++) {
        let card = hand[i];
        total_point += card.point;
        if (card.value === "ace") {
          hasAce = true;
        }
    }
    if (hasAce && total_point > 21) {
      total_point -= 10; // Deduct 10 if there's an Ace and points exceed 21
    }
    return total_point;
}

// Helper function to deal a random card from the deck
function dealCard() {
  let randomIdx = Math.floor(Math.random() * deck.length);
  return deck.splice(randomIdx, 1)[0];
}

// Function to start a new game
function startGame() {
    deck = createDeck();
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
    playerPoints = calculatePoints(playerHand);
    dealerPoints = calculatePoints(dealerHand);
    gameOver = false;

    playerHandElement.innerHTML = getPlayerHandHtml();
    dealerHandElement.innerHTML = getDealerHandHtml();
    playerPointsElement.textContent = "Player's Points: " + playerPoints;
    dealerPointsElement.textContent = "Dealer's Points: " + dealerPoints;
    messageElement.textContent = "";
    messageElement.classList.remove("win", "loss", "tie");
    enableButtons();
}

// Function to get the HTML representation of the player's hand
function getPlayerHandHtml() {
  let handHtml = "";
  for (let i = 0; i < playerHand.length; i++) {
    handHtml += `<img src="${path}${playerHand[i].value}_of_${playerHand[i].suit}.png" alt="${playerHand[i].value} of ${playerHand[i].suit}" class="card">`;
  }
  return handHtml;
}

// Function to get the HTML representation of the dealer's hand
function getDealerHandHtml() {
  let handHtml = "";
  for (let i = 0; i < dealerHand.length; i++) {
    handHtml += `<img src="${path}${dealerHand[i].value}_of_${dealerHand[i].suit}.png" alt="${dealerHand[i].value} of ${dealerHand[i].suit}" class="card">`;
  }
  return handHtml;
}

// Function to enable game buttons
function enableButtons() {
  startButton.disabled = true;
  hitButton.disabled = false;
  standButton.disabled = false;
}

// Function to disable game buttons
function disableButtons() {
  startButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
}

// Function to handle the player's hit action
function hit() {
  if (gameOver) {
    return;
  }
  let card = dealCard();
  playerHand.push(card);
  playerPoints = calculatePoints(playerHand);
  playerHandElement.innerHTML = getPlayerHandHtml();
  playerPointsElement.textContent = "Player's Points: " + playerPoints;

  if (playerPoints > 21) {
    gameOver = true;
    messageElement.textContent = "You Busted! Dealer Wins.";
    messageElement.classList.add("loss");
    disableButtons();
  }
}

// Function to handle the player's stand action
function stand() {
  if (gameOver) {
    return;
  }

  while (dealerPoints < 17) {
    let card = dealCard();
    dealerHand.push(card);
    dealerPoints = calculatePoints(dealerHand);
    dealerHandElement.innerHTML = getDealerHandHtml();
    dealerPointsElement.textContent = "Dealer's Points: " + dealerPoints;
  }

  gameOver = true;

  if (dealerPoints > 21 || playerPoints > dealerPoints) {
    messageElement.textContent = "You Win!";
    messageElement.classList.add("win");
  } else if (dealerPoints > playerPoints) {
    messageElement.textContent = "Dealer Wins!";
    messageElement.classList.add("loss");
  } else {
    messageElement.textContent = "It's a Tie!";
    messageElement.classList.add("tie");
  }

  disableButtons();
}

// // Event listeners for game buttons
// console.log("run2");
// startButton.removeEventListener("click", startGame);
// startButton.addEventListener("click", startGame);

// hitButton.removeEventListener("click", hit);
// hitButton.addEventListener("click", hit);

// standButton.removeEventListener("click", stand);
// standButton.addEventListener("click", stand);
