// TODO: up and right are valid moves

const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const grid = fileLines.map(line => line.split("").map(n => +n));

const n = grid.length;
const m = grid[0].length;

const loop = (n, loop) => {
    if (n + loop > 9) {
        return n + loop - 9;
    }
    return n + loop;
}

for(let i = 0; i < n; ++i) {
    for(let j = m; j < m * 5; ++j) {
        grid[i].push(loop(grid[i][j % m], Math.floor(j / m)));
    }
}

for(let i = n; i < n * 5; ++i) {
    grid.push(grid[i % n].slice());
    for(let j = 0; j < m * 5; ++j) {
        grid[i][j] = loop(grid[i][j], Math.floor(i / n));
    }
}

grid[0][0] = 0; // first cell actually has

let prev;
let next = grid.shift();

for(let i = 1; i < next.length; ++i) {
    next[i] += next[i - 1];
}

while(grid.length) {
    prev = next;
    next = grid.shift();
 
    next[0] += prev[0];
    
    for(let i = 1; i < next.length; ++i) {
        next[i] += Math.min(next[i - 1], prev[i]); 
    }
}

console.log(next.pop());