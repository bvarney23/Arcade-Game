let gameState = {
    gameBoard: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
    currentPlayerName: "",
    currentPlayerNameTwo: "",
}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentPlayer = "X";

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
                newCellElement.textContent = "";
            }

            newRowElement.appendChild(newCellElement);
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


function clickCell (event) {
    let cell = event.target

    if (cell.textContent == ""){
        cell.textContent = currentPlayer
        changePlayer()
    } else {
        return
}
}

let turnText = document.getElementById("turn-tracker")

function changePlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
    turnText.textContent = `${currentPlayer}'s turn`
}

// Check for winners

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++){
        let condition = winningConditions[i];
        let cellElementsA = cell.textContent[condition[0]];
        let cellElementsB = cell.textContent[condition[1]];
        let cellElementsC = cell.textContent[condition[2]];

        if(cellElementsA == " " || cellElementsB == " " || cellElementsC == " "){
            continue;
        }
        if(cellElementsA == cellElementsB && cellElementsB == cellElementsC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        turnText.textContent = `${currentPlayer} wins!`;
    }
    else if(!gameState.gameBoard.includes(" ")){
        turnText.textContent = `Draw!`;
    }
    else{
        changePlayer();
    }
}

// Reset the board
let resetButton = document.getElementById("reset")


function restartGame() {
    currentPlayer = "X";
    turnText.textContent = `${currentPlayer}'s turn`;
    let resetGameBoard = gameState.gameBoard
    for (i=0; i<=resetGameBoard; i++) {
        resetGameBoard = "";
        resetButton.addEventListener("click", restartGame)
    }
    }
resetButton.addEventListener("click", restartGame)