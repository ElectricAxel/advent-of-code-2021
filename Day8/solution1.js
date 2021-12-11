const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const parts = fileLines.map(fl => fl.split(" | "));

// 1, 4, 7, 8
// 2, 4, 3, 7

// take only the second part after the pipe
// break the numbers apart
// only keep the numbers whose length (number of segments) match the lengths of 1, 4, 7 and 8
// flatten and count
console.log(parts.map(p => p[1])
                 .flatMap(p => p.split(" "))
                 .filter(p => [2, 3, 4, 7].includes(p.length)).length);