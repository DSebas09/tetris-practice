import {Tetromino} from "./Tetromino.js";

export class Grid{
    constructor(canvas, rows, cols, cellSize, space){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.space = space;
        this.matriz = [];
        this.restartMatriz();

        this.canvas.width = this.cols * this.cellSize + (this.space * this.cols);
        this.canvas.height = this.rows * this.cellSize + (this.space * this.rows);

        this.block = new Tetromino(this.canvas, this.cellSize)
    }

    restartMatriz(){
        for (let r = 0; r < this.rows; r++) {
            this.matriz[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.matriz[r][c] = 0;
            }
        }
    }

    drawSquare(x, y, side, color, borderColor){
        const borderSize = side / 10;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, side, side);

        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = borderSize;
        this.ctx.strokeRect(x+borderSize/2, y+borderSize/2, side - borderSize, side - borderSize);
    }

    getCoords(row, col){
        return {x: col* (this.cellSize + this.space), y: row * (this.cellSize + this.space)}
    }

    draw(){
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const position = this.getCoords(r, c);

                if (this.matriz[r][c] !== 0){
                    this.block.drawBlock(position.x, position.y, this.matriz[r][c]);
                }
                else {
                    this.drawSquare(position.x, position.y, this.cellSize, "#000", "#303030");
                }
            }
        }
        this.debugMatriz();
    }

    debugMatriz(){
        let text = "";
        this.matriz.forEach(row => {
            text += row.join(" ") + "\n"
        })
        console.log(text);
    }
}