const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const xClass = 'x';
const circleClass = 'circle';
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

  placeMark(cell, currentClass);
  swapTurns();
  setBoardHoverClass();
};

const startGame = function () {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true }); // This will fire the event listener only once.
  });
};

startGame();
