const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const [numbersLine, ...boardLines] = fileContent.split("\r\n\r\n");
const numbers = numbersLine.split(",");

class Board {
    numberMap;
    board;

    constructor(boardLines) {
        this.numberMap = {};
        this.board = boardLines.split("\r\n").map((line, i) => {
            return line.trim().split(/\s+/).map((number, j) => {
                this.numberMap[number] = [i, j];
                return [number, false];
            })
        });
    }

    /**
     * Marks a number on the board.
     * @param {Number} number to mark on the board
     * @returns {Boolean} true if this board won
     */
    mark(number) {
        const cell = this.numberMap[number];

        if (!cell) {
            return false;
        }

        const [i, j] = cell;
        this.board[i][j][1] = true;

        let row = true;
        let col = true;

        for (let k = 0; k < 5; k++) {
            row = row && this.board[i][k][1];
            col = col && this.board[k][j][1];
        }

        return row || col;
    }

    sumUnmarked() {
        let result = 0;

        for (const row of this.board) {
            for (const [number, marked] of row) {
                if (!marked) {
                    result += +number;
                }
            }
        }

        return result;
    }
}

const boards = boardLines.map(boardLine => new Board(boardLine));

let winner;
for (const number of numbers) {
    for (const board of boards) {
        if (board.mark(number)) {
            winner = board;

            const unmarkedSum = board.sumUnmarked();
            console.log(number, unmarkedSum, number * unmarkedSum);

            break;
        }
    }
    if (winner) {
        break;
    }
}