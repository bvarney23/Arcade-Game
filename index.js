let gameState = {
    gameBoard: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
    currentPlayerName: "",
    currentPlayerNameTwo: "",
    winningConditions: [],
}
let currentPlayer = "X";
let gameRunning = false;

// Create HTML board using JS

let gameBoardContainer = document.getElementById("game-board");

function renderGame () {
    for (let numOfRowsMade = 0; numOfRowsMade < gameState.gameBoard.length; numOfRowsMade++) {
        let newRowElement = document.createElement("div");
        newRowElement.classList.add("row");
        let currentJSRow = gameState.gameBoard[numOfRowsMade];
    
        for (let numOfCellsMade = 0; numOfCellsMade < currentJSRow.length; numOfCellsMade++) {
            let newCellElement = document.createElement("div");
            newCellElement.classList.add("cell");
            
            if (currentJSRow[numOfCellsMade] != null) {
                newCellElement.textContent = currentJSRow[numOfCellsMade];
            } else {
                newCellElement.textContent = "Empty"
            }

            newRowElement.appendChild(newCellElement)
        }
    
        gameBoardContainer.appendChild(newRowElement);

    }
    // click on cell to place X or O
    let cellElements = document.getElementsByClassName("cell");

    for (let i = 0; i < cellElements.length; i++) {
        let cell = cellElements[i]

    cell.addEventListener("click", clickCell)
}
};

document.addEventListener("DOMContentLoaded", renderGame)



// Fill in Player One

let nameInputElement = document.getElementById("name-input");

let submitButtonElement = document.getElementById("submit");
let displayNameElement = document.getElementById("displayed-name");

function displayNamePlayerOne() {
    let playerOneName = nameInputElement.value;
    gameState.currentPlayerName = playerOneName;

    displayNameElement.textContent = `Player One: ${gameState.currentPlayerName}`;
}

document.addEventListener("click", displayNamePlayerOne);

// Fill in Player Two

let nameInputElementTwo = document.getElementById("name-input-two");

let submitButtonElementTwo = document.getElementById("submit-two");
let displayNameElementTwo = document.getElementById("displayed-name-two");

function displayNamePlayerTwo() {
    let playerTwoName = nameInputElementTwo.value;
    gameState.currentPlayerNameTwo = playerTwoName;

    displayNameElementTwo.textContent = `Player Two: ${gameState.currentPlayerNameTwo}`;
}

document.addEventListener("click", displayNamePlayerTwo);

// Set winning conditions

function winningConditions() {

}

function clickCell (event) {
    let cell = event.target
    cell.textContent = currentPlayer
        changePlayer()
}

// Change between X and O
let turnText = document.getElementById("turn-tracker")

function changePlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
    turnText.textContent = `${currentPlayer}'s turn`
}
// console.log(changePlayer())

// Check for winners

function checkWinner() {

}

// Reset the board