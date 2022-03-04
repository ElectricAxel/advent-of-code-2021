const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");
const startingBinaries = fileLines.map(fl => fl.split(""));

const bits = fileLines[0].length;
const sentinel = { '0': { count: 0 }, '1': { count: 0 } };

for (const binary of startingBinaries) {
    let temp = sentinel;

    for(let i = 0; i < bits; ++i) {
        temp[binary[i]] = temp[binary[i]] || { count: 0 };

        ++temp[binary[i]].count;

        temp = temp[binary[i]];
    }
}

let oxygen = '';
let temp = sentinel;
for(let i = 0; i < bits; ++i) {
    if(!temp['0']?.count) {
        oxygen += '1';
        temp = temp['1'];
    } else if (!temp['1']?.count) {
        oxygen += '0';
        temp = temp['0'];
    } else if(temp['0'].count > temp['1'].count) {
        oxygen += '0';
        temp = temp['0'];
    } else {
        oxygen += '1';
        temp = temp['1'];
    }
}

let co2 = '';
temp = sentinel;
for(let i = 0; i < bits; ++i) {
    if(!temp['0']?.count) {
        co2 += '1';
        temp = temp['1'];
    } else if (!temp['1']?.count) {
        co2 += '0';
        temp = temp['0'];
    } else if(temp['0'].count > temp['1'].count) {
        co2 += '1';
        temp = temp['1'];
    } else {
        co2 += '0';
        temp = temp['0'];
    }
}

const binToDec = (binary) => {
    return binary.split("").reduce((prev, curr, i) => prev + (curr << (binary.length - i - 1)), 0);
};

console.log(binToDec(oxygen), binToDec(co2), binToDec(oxygen) * binToDec(co2));