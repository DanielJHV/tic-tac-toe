'use strict';

const cellElements = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
const xClass = 'x';
const circleClass = 'circle';
const winningMessageEl = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('.winning-message__text');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

const handleClick = function (e) {
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : xClass;

  const placeMark = function (cell, currentClass) {
    cell.classList.add(currentClass);
  };

  const swapTurns = function () {
    circleTurn = !circleTurn;
  };

  const setBoardHoverClass = function () {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if (circleTurn) board.classList.add(circleClass);
    if (!circleTurn) board.classList.add(xClass);
  };

  const checkWin = function (currentClass) {
    return winningCombinations.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  };

  placeMark(cell, currentClass);
  // checkWin();

  const endGame = function (draw) {
    if (draw) {
      winningMessageText.textContent = 'Draw!';
    } else {
      winningMessageText.textContent = `${circleTurn ? "O's" : " X's"} Wins!`;
    }
    winningMessageEl.classList.add('show');
  };

  const isDraw = function () {
    // cellElements has to be destructurated to apply the every method
    return [...cellElements].every(cell => {
      return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
    });
  };

  if (checkWin(currentClass)) {
    endGame();
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
};

const startGame = function () {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true }); // This will fire the event listener only once.
  });
};

startGame();
