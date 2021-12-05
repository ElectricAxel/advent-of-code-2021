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
    if (from > to) {
        from ^= to;
        to ^= from;
        from ^= to;
    }

    for (let i = from; i <= to; ++i) {
        yield i;
    }
};

const counts = {};

for (const line of lines) {
    if (line.from.y == line.to.y) {
        for (const x of tween(line.from.x, line.to.x)) {
            const key = `${x},${line.from.y}`;
            counts[key] = (counts[key] || 0) + 1;
        }
    } else if (line.from.x == line.to.x) {
        for (const y of tween(line.from.y, line.to.y)) {
            const key = `${line.from.x},${y}`;
            counts[key] = (counts[key] || 0) + 1;
        }
    }
}

console.log(Object.values(counts).filter(v => v > 1).length);