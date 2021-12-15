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

for (const fold of folds) {
    // console.log(fold);
    // console.log(dots.slice(0, 100));
    // console.log(dots);

    dots = dots.map(dot => ({
        x: (fold.x > 0 && fold.x < dot.x) ? (fold.x * 2 - dot.x) : (dot.x),
        y: (fold.y > 0 && fold.y < dot.y) ? (fold.y * 2 - dot.y) : (dot.y)
    }));
}

// console.log(dots.slice(0, 100));

const result = dots.reduce((result, dot) => {
    result[`${dot.x},${dot.y}`] = true;
    return result;
}, {});

// console.log(dots.length);
// console.log(dots);
// console.log(folds);
// console.log(result);
// console.log(Object.keys(result).length);

const keys = Object.keys(result).map(l => {
    const [x, y] = l.split(",");
    return { x: +x, y: +y };
});

const right = Math.max.apply(undefined, keys.map(key => key.x));
const down = Math.max.apply(undefined, keys.map(key => key.y));

for(let i = 0; i <= down; ++i) {
    let str = "";
    for(let j = 0; j <= right; ++j) {
        str += result[`${j},${i}`] ? "#" : ".";
    };
    console.log(str);
}