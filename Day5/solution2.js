const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const lines = fileContent.split("\r\n").map(line => {
    const [from, to] = line.split(" -> ").map(part => {
        const [x, y] = part.split(",");
        return { x: +x, y: +y };
    });

    return { from, to };
});

const tween = function* (from, to) {
    const stepx = Math.sign(to.x - from.x);
    const stepy = Math.sign(to.y - from.y);

    const stepCount = Math.max((to.x - from.x) * stepx, (to.y - from.y) * stepy);

    for (let i = 0; i <= stepCount; ++i) {
        yield { x: from.x + stepx * i, y: from.y + stepy * i };
    }
};

const counts = {};

for (const line of lines) {
    if (line.from.y == line.to.y || line.from.x == line.to.x || Math.abs(line.to.x - line.from.x) == Math.abs(line.to.y - line.from.y)) {
        for (const { x, y } of tween(line.from, line.to)) {
            const key = `${x},${y}`;
            counts[key] = (counts[key] || 0) + 1;
        }
    }
}

console.log(Object.values(counts).filter(v => v > 1).length);