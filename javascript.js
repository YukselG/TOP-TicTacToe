// gameboard
const gameboard = (function () {
	// probably set default values of the gameboard's cells to 0
	// and then check if the value is "empty" by checking if the value at the given cell is equal to 0.
	// Also, should the gameboard array be 2d?
	let gameboard = ["X", "X", "O", "O", "X", "O", "X", "O", "O"];

	let updateGameboard = function (cell, value) {
		gameboard[cell - 1] = value;
	};

	const getGameboard = () => gameboard;

	return { getGameboard, updateGameboard };
})();

// player X with name and mark
function createPlayerX() {
	const mark = "X";

	const name = prompt('Player 1\'s name. Will have mark "X" ');

	const getName = () => name;

	const getMark = () => mark;

	return { getName, getMark };
}

// player O with name and mark
function createPlayerO() {
	const mark = "O";

	const name = prompt('Player 2\'s name. Will have mark "O" ');

	const getName = () => name;

	const getMark = () => mark;

	return { getName, getMark };
}

// game flow control
function gameController() {
	// create board
	const board = gameboard();

	// create players
	const playerX = createPlayerX();
	const playerO = createPlayerO();

	// max 9 turns
	let turnCounter = 0;

	// player with mark X starts
	let playerTurn = playerX;

	let getTurnCount = function () {
		return turnCounter;
	};

	let updatePlayerTurn = function () {
		if (playerTurn == playerX) {
			playerTurn = playerO;
		} else if (playerTurn == playerO) {
			playerTurn = playerX;
		}

		turnCounter++;
	};

	const playRound = function (cell, mark) {
		board.updateGameboard(cell, mark);
		updatePlayerTurn();
	};

	return { playerTurn, getTurnCount, playRound };
}

// check game winner
function checkWinner(gameboard) {
	// TODO: How to check for all winning 3-in-a-rows? Also account for ties.
}
