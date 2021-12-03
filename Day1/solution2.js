const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const depthsAsString = fileContent.split("\r\n");
const depths = depthsAsString.map(d => +d);

let sum1 = depths[0] + depths[1] + depths[2];
let sum2 = depths[1] + depths[2] + depths[3];

let result = 0;

for (let i = 4; i < depths.length; ++i) {
    if (sum1 < sum2) {
        ++result;
    }

    sum1 = sum1 + depths[i - 1] - depths[i - 4];
    sum2 = sum2 + depths[i] - depths[i - 3];
}

if (sum1 < sum2) {
    ++result;
}

console.log(result);