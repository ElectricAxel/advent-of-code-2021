const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const positions = fileContent.split(",").map(a => +a);

const min = Math.min.apply(undefined, positions); // 0
const max = Math.max.apply(undefined, positions); // 1957

let total = positions.reduce((total, position) => total + position, 0);

const counts = Array(max + 1).fill(0);

for (const position of positions) {
    ++counts[position];
}

let right = positions.length;
let left = 0;

let result = total;

for (let i = 0; i <= max; ++i) {
    left += counts[i];
    right -= counts[i];
    total = total + left - right;

    result = Math.min(result, total);
}

console.log(result);