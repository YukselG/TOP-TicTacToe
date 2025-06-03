// gameboard
const gameboard = (function () {
	let gameboard = ["X", "X", "O", "O", "X", "O", "X", "O", "O"];

	let updateGameboard = function (cell, value) {
		gameboard[cell - 1] = value;
	};

	return { gameboard, updateGameboard };
})();

// player X with name and mark
function createPlayerX(name) {
	const mark = "X";

	return { name, mark };
}

// player O with name and mark
function createPlayerO(name) {
	const mark = "O";

	return { name, mark };
}

// game flow control
function gameUpdater() {
	// max 9 turns
	let turnCounter = 0;
	let playerTurn = "X";

	let updatePlayerTurn = function () {
		if (playerTurn == "X") {
			playerTurn = "O";
		} else if (playerTurn == "X") {
			playerTurn = "X";
		}

		turnCounter++;
	};

	let getTurnCount = function () {
		return turnCounter;
	};

	return { playerTurn, updatePlayerTurn, getTurnCount };
}

// // make move
// function maveMove() {}

// check game winner
function checkWinner(gameboard) {
	// TODO: How to check for all winning 3-in-a-rows? Also account for ties.
}
