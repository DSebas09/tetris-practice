import {BoardTetris} from "./boardTetris.js";
import {TetrominoBag} from "./Tetromino.js";

export class Game {
    constructor(canvas, rows, cols, cellSize, space) {
        this.boardTetris = new BoardTetris(canvas, rows, cols, cellSize, space);
        this.tetrominoBag = new TetrominoBag(canvas, cellSize);
        this.currentTetromino = this.tetrominoBag.nextTetromino();
        this.keyboard();
    }

    blockedTetromino() {
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for (let i = 0; i < tetrominoPositions.length; i++) {
            if (!this.boardTetris.isEmpty(tetrominoPositions[i].row, tetrominoPositions[i].column)) {
                return true;
            }
        }
        return false;
    }

    moveTetrominoLeft() {
        this.currentTetromino.move(0, -1);
        if(this.blockedTetromino()) {
            this.currentTetromino.move(0, 1);
        }
    }

    moveTetrominoRight() {
        this.currentTetromino.move(0, 1);
        if(this.blockedTetromino()) {
            this.currentTetromino.move(0, -1);
        }
    }

    moveTetrominoDown(){
        this.currentTetromino.move(1, 0);
        if(this.blockedTetromino()) {
            this.currentTetromino.move(-1, 0);
        }
    }

    rotationTetrominoCW(){
        this.currentTetromino.rotation++;

        if (this.currentTetromino.rotation > this.currentTetromino.shapes.length - 1) {
            this.currentTetromino.rotation = 0;
        }
        if (this.blockedTetromino()) {
            this.rotationTetrominoCCW();
        }
    }

    rotationTetrominoCCW() {
        this.currentTetromino.rotation --;

        if (this.currentTetromino.rotation < 0) {
            this.currentTetromino.rotation = this.currentTetromino.shapes.length - 1;
        }
        if (this.blockedTetromino()) {
            this.rotationTetrominoCW();
        }
    }

    keyboard(){
        window.addEventListener("keydown", (evt) => {
            if (evt.key === "ArrowLeft") {
                this.moveTetrominoLeft();
            }
            if (evt.key === "ArrowRight") {
                this.moveTetrominoRight();
            }
            if (evt.key === "ArrowUp") {
                this.rotationTetrominoCW();
            }
            if (evt.key === "ArrowDown") {
                this.moveTetrominoDown();
            }
        })
    }
}