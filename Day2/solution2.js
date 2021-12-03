const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const commandLines = fileContent.split("\r\n");
const commands = commandLines.map(cl => {
    const commandSplit = cl.split(" ");
    return [commandSplit[0], +commandSplit[1]];
});

const result = [0, 0, 0];

const methods = {
    "forward": (amount) => {
        result[0] += amount;
        result[1] += amount * result[2];
    },
    "down": (amount) => {
        result[2] += amount;
    },
    "up": (amount) => {
        result[2] -= amount;
    }
};

for (const command of commands) {
    methods[command[0]](command[1]);
}

console.log(result);
console.log(result[0] * result[1]);