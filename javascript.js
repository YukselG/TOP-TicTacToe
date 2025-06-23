const gameboard = (function () {
	// create 2d array gameboard. Set default values to 0 (meaning empty).
	const rows = 3;
	const columns = 3;
	let board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i][j] = "";
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
function createPlayerX(name) {
	const mark = "X";

	// for console
	// const name = prompt('Player 1\'s name. Will have mark "X" ');

	const getName = () => name;

	const getMark = () => mark;

	return { getName, getMark };
}

// player O with name and mark
function createPlayerO(name) {
	const mark = "O";

	// for console
	// const name = prompt('Player 2\'s name. Will have mark "O" ');

	const getName = () => name;

	const getMark = () => mark;

	return { getName, getMark };
}

// game flow control
function gameController() {
	let playerX;
	let playerO;
	let playerTurn;

	// max 9 turns
	let turnCounter = 0;

	let winnerFound = false;

	const getPlayerTurn = () => playerTurn;

	const getTurnCount = function () {
		return turnCounter;
	};

	let updatePlayerTurn = function () {
		console.log("playerTurn = " + getPlayerTurn().getName());

		if (playerTurn == playerX) {
			console.log("if of update");

			playerTurn = playerO;
			console.log("after update player turn " + getPlayerTurn().getName());
		} else if (playerTurn == playerO) {
			playerTurn = playerX;
			console.log("after update player turn " + getPlayerTurn().getName());
		}

		turnCounter++;
	};

	// create players
	const setPlayerNames = function (name1, name2) {
		playerX = createPlayerX(name1);
		playerO = createPlayerO(name2);

		// and set player x as starter
		playerTurn = playerX;
		console.log(playerTurn);

		console.log("playerx name = " + playerX.getName());
		console.log("playerO name = " + playerO.getName());
	};

	// get player move
	const getPlayerMove = function (move) {
		/* below is for the console*/
		// const getMarkPlacement = prompt("Choose the row and column position. Use commas to seperate! - Example: 2,1");
		// remove all spaces and replace seperator with a comma using regex
		// const cleanedMarkPlacement = getMarkPlacement
		// 	.trim()
		// 	.replace(/\s+/g, "")
		// 	.replace(/[-.:;_]/g, ",");
		// const getMarkPlacementArray = cleanedMarkPlacement.split(",");
		// return getMarkPlacementArray;
		//
		/* below is for the UI */
		// parse input string to int
		let cell = parseInt(move);
		// get the row of the cell: divide by 3 and take the floor
		let row = Math.floor(cell / 3);
		// get the col of the cell: cell mod 3
		let col = cell % 3;

		// check for valid cell
		let validCell = checkPlayerMoveValidity(row, col);
		console.log("validcell = " + validCell);

		return { row, col, validCell };
	};

	// get next round
	const nextRound = function () {
		// print gameboard in console
		if (turnCounter == 0) {
			console.log("Initial board state");
		} else console.log("Board state");

		console.table(gameboard.getGameboard());

		// render board
		renderGameboard();

		console.log("turnCounter = " + turnCounter);

		if (turnCounter == 0) {
			// update player turn information
			updateGameInformation(`${getPlayerTurn().getName()} starts!`);
			// gameUpdatesParagraph.textContent = `${getPlayerTurn().getName()} starts!`;
			console.log(`${getPlayerTurn().getName()} starts!`);
		} else if (turnCounter < 9) {
			updateGameInformation(`${getPlayerTurn().getName()} it's your turn!`);
			// gameUpdatesParagraph.textContent = `${getPlayerTurn().getName()} it's your turn!`;
			console.log(`${getPlayerTurn().getName()}'s turn!`);
		}

		// check for winner after 5 plays
		if (turnCounter > 3) {
			const checkWinnerResult = checkWinner(gameboard);

			winnerFound = checkWinnerResult.getWinningConditionMet();
			if (winnerFound == true) {
				let winningMark = checkWinnerResult.getWinningMark();
				if (winningMark == playerX.getMark()) {
					updateGameInformation(`${playerX.getName()} with the ${winningMark} mark has won!`);
					console.log(`${playerX.getName()} with the ${winningMark} mark has won!`);
				} else if (winningMark == playerO.getMark()) {
					updateGameInformation(`${playerO.getName()} with the ${winningMark} mark has won!`);
					console.log(`${playerO.getName()} with the ${winningMark} mark has won!`);
				}
				return true; // return true -> game is done (winner found)
			}
		}

		// check for tie
		if (turnCounter > 8 && winnerFound == false) {
			updateGameInformation(`No winners. It's a tie!`);
			console.log("No winners. It's a tie!");
			return true; // return true -> game is done (it's a tie)
		}

		return false; // return false -> game continues
	};

	const playRound = function (move) {
		// let validCell = false;
		let row;
		let col;
		// if (validCell == false) {
		// 	const playerMove = getPlayerMove(move);

		// 	if (playerMove == true) {
		// 		validCell = true;
		// 	}
		// }
		let playerMove = getPlayerMove(move);
		let validCell = playerMove.validCell;
		if (validCell == false) {
			return;
		} else {
			row = playerMove.row;
			col = playerMove.col;
		}

		console.log("turncounter = " + turnCounter);

		// place mark after securing valid cell
		gameboard.placeMark(row, col, getPlayerTurn().getMark());

		// update player turn to next player
		updatePlayerTurn();

		// print board after a player move
		if (winnerFound == false) {
			nextRound();
		}

		return;
	};

	// game loop
	let gameOver = false;
	// run while game is not over - for console
	// while (!gameOver) {
	// 	gameOver = nextRound();
	// 	// print final state when game is done (winner found or after last turn)
	// 	if (gameOver) {
	// 		console.log("Final board state:");
	// 		console.table(gameboard.getGameboard());
	// 	}
	// }

	return { getPlayerTurn, getTurnCount, playRound, setPlayerNames, nextRound };
}

const checkPlayerMoveValidity = function (row, column) {
	let validMove = false;
	console.log(row);
	console.log(column);
	console.log(gameboard.getCellValue(row, column) == "-");

	if (
		!isNaN(row) &&
		!isNaN(column) &&
		row >= 0 &&
		row < 3 &&
		column >= 0 &&
		column < 3 &&
		gameboard.getCellValue(row, column) === ""
	) {
		validMove = true;
	} else {
		console.log("Invalid input or cell already taken. Try again.");
		gameUpdatesParagraph.textContent = "Invalid input or cell already taken. Try again.";
	}

	return validMove;
};

// check game winner
function checkWinner(gameboard) {
	let winningConditionMet = false;
	let winnerMark = 0;

	// helper function to pass in 3 values
	function checkThe3Values(a, b, c) {
		if (a !== "" && a == b && b == c) {
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

// startGame();
/* ---------------------------------------------------------- UI ---------------------------------------------------------- */
// UI elements
const gameboardElement = document.querySelector(".gameboard");
const gameboardCells = gameboardElement.querySelectorAll(".cell");
const gameUpdatesParagraph = document.querySelector(".game-updates");
const startGameButton = document.querySelector("#start-game");

// variables and objects
let gameUpdates = "";
let gameStarted = false;
let game = gameController();
// let player1Name = "";
// let player2Name = "";

// get names from inputs
// document.querySelector("#player1").addEventListener("input", (event) => {x
// 	player1Name = event.target.value;
// });
// document.querySelector("#player2").addEventListener("input", (event) => {
// 	player2Name = event.target.value;
// });

// start game
startGameButton.addEventListener("click", () => {
	// get names from input here, so we dont have to use global variables for the names (like above)
	const player1Name = document.querySelector("#player1-name").value;
	const player2Name = document.querySelector("#player2-name").value;

	// checking for truthiness of player name variables
	if (player1Name && player2Name) {
		gameStarted = true;
		game.setPlayerNames(player1Name, player2Name);
		game.nextRound();
	} else {
		alert("Enter both player names!");
	}
});

// TODO: update gameboard when player clicks a cell to place a mark
gameboardElement.addEventListener("click", (event) => {
	if (gameStarted) {
		if (event.target.classList.contains("cell") == false) {
			return;
		}
		const cell = event.target.id.replace("cell", "");
		game.playRound(cell);
	} else {
		alert("Remember to start the game!");
	}
});

// TODO: Probably make updates of game information a function
function updateGameInformation(info) {
	gameUpdatesParagraph.textContent = info;
}

// TODO: Render board to the UI
function renderGameboard() {
	// get board
	const gameboardState = gameboard.getGameboard();
	// flatten board to 1d array to iterate more easily
	const gameboardStateFlatten = gameboardState.flat();
	let index = 0;

	if (gameStarted == true) {
		gameboardCells.forEach((cell) => {
			// assign each cell value to each cell ui
			cell.textContent = gameboardStateFlatten[index];
			index++;
		});
	}
}
