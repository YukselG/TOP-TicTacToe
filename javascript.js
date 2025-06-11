const gameboard = (function () {
	// create 2d array gameboard. Set default values to 0 (meaning empty).
	const rows = 3;
	const columns = 3;
	let board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i][j] = 0;
		}
	}

	let placeMark = function (row, column, mark) {
		board[row][column] = mark;
	};

	const getGameboard = () => board;

	return { getGameboard, placeMark };
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
	//const board = gameboard();

	// create players
	const playerX = createPlayerX();
	const playerO = createPlayerO();

	// max 9 turns
	let turnCounter = 0;

	// player with mark X starts
	let playerTurn = playerX;

	const getTurnCount = function () {
		return turnCounter;
	};

	const getPlayerTurn = () => playerTurn;

	let updatePlayerTurn = function () {
		if (playerTurn == playerX) {
			playerTurn = playerO;
		} else if (playerTurn == playerO) {
			playerTurn = playerX;
		}

		turnCounter++;
	};

	// get next round
	const nextRound = function () {
		// print gameboard in console
		if (turnCounter == 0) {
			console.log("Initial board state");
		} else console.log("Board state");

		console.table(gameboard.getGameboard());

		console.log("turnCounter = " + turnCounter);

		let winnerFound = false;

		if (turnCounter > 8) {
			return;
		}

		if (winnerFound == true) {
			return;
		}

		if (turnCounter == 0) {
			console.log(`${getPlayerTurn().getName()} starts!`);
		} else if (turnCounter < 9) {
			console.log(`${getPlayerTurn().getName()}'s turn!`);
			//playRound();
		}

		if (turnCounter > 4) {
			console.log("test turncounter > 4");

			const checkWinnerResult = checkWinner(gameboard);

			winnerFound = checkWinnerResult.getWinningConditionMet();
			if (winnerFound == true) {
				console.log("if winnerfound");

				let winningMark = checkWinnerResult.getWinningMark();
				if (winningMark == playerX.getMark()) {
					console.log(`${playerX.getName()} with the ${winningMark} mark has won!`);
				} else if (winningMark == playerO.getMark()) {
					console.log(`${playerO.getName()} with the ${winningMark} mark has won!`);
				}
				return;
			}
		}

		playRound();
	};

	// prompt player for move
	const getPlayerMove = function () {
		// TODO: Prevent users from passing in wrong inputs
		// TODO: Prevent users from overriding cells that are not empty - check for valid cell
		const getMarkPlacement = prompt("Choose the row and column position. Use commas to seperate! - Example: 2,1");
		// TODO: Is it possible to use multiple seperators? Like commas, dots, hyphens etc.?
		const getMarkPlacementArray = getMarkPlacement.split(",");
		return getMarkPlacementArray;
	};

	const playRound = function () {
		const playerMove = getPlayerMove();
		const row = parseInt(playerMove[0]);
		const column = parseInt(playerMove[1]);

		// place mark
		gameboard.placeMark(row, column, playerTurn.getMark());

		// update player turn to next player
		updatePlayerTurn();

		// print board after a player move
		nextRound();
	};

	nextRound();

	return { getPlayerTurn, getTurnCount, playRound };
}

const startGame = function () {
	const game = gameController();
	// game.playRound();
};

startGame();

// check game winner
function checkWinner(gameboard) {
	// TODO: How to check for all winning 3-in-a-rows? Also account for ties.

	console.log("inside checkWinner");

	let winningConditionMet = false;
	let winnerMark = 0;
	// let winningLine = false;
	/* trying firstly by hardcoding the cases */

	// helper function to pass in 3 values
	function checkThe3Values(a, b, c) {
		console.log("inside checkThe3Values");

		if (a !== 0 && a == b && b == c) {
			console.log("inside if of checkthe3vaues");

			winningConditionMet = true;
			winnerMark = a;
			return winningConditionMet;
		} else return false;
	}

	/*
	let row0 = checkThe3Values(gameboard[0][0], gameboard[0][1], gameboard[0][2]);
	let row1 = checkThe3Values(gameboard[1][0], gameboard[1][1], gameboard[1][2]);
	let row3 = checkThe3Values(gameboard[2][0], gameboard[2][1], gameboard[2][2]);

	let column1 = checkThe3Values(gameboard[0][0], gameboard[1][0], gameboard[2][0]);
	let column2 = checkThe3Values(gameboard[0][1], gameboard[1][1], gameboard[2][1]);
	let column3 = checkThe3Values(gameboard[0][2], gameboard[1][2], gameboard[2][2]);

	let leftRightDiagonal = checkThe3Values(gameboard[0][0], gameboard[1][1], gameboard[2][2]);
	let rightLeftDiagonal = checkThe3Values(gameboard[0][2], gameboard[1][1], gameboard[2][0]);
	*/
	let board = gameboard.getGameboard();
	checkThe3Values(board[0][0], board[0][1], board[0][2]);
	checkThe3Values(board[1][0], board[1][1], board[1][2]);
	checkThe3Values(board[2][0], board[2][1], board[2][2]);

	checkThe3Values(board[0][0], board[1][0], board[2][0]);
	checkThe3Values(board[0][1], board[1][1], board[2][1]);
	checkThe3Values(board[0][2], board[1][2], board[2][2]);

	checkThe3Values(board[0][0], board[1][1], board[2][2]);
	checkThe3Values(board[0][2], board[1][1], board[2][0]);

	const getWinningMark = () => winnerMark;

	const getWinningConditionMet = () => winningConditionMet;

	return { getWinningMark, getWinningConditionMet };
}
