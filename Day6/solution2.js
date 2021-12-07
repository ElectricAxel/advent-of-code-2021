const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const ages = fileContent.split(",").map(a => +a);
const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 0 through 8
for (const age of ages) {
    ++counts[age];
}

for(let i = 0; i < 256; ++i) {
    const zeros = counts.shift();
    counts[6] += zeros;
    counts.push(zeros);
}

console.log(counts.reduce((sum, age) => sum + age, 0));