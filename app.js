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
function handleCellClick(index, playerAction = true) {
    if (boardState[index] || !gameActive || (playerAction && currentPlayer === 'O')) // Cell taken or game inactive
        return;

    boardState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add('taken');

    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins`);
        gameActive = false;
        return;
    }

    if (isBoardFull()) { // Every cell taken, but no one wins
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

// Check if the board is full (draw)
function isBoardFull() {
    return boardState.every(cell => cell !== null);
}

// Get a list of available moves
function availableMoves() {
    return boardState
    .map((value, index) => (value === null? index : null))
    .filter(index => index !== null);
}

// Minimax algorithm for player O (minimizing player)
function minimax(is_maximizing) {
    // Base case: check for terminal state
    if (checkWin('O')) return -1; // O wins
    if (checkWin('X')) return 1; // X wins
    if (isBoardFull()) return 0; // Draw

    let emptyCells = availableMoves();
    if (is_maximizing) {
        let best_value = Number.NEGATIVE_INFINITY;
        emptyCells.forEach((cell) => {
            boardState[cell] = 'X';
            best_value = Math.max(best_value, minimax(false));
            boardState[cell] = null;
        });
        return best_value;
    }
    else {
        let best_value = Number.POSITIVE_INFINITY;
        emptyCells.forEach((cell) => {
            boardState[cell] = 'O';
            best_value = Math.min(best_value, minimax(true));
            boardState[cell] = null;
        });
        return best_value;
    }
}

// Find the best move for player O (computer) using minimax
function bestMove() {
    let best_value = Number.POSITIVE_INFINITY;
    let best_move = null;
    let emptyCells = availableMoves();
    emptyCells.forEach((cell) => {
        boardState[cell] = 'O';
        let move_value = minimax(true);
        boardState[cell] = null;
        if (move_value < best_value) {
            best_value = move_value;
            best_move = cell;
        }
    });
    return best_move;
}

// Computer makes a move
function computerMove() {
    const move = bestMove();
    handleCellClick(move, false);
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