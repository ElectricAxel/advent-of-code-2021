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


let currentTemplate = {};
for (let j = 0; j < template.length - 1; ++j) {
    const key = template.substring(j, j + 2);
    currentTemplate[key] = currentTemplate[key] ?? 0;
    ++currentTemplate[key];
}

let nextTemplate = {};

for (let i = 0; i < 40; ++i) {
    const entries = Object.entries(currentTemplate);
    
    for (const [key, val] of entries) {
        const pair = pairs[key];
        if(pair) {
            let [left, right] = key.split("");
            left = left + pair;
            right = pair + right;
            nextTemplate[left] = nextTemplate[left] ?? 0;
            nextTemplate[left] += val;
            nextTemplate[right] = nextTemplate[right] ?? 0;
            nextTemplate[right] += val;
        } else {
            nextTemplate[key] = nextTemplate[key] ?? 0;
            nextTemplate[key] += val;
        }
    }

    currentTemplate = nextTemplate;
    nextTemplate = {};
}

const counts = Object.entries(currentTemplate).reduce((counts, [key, val]) => {
    const [left, right] = key.split("");
    counts[left] = counts[left] ?? 0;
    counts[left] += val;
    return counts;
}, {});

++counts[template.substring(template.length - 1)];

const sortedCounts = Object.values(counts);
sortedCounts.sort((a, b) => a - b);

console.log(sortedCounts.pop() - sortedCounts.shift());