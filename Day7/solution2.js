const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const positions = fileContent.split(",").map(a => +a);

const max = Math.max.apply(undefined, positions); // 1957

const counts = Array(max + 1).fill(0);
const candidates = Array(max + 1).fill(0);

for (const position of positions) {
    ++counts[position];
}

const calc = (i, j) => (j - i) * (j - i + Math.sign(j - i)) / 2;

for (let i = 0; i < counts.length; i++) {
    for (let j = 0; j <= max; j++) {
        if(counts[i] > 0) {
            candidates[j] += calc(i, j) * counts[i];
        }
    }
}

console.log(Math.min.apply(undefined, candidates));