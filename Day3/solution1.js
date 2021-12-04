const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "sample.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const binaries = fileLines.map(fl => fl.split("").map(b => +b));

const count = fileLines.length;
const result = binaries[0].map(_ => 0);
for (const binary of binaries) {
    for (let i = 0; i < binary.length; ++i) {
        result[i] += binary[i];
    }
}

let gamma = 0;
let power = 1;

for (let i = result.length - 1; i >= 0; --i) {
    if (result[i] > count / 2) {
        gamma += power;
    }
    power <<= 1;
}

const epsilon = gamma ^ (power - 1);

console.log(gamma, epsilon, gamma * epsilon);