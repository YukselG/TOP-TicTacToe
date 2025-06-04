const gameboard = (function () {
	// create 2d array gameboard. Set default values to 0 (meaning empty).
	const rows = 3;
	const columns = 3;
	let gameboard = [];

	for (let i = 0; i < rows; i++) {
		gameboard[i] = [];
		for (let j = 0; j < columns; j++) {
			gameboard[i][j] = 0;
		}
	}

	let placeMark = function (row, column, mark) {
		gameboard[row][column] = mark;
	};

	const getGameboard = () => gameboard;

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
		console.log(turnCounter);
		// print gameboard in console
		console.table(gameboard.getGameboard());

		if (turnCounter == 0) {
			console.log(`${getPlayerTurn().getName()} starts!`);
		} else if (turnCounter < 9) {
			console.log(`${getPlayerTurn().getName()}'s turn!`);
			playRound();
		} else {
			return;
		}
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
	game.playRound();
};

startGame();

// check game winner
function checkWinner(gameboard) {
	// TODO: How to check for all winning 3-in-a-rows? Also account for ties.
}
