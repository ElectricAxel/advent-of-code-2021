const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const heightmap = fileLines.map(fl => fl.split("").map(n => n.charCodeAt(0) - "0".charCodeAt(0)));

const n = heightmap.length;
const m = heightmap[0].length;

const explore = (i, j) => {
    if (i < 0 || i >= n || j < 0 || j >= m || heightmap[i][j] >= 9) {
        return 0;
    }

    let size = 1;

    heightmap[i][j] = 9;

    size += explore(i - 1, j) +
            explore(i + 1, j) +
            explore(i, j - 1) +
            explore(i, j + 1);

    return size;
};

const sizes = [];

for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
        const size = explore(i, j);
        if (size > 0) {
            sizes.push(size);
        }
    }
}

sizes.sort((a, b) => a - b);

console.log(sizes.pop() * sizes.pop() * sizes.pop());