// TODO: up and right are valid moves

const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const grid = fileLines.map(line => line.split("").map(n => +n));

const loop = (n, loop) => {
    if (n + loop > 9) {
        return n + loop - 9;
    }
    return n + loop;
}

let prev;
let clone = grid[0].slice();
let next = [0];

for (let i = 1; i < clone.length * 5; ++i) {
    next.push(
        loop(
            clone[i % clone.length],
            Math.floor(i / clone.length)
        ) +
        next[i - 1]
    );
}

for (let j = 1; j < grid.length * 5; ++j) {
    prev = next;
    clone = grid[j % grid.length].slice();
    next = [
        loop(
            clone[0],
            Math.floor(j / grid.length)
        ) +
        prev[0]
    ];

    for (let i = 1; i < clone.length * 5; ++i) {
        next.push(
            loop(
                clone[i % clone.length],
                Math.floor(i / clone.length) +
                Math.floor(j / grid.length)
            ) +
            Math.min(next[i - 1], prev[i])
        );
    }
}

console.log(next.pop());