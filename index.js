let gameState = {
    gameBoard: [
        [[null], [null], [null]],
        [[null], [null], [null]],
        [[null], [null], [null]]
    ],
    currentPlayerTurn: "",
    winningConditions: []
}

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
};

document.addEventListener("DOMContentLoaded", renderGame)
