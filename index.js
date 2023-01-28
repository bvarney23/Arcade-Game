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
    [[0,0], [0,1], [0,2]],
    [[1,0], [1, 1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
];

// Check for winners

function checkWinner() {
    let roundWinner = null;
    for (i=0; i<winningConditions.length; i++) {
        let condition = winningConditions[i]
        let checker = []
            for(j=0; j<condition.length; j++) {
                let conditionItem = condition[j]
                let rowIndex = conditionItem[0]
                let columnIndex = conditionItem[1]
                let entry = gameState.gameBoard[rowIndex][columnIndex]
                checker.push(entry)
            }
            if (checker[0] == "X" && checker[1] == "X" && checker[2] == "X") {
                roundWinner = "X"
            }
            if (checker[0] == "O" && checker[1] == "O" && checker[2] == "O") {
                roundWinner = "O"
            }
    }
    return roundWinner
}

let currentPlayer = "X";

// Create HTML board using JS

let gameBoardContainer = document.getElementById("game-board");

function renderGame () {
    while (gameBoardContainer.firstChild) {
    gameBoardContainer.removeChild(gameBoardContainer.firstChild);
}

    for (let numOfRowsMade = 0; numOfRowsMade < gameState.gameBoard.length; numOfRowsMade++) {
        let newRowElement = document.createElement("div");
        newRowElement.classList.add("row");
        newRowElement.dataset.rowIndex = numOfRowsMade
        let currentJSRow = gameState.gameBoard[numOfRowsMade];
    
        for (let numOfCellsMade = 0; numOfCellsMade < currentJSRow.length; numOfCellsMade++) {
            let newCellElement = document.createElement("div");
            newCellElement.dataset.cellIndex = numOfCellsMade
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
    updatePlayerOneDisplay();
    removePlayerOneName();
}

submitButtonElement.addEventListener("click", displayNamePlayerOne);

// Fill in Player Two

let nameInputElementTwo = document.getElementById("name-input-two");

let submitButtonElementTwo = document.getElementById("submit-two");
let displayNameElementTwo = document.getElementById("displayed-name-two");

function displayNamePlayerTwo() {
    let playerTwoName = nameInputElementTwo.value;
    gameState.currentPlayerNameTwo = playerTwoName;
    updatePlayerTwoDisplay();
    removePlayerTwoName();
}

submitButtonElementTwo.addEventListener("click", displayNamePlayerTwo);


function clickCell (event) {
    
    let cell = event.target
    let row = cell.parentElement
    console.log(row)
    let rowIndex = row.dataset.rowIndex
    let cellIndex = cell.dataset.cellIndex
    if (gameState.gameBoard[rowIndex][cellIndex] == null) {
        gameState.gameBoard[rowIndex][cellIndex] = currentPlayer
        renderGame()
        let winner = checkWinner()
        if (winner) {
            alert("Winner is " + winner)
        } else {
            changePlayer()
        }
    }
    console.log(gameState.gameBoard)
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



// Reset the board
let resetButton = document.getElementById("reset")

function restartGame() {
    // reset the current player to X
    currentPlayer = "X";
    turnText.textContent = `${currentPlayer}'s turn`;

    // Remove player one and player two name
    gameState.currentPlayerName = ""
    gameState.currentPlayerNameTwo = ""
    updatePlayerOneDisplay();
    updatePlayerTwoDisplay();

    // Reset the gameboard to original state
    gameState.gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    renderGame()

}
resetButton.addEventListener("click", restartGame)

function updatePlayerOneDisplay () {
    displayNameElement.textContent = `Player One: ${gameState.currentPlayerName}`;
}

function updatePlayerTwoDisplay() {
    displayNameElementTwo.textContent = `Player Two: ${gameState.currentPlayerNameTwo}`;
}

function removePlayerOneName() {
    document.getElementById("name-input").value = "";
}

function removePlayerTwoName() {
    document.getElementById("name-input-two").value = "";
}