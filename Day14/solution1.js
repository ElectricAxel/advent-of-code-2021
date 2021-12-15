const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const [template, pairsString] = fileContent.split("\r\n\r\n");
const pairs = pairsString.split("\r\n").reduce((pairs, pair) => {
    const [from, to] = pair.split(" -> ");
    pairs[from] = to;
    return pairs;
}, {});;

let currentTemplate = template.split("");
let nextTemplate = "";

for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < currentTemplate.length - 1; ++j) {
        nextTemplate += currentTemplate[j];
        const pair = pairs[currentTemplate[j] + currentTemplate[j + 1]];
        if (pair) {
            nextTemplate += pair;
        }
    }

    nextTemplate += currentTemplate.pop();

    currentTemplate = nextTemplate.split("");
    nextTemplate = "";
}

const counts = currentTemplate.reduce((counts, letter) => {
    counts[letter] = counts[letter] ?? 0;
    ++counts[letter];
    return counts;
}, {});

const sortedCounts = Object.values(counts);
sortedCounts.sort((a, b) => a - b);

console.log(sortedCounts.pop() - sortedCounts.shift());