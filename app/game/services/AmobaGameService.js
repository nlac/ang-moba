angular.module("game").factory("AmobaGame", function(Game) {
"use strict";

	//"class" AmobaCell
	var AmobaCell = function(r, c) {
		Game.Cell.call(this,r,c);
	}
	AmobaCell.prototype = new Game.Cell();
	AmobaCell.prototype.constructor = AmobaCell;

	


	//"class" AmobaBoard
	var AmobaBoard = function(options) {
		Game.Board.call(this, options);
	};
	AmobaBoard.prototype = new Game.Board();
	AmobaBoard.prototype.constructor = AmobaBoard;

	//New board method:
	AmobaBoard.prototype.wonCell = function(r,c) {
		if (!this.inBoard(r,c) || this.rows[r][c].gamer != this.lastStepCell.gamer)
			return false;
		this.winCells.push(this.rows[r][c]);
		return true;
	};
	
	/**
	 * @Override
	 * @param {Cell} lastStep
	 * @return {String} this.winner
	 */
	AmobaBoard.prototype.won = function(lastStep) {
		if (!(lastStep = (lastStep || this.lastStepCell)))
			return false;
		this.lastStepCell = lastStep;

		var rows = this.rows.length, cols = this.rows[0].length;
		var x0 = lastStep.c, y0 = lastStep.r;
		var x1 = Math.max(0, x0-4), x2 = Math.min(cols-1, x0);
		var y1 = Math.max(0, y0-4), y2 = Math.min(rows-1, y0);
		
		var lastMover = this.lastStepCell.gamer;
		var count = 0, i, j, y00, r0, c0;

				
		//check horz
		r0 = this.lastStepCell.r;
		c0 = this.lastStepCell.c - 4;
		for(i=0; i<5; ++i) {
			this.winCells = [];
			for(j=0; j<5; ++j)
				this.wonCell(r0, c0 + i + j);

			if (this.winCells.length == 5) {
				this.winner = lastMover;
				break;
			}
		}

		
		//check vert
		if (!this.winner) {
			r0 = this.lastStepCell.r - 4;
			c0 = this.lastStepCell.c;		
			for(i=0; i<5; ++i) {
				this.winCells = [];
				for(j=0; j<5; ++j)
					this.wonCell(r0 + i + j, c0);
				
				if (this.winCells.length == 5) {
					this.winner = lastMover;
					break;
				}
			}
		}
		
		//check diag
		if (!this.winner) {
			r0 = this.lastStepCell.r - 4;
			c0 = this.lastStepCell.c - 4;
			for(i=0; i<5; ++i) {
				this.winCells = [];
				for(j=0; j<5; ++j)
					this.wonCell(r0 + i + j, c0 + i + j);

				if (this.winCells.length == 5) {
					this.winner = lastMover;
					break;
				}
			}
		}

		//check diag2
		if (!this.winner) {
			r0 = this.lastStepCell.r + 4;
			c0 = this.lastStepCell.c - 4;
			if (!this.winner)
			for(i=0; i<5; ++i) {
				this.winCells = [];
				for(j=0; j<5; ++j)
					this.wonCell(r0 - i - j, c0 + i + j);

				if (this.winCells.length == 5) {
					this.winner = lastMover;
					break;
				}
			}
		}
		
		if (this.winner) {
			for(var i in this.winCells)
				this.winCells[i].winPos = true;
		}
		
		return this.winner;
	}

	return {
		Board: AmobaBoard,
		Cell: AmobaCell
	};

});