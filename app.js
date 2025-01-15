const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

let boardState = Array(9).fill(null); // Initial empty board
let currentPlayer = 'X';
let gameActive = true;