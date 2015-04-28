var Game = (function($) {
	var numbers, listening = false;

	function newRound() {
		numbers = new Numbers();
		renderUI();
		addRandomNumber();
		renderUI();
		addRandomNumber();
		renderUI();
		if (!listening) {
			$('body').on("keydown", onKeydown);
			listening = true;
		}
	}

	function checkGameOver() {
		if (!numbers.canMerge()) {
			GameOver();
		}
	}

	function GameOver() {
		// todo
		$("#message").html("Game Over!").show();
		$(document).unbind("keydown", onKeydown);
		listening = false;
	}

	function onKeydown(e) {
		e.preventDefault();
		switch (e.keyCode) {
			case 37: // left
				numbers.moveLeft();
				afterMove();
				break;
			case 38: // up
				numbers.moveUp();
				afterMove();
				break;
			case 39: // right
				numbers.moveRight();
				afterMove();
				break;
			case 40: // down
				numbers.moveDown();
				afterMove();
				break;
			default:
				break;
		}
	}

	function afterMove() {
		renderUI();
		addRandomNumber();
		renderUI();
		checkGameOver();
	}

	function renderUI() {
		numbers.forEach(function(num, rowIndex, colIndex) {
			var html = num === 0 ? "" : num,
				className = "cell num-" + (num === 0 ? "no" : num > 2048 ? "super" : num);
			$("#cell-" + rowIndex + "-" + colIndex)
				.html(html)
				.removeClass()
				.addClass(className);
		});
	}


	function addRandomNumber() {
		var pos = getCellPosition(getRandomFreeCell());
		numbers.set(pos.row, pos.col, getRandom2or4());
	}

	function getRandomFreeCell() {

		var cells = $("#board .num-no").toArray(),
			count = cells.length,
			randIndex = Math.floor(Math.random() * count);
		if (count === 0) {
			GameOver();
		}
		return cells[randIndex];
	}

	function getCellPosition(cell) {
		var $cell = $(cell);
		return {
			row: parseInt($cell.data("row"), 10),
			col: parseInt($cell.data("col"), 10),
		};
	}

	function getRandom2or4() {
		return Math.random() < 0.5 ? 2 : 4;
	}

	return {
		newRound: newRound
	};

})(jQuery);