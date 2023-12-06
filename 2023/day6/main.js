import fs from "fs";

var inputFilename = "input";
var input = fs.readFileSync(inputFilename).toString().split("\n");
const times = input[0]
  .split(":")[1]
  .split(" ")
  .filter((s) => s !== "")
  .map((s) => Number(s));
const distances = input[1]
  .split(":")[1]
  .split(" ")
  .filter((s) => s !== "")
  .map((s) => Number(s));

const time = Number(times.join(""));
const distance = Number(distances.join(""));

const data = times.map((t, i) => [t, distances[i]]);

const part1 = () => {
  return data.reduce((acc, [time, distance]) => {
    let wins = 0;
    for (let i = 1; i < time; i++) {
      const d = (time - i) * i;
      if (d > distance) {
        wins += 1;
      }
    }
    return acc * wins;
  }, 1);
};

const part2 = () => {
  let wins = 0;
  for (let i = 1; i < time; i++) {
    const d = (time - i) * i;
    if (d > distance) {
      wins += 1;
    }
  }
  return wins;
};

const main = () => {
  console.log("Part 1:", part1());
  console.log("Part 2:", part2());
};

main();
