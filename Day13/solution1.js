const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const [dotLines, foldLines] = fileContent.split("\r\n\r\n");

let dots = dotLines.split("\r\n").map(l => {
    const [x, y] = l.split(",");
    return { x: +x, y: +y };
});

const folds = foldLines.split("\r\n").map(l => {
    const [axisString, position] = l.split("=");
    const axis = axisString.substring(axisString.length - 1);
    return { x: axis == "x" ? +position : 0, y: axis == "y" ? +position : 0 }
});

const fold = folds[0];
console.log(fold);
// console.log(dots);

dots = dots.map(dot => ({ x: fold.x < dot.x ? fold.x * 2 - dot.x : dot.x, y: fold.y < dot.y ? fold.y * 2 - dot.y : dot.y }));

const result = dots.reduce((result, dot) => {
    result[`${dot.x},${dot.y}`] = true;
    return result;
}, {});

console.log(dots.length);
// console.log(dots);
console.log(folds);
// console.log(result);
console.log(Object.keys(result).length);