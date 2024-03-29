var Numbers = function() {
	this.numbers = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	this.rowCount = 4;
	this.colCount = 4;
};

Numbers.prototype = {

	forEach: function(callback) {
		if (!callback || !callback.call) return;
		this.numbers.forEach(function(row, rowIndex) {
			row.forEach(function(number, colIndex) {
				callback(number, rowIndex, colIndex);
			});
		});
	},
	forEachRow: function(callback) {
		if (!$.isFunction(callback)) return;
		this.numbers.forEach(function(row, rowIndex) {
			callback(row, rowIndex);
		});
	},

	forEachCol: function(callback) {
		if (!$.isFunction(callback)) return;

		for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
			var col = [];
			for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
				col.push(this.numbers[rowIndex][colIndex]);
			}
			callback(col, colIndex);
		}
	},
	get: function(rowIndex, colIndex) {
		var row = this.numbers[rowIndex];
		return row ? row[colIndex] : null;
	},
	set: function(rowIndex, colIndex, number) {
		var row = this.numbers[rowIndex];
		if (row && typeof row[rowIndex] == 'number')
			row[colIndex] = number;
	},
	hasZero: function() {
		try {
			this.forEach(function(n) {
				if (n === 0) throw new Error("found");
			});
		} catch (ex) {
			return true;
		}
		return false;
	},
	moveLeft: function() {
		var thisObj = this;
		this.forEachRow(function(row, rowIndex) {
			thisObj.mergeRow(row, rowIndex);
		});
		console.log("Move Left");
	},
	moveUp: function() {
		var thisObj = this;
		this.forEachCol(function(col, colIndex) {
			thisObj.mergeCol(col, colIndex);
		});
		console.log("Move Up");
	},
	moveRight: function() {
		var thisObj = this;
		this.forEachRow(function(row, rowIndex) {
			thisObj.mergeRow(row, rowIndex, false);
		});
		console.log("Move Right");
	},
	moveDown: function() {
		var thisObj = this;
		this.forEachCol(function(col, colIndex) {
			thisObj.mergeCol(col, colIndex, false);
		});
		console.log("Move Down");
	},
	canMerge: function() {
		var thisObj = this;
		try {
			this.forEachRow(function(row, rowIndex) {
				if (thisObj.canMergeArray(row)) throw new Error("can merge row: " + rowIndex);
			});
			this.forEachCol(function(col, colIndex) {
				if (thisObj.canMergeArray(col)) throw new Error("can merge col: " + colIndex);
			});
		} catch (ex) {
			return true;
		}
		return false;
	},
	canMergeArray: function(array) {
		var len = array.length,
			curr = 0,
			next = curr + 1;
		while (next < len) {
			var currNum = array[curr],
				nextNum = array[next];
			if (currNum === 0 || nextNum === 0) return true;
			if (currNum === nextNum) return true;
			curr = next;
			next = curr + 1;
		}
		return false;
	},
	mergeRow: function(row, rowIndex, ltr) {
		this.mergeArray(row, rowIndex, true, ltr);
	},
	mergeCol: function(col, colIndex, ltr) {
		this.mergeArray(col, colIndex, false, ltr);
	},

	mergeArray: function(array, rowOrColIndex, isRow, ltr) {
		console.log("merge array: ", array.join(), " index: ", rowOrColIndex);
		ltr = ltr === null ? true : ltr;
		var len = array.length,
			curr = ltr ? 0 : len - 1,
			next = ltr ? curr + 1 : curr - 1;


		while (ltr ? next < len : next >= 0) {
			var currRowIndex = isRow ? rowOrColIndex : curr,
				currColIndex = isRow ? curr : rowOrColIndex,
				nextRowIndex = isRow ? rowOrColIndex : next,
				nextColIndex = isRow ? next : rowOrColIndex,
				currNum = this.numbers[currRowIndex][currColIndex],
				nextNum = this.numbers[nextRowIndex][nextColIndex];
			if (nextNum === 0) {
				next = ltr ? next + 1 : next - 1;
				continue;
			} else {
				if (currNum === 0) {
					this.numbers[currRowIndex][currColIndex] = nextNum;
					this.numbers[nextRowIndex][nextColIndex] = 0;
					next = ltr ? curr + 1 : curr - 1;
					continue;
				} else if (nextNum === currNum) {
					this.numbers[currRowIndex][currColIndex] = currNum + currNum;
					this.numbers[nextRowIndex][nextColIndex] = 0;
				}
				curr = ltr ? curr + 1 : curr - 1;
				next = ltr ? curr + 1 : curr - 1;
				continue;
			}
		}
	}
};