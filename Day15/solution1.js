const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const grid = fileLines.map(line => line.split("").map(n => +n));

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