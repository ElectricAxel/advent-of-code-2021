const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");

const convertLettersToBinary = (letters) => ({
    value: letters.split("").reduce((p, c) => p + (1 << ("g".charCodeAt(0) - c.charCodeAt(0))), 0),
    length: letters.length
});

const entries = fileLines.map(fl => {
    const [digits, segments] = fl.split(" | ");
    return {
        digits: digits.split(" ").map(convertLettersToBinary),
        segments: segments.split(" ").map(convertLettersToBinary),
    };
});

// const numbers = [
//     0b1110111, // ["a","b","c",    "e","f","g"], // 0 // 6
//     0b0010010, // [        "c",        "f"    ], // 1 // 2
//     0b1011101, // ["a",    "c","d","e",    "g"], // 2 // 5
//     0b1011011, // ["a",    "c","d",    "f","g"], // 3 // 5
//     0b0111010, // [    "b","c","d",    "f"    ], // 4 // 4
//     0b1101011, // ["a","b",    "d",    "f","g"], // 5 // 5
//     0b1101111, // ["a","b",    "d","e","f","g"], // 6 // 6
//     0b1010010, // ["a",    "c",        "f"    ], // 7 // 3
//     0b1111111, // ["a","b","c","d","e","f","g"], // 8 // 7
//     0b1111011, // ["a","b","c","d",    "f","g"], // 9 // 6
// ];

let total = 0;

for (const entry of entries) {
    const one = entry.digits.find(digit => digit.length == 2);
    const four = entry.digits.find(digit => digit.length == 4);
    const seven = entry.digits.find(digit => digit.length == 3);
    const eight = entry.digits.find(digit => digit.length == 7);

    const sixes = entry.digits.filter(digit => digit.length == 6);
    // const fives = entry.digits.filter(digit => digit.length == 5);

    const a = one.value ^ seven.value;

    const cde = (sixes[0].value ^ sixes[1].value) | (sixes[0].value ^ sixes[2].value) | (sixes[1].value ^ sixes[2].value);
    const c = one.value & cde;

    const f = one.value - c;

    const cd = four.value & cde;
    const d = cd - c;

    const e = cde - cd;

    const b = four.value - c - d - f;

    const g = eight.value - a - b - c - d - e - f;

    const newNumbers = [
        a + b + c + 0 + e + f + g,
        0 + 0 + c + 0 + 0 + f + 0,
        a + 0 + c + d + e + 0 + g,
        a + 0 + c + d + 0 + f + g,
        0 + b + c + d + 0 + f + 0,
        a + b + 0 + d + 0 + f + g,
        a + b + 0 + d + e + f + g,
        a + 0 + c + 0 + 0 + f + 0,
        a + b + c + d + e + f + g,
        a + b + c + d + 0 + f + g,
    ];

    const segmentValues = entry.segments.map(segment => newNumbers.indexOf(segment.value));

    const entryValue = segmentValues.reduce((prev, curr) => prev * 10 + curr, 0);
    console.log(entryValue);

    total += entryValue;
}

console.log(total);