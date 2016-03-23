angular.module("game").factory("Game", function() {
"use strict";

	//base Cell "class"
	var Cell = function(r,c) {
		this.r = r;
		this.c = c;		
		this.gamer = "";//sign of the gamer, eg. X or O
		this.last = false;//boolean, indicator of last step
		this.winPos = false;//boolean - winning position or not
	};
	Cell.prototype.cssClass = function() {
		return "cell " + this.gamer + (this.last ? " last" : "") + (this.winPos ? " won" : "");
	};
	Cell.prototype.click = function(gamer) {
		if (this.gamer)
			return;
		this.gamer = gamer;
	};
	
	Cell.prototype.toJson = function() {
		return JSON.stringify({
			r:this.r,
			c:this.c,
			gamer:this.gamer
		});
	};




	//base Board "class"
	var Board = function(options) {
		if (options) {
			this.gamer = options.gamer;
			this.CellClass = options.CellClass || Cell;
			this.lastStepCell = undefined;
			this.winner = undefined;

			this.rows = new Array(options.rows);

			for(var r=0; r<options.rows; r++) {
				this.rows[r] = new Array(options.cols);
				for(var c=0; c<options.cols; c++) {
					this.rows[r][c] = new this.CellClass(r,c);
				}
			}
		}
	};

	Board.prototype.step = function(gamer, _r, _c) {
		for(var r=0; r<this.rows.length; r++) {
			var row = this.rows[r];
			for(var c=0; c<row.length; c++) {
				var cell = row[c];
				if (_r==r && _c==c) {
					cell.gamer = gamer;
					cell.last = true;
					this.lastStepCell = cell;
				} else {
					cell.last = false;					
				}
			}
		}	
		return this.won();
	};

	Board.prototype.won = function(lastStep) {
		return false;
	};
	
	Board.prototype.inBoard = function(r,c) {
		return r>=0 && c>=0 && r<this.rows.length && c<this.rows[0].length;
	};
	
	Board.create = function(options) {
		new this(options);
	};

	return {
		Board : Board,
		Cell : Cell
	};

});