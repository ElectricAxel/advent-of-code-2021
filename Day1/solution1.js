const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const depthsAsString = fileContent.split("\r\n");
const depths = depthsAsString.map(d => +d);

let result = 0;

for (let i = 1; i < depths.length; ++i) {
    if (depths[i - 1] < depths[i]) {
        ++result;
    }
}

console.log(result);