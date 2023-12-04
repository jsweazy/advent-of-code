import fs from "fs";

var inputFilename = "input";
var input = fs.readFileSync(inputFilename).toString().split("\n");

const main = (values) => {
  const points = values.reduce((acc, line) => {
    const [, allNums] = line.split(":");
    let [winningNums, nums] = allNums.split("|").map((s) => s.trim());
    winningNums = winningNums.split(" ").map((n) => Number(n));
    nums = nums
      .split(" ")
      .filter((n) => Boolean(n))
      .map((n) => Number(n));
    const matches = [...new Set(nums.filter((n) => winningNums.includes(n)))];
    let pts = 0;

    if (matches.length === 1) {
      pts = 1;
    } else if (matches.length !== 0) {
      pts = Math.pow(2, matches.length - 1);
    }

    return acc + pts;
  }, 0);

  const totals = values.map(() => 1);
  const totalCards = values.reduce((acc, line, idx) => {
    const [, allNums] = line.split(":");
    let [winningNums, nums] = allNums.split("|").map((s) => s.trim());
    winningNums = winningNums.split(" ").map((n) => Number(n));
    nums = nums
      .split(" ")
      .filter((n) => Boolean(n))
      .map((n) => Number(n));
    const matches = [...new Set(nums.filter((n) => winningNums.includes(n)))];
    const total = totals[idx];

    for (let i = 1; i <= matches.length; i++) {
      totals[idx + i] += total;
    }

    return acc + total;
  }, 0);

  console.log("Points: ", points);
  console.log("Total Cards: ", totalCards);
};

main(input);
