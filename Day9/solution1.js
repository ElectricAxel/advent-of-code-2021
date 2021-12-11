const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const heightmap = fileLines.map(fl => fl.split("").map(n => n.charCodeAt(0) - "0".charCodeAt(0)));

const n = heightmap.length;
const m = heightmap[0].length;

let total = 0;

for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
        let center = heightmap[i][j];
        let top = i <= 0 ? 10 : heightmap[i - 1][j];
        let bottom = i >= n - 1 ? 10 : heightmap[i + 1][j];
        let left = j <= 0 ? 10 : heightmap[i][j - 1];
        let right = j >= m - 1 ? 10 : heightmap[i][j + 1];

        if (center < top &&
            center < bottom &&
            center < left &&
            center < right) {
            total += center + 1;
        }
    }
}

console.log(total);