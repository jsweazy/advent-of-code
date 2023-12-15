import fs from "fs";

const inputFilename = "input";
const input = fs.readFileSync(inputFilename).toString().split("\n");

const getHistory = (nums) => {
  let lines = [nums];

  while (!lines[lines.length - 1].every((x) => x === 0)) {
    const line = lines[lines.length - 1];
    const newLine = [];

    for (let i = 0; i < line.length - 1; i++) {
      const curr = line[i];
      const next = line[i + 1];
      newLine.push(next - curr);
    }

    lines.push(newLine);
  }

  lines.reverse();

  let beforeNums = [0];
  for (let i = 0; i < lines.length; i++) {
    const first = lines[i][0];
    const l = beforeNums[beforeNums.length - 1];
    beforeNums.push(first - l);
  }

  return {
    before: beforeNums[beforeNums.length - 1],
    after: lines.reduce((acc, cur) => {
      return acc + cur[cur.length - 1];
    }, 0),
  };
};

const part1 = () => {
  return input.reduce((acc, cur) => {
    return acc + getHistory(cur.split(" ").map((x) => parseInt(x))).after;
  }, 0);
};

const part2 = () => {
  return input.reduce((acc, cur) => {
    return acc + getHistory(cur.split(" ").map((x) => parseInt(x))).before;
  }, 0);
};

const main = () => {
  console.log("Part 1:", part1());
  console.log("Part 2:", part2());
};

main();
