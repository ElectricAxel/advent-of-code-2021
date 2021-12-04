const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const startingBinaries = fileLines.map(fl => fl.split("").map(b => +b));

const countMostAndLeast = (binaries, bitPosition) => {
    const result = [[], []]; // most, least

    for (const binary of binaries) {
        result[binary[bitPosition]].push(binary);
    }

    if((result[0].length == result[1].length) || result[0].length < result[1].length) {
        result.push(result.shift()); // inverse
    }

    return result;
};

let oxygen = startingBinaries;
let bitPosition = 0;

while(oxygen.length > 1) {
    oxygen = countMostAndLeast(oxygen, bitPosition++)[0];
}

let co2 = startingBinaries;
bitPosition = 0;

while(co2.length > 1) {
    co2 = countMostAndLeast(co2, bitPosition++)[1];
}

const binToDec = (binary) => {
    return binary.reduce((prev, curr, i) => prev + (curr << (binary.length - i - 1)), 0);
};

console.log(binToDec(oxygen[0]), binToDec(co2[0]), binToDec(oxygen[0]) * binToDec(co2[0]));