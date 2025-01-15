const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

let boardState = Array(9).fill(null); // Initial empty board
let currentPlayer = 'X'; // Player always starts
let gameActive = true;

// Winning combinations
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Add click event to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Handle cell click
function handleCellClick(index) {
    if (boardState[index] || !gameActive) // Cell taken or game inactive
        return;

    boardState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add('taken');

    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins`);
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== null)) { // Every cell taken, but no one wins
        alert('It\'s a draw!');
        gameActive = false;
        return;
    }

    currentPlayer = (currentPlayer === 'X')? 'O' : 'X';

    if (currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

// Check for win
function checkWin(player) {
    return winningCombos.some(combo =>
        combo.every(index => boardState[index] === player)
    );
}

// Computer makes a move
function computerMove() {
    let emptyCells = boardState
        .map((value, index) => (value === null? index : null))
        .filter(index => index !== null);
    
    const randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    handleCellClick(randomIndex);
}

// Reset game
resetButton.addEventListener('click', () => {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X';
    gameActive = true;
})