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

	let getCellValue = function (row, column) {
		return board[row][column];
	};

	const getGameboard = () => board;

	return { getGameboard, placeMark, getCellValue };
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
	// create players
	const playerX = createPlayerX();
	const playerO = createPlayerO();

	// max 9 turns
	let turnCounter = 0;

	// player with mark X starts
	let playerTurn = playerX;

	let winnerFound = false;

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

	// prompt player for move and trim input
	const getPlayerMove = function () {
		const getMarkPlacement = prompt("Choose the row and column position. Use commas to seperate! - Example: 2,1");
		// remove all spaces and replace seperator with a comma using regex
		const cleanedMarkPlacement = getMarkPlacement
			.trim()
			.replace(/\s+/g, "")
			.replace(/[-.:;_]/g, ",");
		const getMarkPlacementArray = cleanedMarkPlacement.split(",");
		return getMarkPlacementArray;
	};

	// get next round
	const nextRound = function () {
		// print gameboard in console
		if (turnCounter == 0) {
			console.log("Initial board state");
		} else console.log("Board state");

		console.table(gameboard.getGameboard());

		console.log("turnCounter = " + turnCounter);

		if (turnCounter == 0) {
			console.log(`${getPlayerTurn().getName()} starts!`);
		} else if (turnCounter < 9) {
			console.log(`${getPlayerTurn().getName()}'s turn!`);
		}

		playRound();

		// check for winner after 5 plays
		if (turnCounter > 4) {
			const checkWinnerResult = checkWinner(gameboard);

			winnerFound = checkWinnerResult.getWinningConditionMet();
			if (winnerFound == true) {
				let winningMark = checkWinnerResult.getWinningMark();
				if (winningMark == playerX.getMark()) {
					console.log(`${playerX.getName()} with the ${winningMark} mark has won!`);
				} else if (winningMark == playerO.getMark()) {
					console.log(`${playerO.getName()} with the ${winningMark} mark has won!`);
				}
				return true; // return true -> game is done (winner found)
			}
		}

		// check for tie
		if (turnCounter > 8 && winnerFound == false) {
			console.log("No winners. It's a tie!");
			return true; // return true -> game is done (it's a tie)
		}

		return false; // return false -> game continues
	};

	const playRound = function () {
		let validCell = false;
		let row;
		let column;

		// prompt user for a move until a valid cell is chosen
		while (!validCell) {
			const playerMove = getPlayerMove();
			row = parseInt(playerMove[0]);
			column = parseInt(playerMove[1]);

			if (checkPlayerMoveValidity(row, column)) {
				validCell = true;
			}
		}

		// place mark after securing valid cell
		gameboard.placeMark(row, column, playerTurn.getMark());

		// update player turn to next player
		updatePlayerTurn();

		return;
		// print board after a player move
		//nextRound();
	};

	// game loop
	let gameOver = false;
	// run while game is not over
	while (!gameOver) {
		gameOver = nextRound();
		// print final state when game is done (winner found or after last turn)
		if (gameOver) {
			console.log("Final board state:");
			console.table(gameboard.getGameboard());
		}
	}

	return { getPlayerTurn, getTurnCount, playRound };
}

const checkPlayerMoveValidity = function (row, column) {
	let validMove = false;
	if (
		!isNaN(row) &&
		!isNaN(column) &&
		row >= 0 &&
		row < 3 &&
		column >= 0 &&
		column < 3 &&
		gameboard.getCellValue(row, column) == 0
	) {
		validMove = true;
	} else {
		console.log("Invalid input or cell already taken. Try again.");
	}

	return validMove;
};

// check game winner
function checkWinner(gameboard) {
	let winningConditionMet = false;
	let winnerMark = 0;

	// helper function to pass in 3 values
	function checkThe3Values(a, b, c) {
		if (a !== 0 && a == b && b == c) {
			winningConditionMet = true;
			winnerMark = a;
			return winningConditionMet;
		} else return false;
	}

	let board = gameboard.getGameboard();

	const winningLines = [
		// rows
		[board[0][0], board[0][1], board[0][2]],
		[board[1][0], board[1][1], board[1][2]],
		[board[2][0], board[2][1], board[2][2]],
		// columns
		[board[0][0], board[1][0], board[2][0]],
		[board[0][1], board[1][1], board[2][1]],
		[board[0][2], board[1][2], board[2][2]],
		// diagonals
		[board[0][0], board[1][1], board[2][2]],
		[board[0][2], board[1][1], board[2][0]],
	];

	// loop through each winning possibility
	for (const line of winningLines) {
		const [a, b, c] = line;
		if (checkThe3Values(a, b, c) == true) {
			break; // stop (short circuit) loop if any winning lines has been found
		}
	}

	const getWinningMark = () => winnerMark;

	const getWinningConditionMet = () => winningConditionMet;

	return { getWinningMark, getWinningConditionMet };
}

const startGame = function () {
	const game = gameController();
};

startGame();
