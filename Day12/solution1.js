const fs = require("fs");
const path = require("path");

const fileBuffer = fs.readFileSync(path.join(__dirname, "input.txt"));
const fileContent = fileBuffer.toString();
const fileLines = fileContent.split("\r\n");

const BIG = 1;
const SMALL = 2;

const nodes = {};
for (const line of fileLines) {
    const [from, to] = line.split("-");
    nodes[from] = nodes[from] || { paths: [], visited: false, size: from.charCodeAt(0) < 97 ? BIG : SMALL };
    nodes[to] = nodes[to] || { paths: [], visited: false, size: to.charCodeAt(0) < 97 ? BIG : SMALL };

    nodes[from].paths.push(to);
    nodes[to].paths.push(from);
}

const START = "start";
const END = "end";

let result = 0;
const paths = {};

const bfs = (to, currentPath) => {
    if (nodes[to].visited) {
        return;
    }
    currentPath = `${currentPath},${to}`;
    if (!(currentPath in paths)) {
        paths[currentPath] = 1;
    }
    if (to == END) {
        if (paths[currentPath] == 1) {
            paths[currentPath] = 2;
            ++result;
        }
    } else {
        nodes[to].visited = nodes[to].size == SMALL;
        for (const path of nodes[to].paths) {
            bfs(path, currentPath);
        }
        nodes[to].visited = false;
    }
};

nodes[START].visited = true;

for (const path of nodes[START].paths) {
    bfs(path, START);
}

console.log(Object.keys(paths).filter(path => paths[path] == 2));
console.log(result);