const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");

const lookupTable = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
};

const scores = [];

for (const line of fileLines) {
    const stack = [];
    for (const c of line) {
        if(c in pairs) {
            stack.unshift(pairs[c]);
        } else if(stack.shift() != c) {
            while(stack.length > 0) {
                stack.shift();
            }
            break;
        }
    }
    if(stack.length > 0) {
        let score = 0;
        for (const c of stack) {
            score = score * 5 + lookupTable[c];
        }
        scores.push(score);
    }
}

scores.sort((a, b) => a - b);

console.log(scores[(scores.length - 1) / 2]);