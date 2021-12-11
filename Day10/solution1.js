const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");

const lookupTable = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
};

let total = 0;

for (const line of fileLines) {
    const stack = [];
    for (const c of line) {
        if(c in pairs) {
            stack.push(pairs[c]);
        } else if(stack.pop() != c) {
            total += lookupTable[c];
            break;
        }
    }
}

console.log(total);