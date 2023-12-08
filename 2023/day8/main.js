import fs from "fs";

const inputFilename = "input";
const input = fs.readFileSync(inputFilename).toString().split("\n\n");

const [directions, data] = input;
const lines = data.split("\n");
const dataMap = new Map(
  lines.map((line) => {
    const [key, value] = line.split(" = ");
    return [
      key,
      {
        left: value.slice(1, 4),
        right: value.slice(6, value.length - 1),
      },
    ];
  })
);
const dataMapAKeys = [...dataMap]
  .filter(([k]) => k.endsWith("A"))
  .map(([k]) => k);

const count = (start) => {
  let currentEnd = start;
  let steps = 0;
  while (currentEnd[2] !== "Z") {
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const { left, right } = dataMap.get(currentEnd);
      currentEnd = direction === "L" ? left : right;
      steps++;
    }
  }
  return steps;
};

const gcd = (num1, num2) => {
  while (num1 != num2) {
    if (num1 > num2) {
      num1 = num1 - num2;
    } else {
      num2 = num2 - num1;
    }
  }

  return num2;
};

const lcm = (n1, n2) => {
  return (n1 * n2) / gcd(n1, n2);
};

const part1 = () => {
  return count("AAA");
};

const part2 = () => {
  return dataMapAKeys.map(count).reduce(lcm);
};

const main = () => {
  console.log("Part 1:", part1());
  console.log("Part 2:", part2());
};

main();
