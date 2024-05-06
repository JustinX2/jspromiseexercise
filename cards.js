const baseURL="https://deckofcardsapi.com/api/deck";
let deckId;
let remainingCards;

//creating a new deck of cards
function createDeck() {
  return $.getJSON(`${baseURL}/new/shuffle/`);
}

//drawing a single card
function drawCard() {
  return $.getJSON(`${baseURL}/${deckId}/draw/?count=1`);
}

//displaying the single card
function displayCard(card, elementId) {
  const cardArea = document.getElementById(elementId);
  const cardDiv = document.createElement("div");
  cardDiv.textContent = `${card.value} of ${card.suit}`;
  cardArea.appendChild(cardDiv);
}

function displayMessage(message, elementId) {
  const cardArea = document.getElementById(elementId);
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  cardArea.appendChild(messageDiv);
}

function handleDrawCardClick() {
  if (remainingCards > 0) {
    drawCard()
      .then(data => {
        displayCard(data.cards[0], "card-area");
        remainingCards = data.remaining;
        if (remainingCards === 0) {
          displayMessage("No more cards in the deck", "card-area");
        }
      })
      .catch(err => console.error("Error drawing card:", err));
  } else {
    displayMessage("No more cards in the deck", "card-area");
  }
}

$(document).ready(function() {
  //creating a new deck of cards
  createDeck()
    .then(data => {
      deckId = data.deck_id;
      remainingCards = data.remaining;
      $("#drawCardButton").on("click", handleDrawCardClick);
    })
    .catch(err => console.error("Error creating deck:", err));
});