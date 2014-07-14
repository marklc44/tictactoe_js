window.onload = function() {

	// DOM objects
	var boxes = document.getElementsByClassName('box');
	var resetBtn = document.getElementById('reset');
	var newGameBtn = document.getElementById('new-game-btn');
	var winMsg = document.getElementById('win-msg');
	var newGameMsg = document.getElementById('new-game-msg');
	var xTally = document.querySelector('#x-tally');
	var yTally = document.querySelector('#y-tally');

	// track play
	var turn = true;
	var playsX = [];
	var playsO = [];

	// store winning combinations
	var winningCombos = [
		[1,2,3],
		[1,4,7],
		[1,5,9],
		[4,5,6],
		[3,6,9],
		[3,5,7],
		[7,8,9],
		[2,5,8]
	];

	// Check if the game has ended in a draw
	var checkDraw = function(playX, playO) {
		if (playsX.length + playsO.length >= 9) {
			console.log("Draw!");
			showMessage("Draw!");
			return true;
		} 
	};

	// Highlight the boxes in the winning play
	var displayWinningBoxes = function(plays) {
		for (var i = 0; i < plays.length; i++) {
			document.querySelector('.box[data-position="' + plays[i] + '"]').className += ' winning-play';
		}
	};

	// Clear all added styles, content and reset the turn
	var clearGame = function() {
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].innerHTML = '';
			boxes[i].className = 'box';
		}
		playsX = [];
		playsO = [];
		turn = true;
	};

	// Show the proper win or draw message
	// setTimeout hides the message again aftr 2 seconds
	var showMessage = function(msg) {
		if (msg !== '') {
			winMsg.innerHTML = msg;
			winMsg.className = 'msg';
			window.setTimeout(hide, 2000, winMsg);
			window.setTimeout(function() { winMsg.innerHTML = ''; }, 2000);
		}
	};

	// hide the messages
	var hide = function(el) {
		el.className += ' hidden';
	};

	// Highlight winning boxes and display win message
	var executeWin = function(player, winningCombo) {
		console.log(player + ' wins!');
		displayWinningBoxes(winningCombo);
		showMessage(player + " wins!");
		if (player === 'X') {
			console.log("update x");
			xTally.innerHTML = parseInt(xTally.innerHTML) + 1;
		} else {
			yTally.innerHTML = parseInt(yTally.innerHTML) + 1;
		}
	};



	// Check current plays for a winning combination
	// parseInt on values before comparing to improve performance
	var checkWin = function(play) {

		if (play === playsX) {
			player = "X";
		} else {
			player = "O";
		}

		for (var i = 0; i < winningCombos.length; i++) {
			if (play.indexOf(winningCombos[i][0]) !== -1
				&& play.indexOf(winningCombos[i][1]) !== -1
				&& play.indexOf(winningCombos[i][2]) !== -1) {
					executeWin(player, winningCombos[i])
					return true;
			}
		}
		checkDraw(playsX, playsO);
		return false;
	};

	// add click handlers to all boxes
	// check turn and whether the box is already filled
	// fill the box, push the play into the proper plays array
	// toggle turn
	// check for a win
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].onclick = function(e) {

			if (turn && this.innerHTML === '') {
				this.innerHTML = 'X';
				this.className += " x";
				turn = false;
				playsX.push(parseInt(this.getAttribute('data-position')));
				checkWin(playsX);
			} else if (!turn && this.innerHTML === '') {
				this.innerHTML = 'O';
				this.className += " o";
				turn = true;
				playsO.push(parseInt(this.getAttribute('data-position')));
				checkWin(playsO);
			}
			console.log("X plays: ", playsX);
			console.log("O plays: ", playsO);
		};
	}

	// Game reset; used addEventListener to limit to one line
	resetBtn.onclick = function() {
		clearGame();
		xTally.innerHTML = '0';
		yTally.innerHTML = '0';
	};

	// New Game
	// same as reset, but show the new game message
	newGameBtn.onclick = function() {
		clearGame();
		newGameMsg.className = 'msg';
		window.setTimeout(hide, 2000, newGameMsg);
	};

 };





















