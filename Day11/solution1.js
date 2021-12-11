const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const energies = fileLines.map(fl => fl.split("").map(e => +e));

const n = energies.length;
const m = energies[0].length;

const increase = (i, j) => {
    if(i < 0 || i >= n || j < 0 || j >= m || energies[i][j] > 9) {
        return;
    }
    ++energies[i][j];
    if(energies[i][j] > 9) {
        increase(i - 1, j - 1);
        increase(i - 1, j);
        increase(i - 1, j + 1);
        increase(i, j - 1);
        increase(i, j + 1);
        increase(i + 1, j - 1);
        increase(i + 1, j);
        increase(i + 1, j + 1);
    }
};

let flashes = 0;

for(let step = 0; step < 100; ++step) {
    for(let i = 0; i < n; ++i) {
        for(let j = 0; j < m; ++j) {
            increase(i, j);
        }
    }
    for(let i = 0; i < n; ++i) {
        for(let j = 0; j < m; ++j) {
            if(energies[i][j] > 9) {
                ++flashes;
                energies[i][j] = 0;
            }
        }
    }
}

console.log(flashes);