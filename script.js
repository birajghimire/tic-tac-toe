const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBOS = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 6, 4, 2 ]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message');
const restartBtn = document.getElementById('resetButton');
let circleTurn;

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
	circleTurn = false;
	for (let cell of cellElements) {
		cell.classList.remove(CIRCLE_CLASS);
		cell.classList.remove(X_CLASS);
		cell.addEventListener('click', handleClick, { once: true });
	}

	setHoverClass();
	winningMessageElement.classList.remove('show');
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
	placeMark(cell, currentClass);

	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setHoverClass();
	}
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function setHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);

	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBOS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = 'Draw!';
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "O's Wins!" : "X's Wins!"}`;
	}
	winningMessageElement.classList.add('show');
}

function isDraw() {
	return [ ...cellElements ].every((cell) => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
	});
}
