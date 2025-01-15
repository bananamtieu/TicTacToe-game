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

}