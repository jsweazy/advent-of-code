import fs from "fs";

const input = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

const strNums = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

var inputArray = fs.readFileSync("day1input2.txt").toString().split("\n");

const main = (values) => {
  const sum = values.reduce((acc, curr) => {
    let str = curr.split("").reduce((strs, curStr) => {
      let combined = strs + curStr;
      strNums.forEach((num, i) => {
        if (combined.includes(num)) {
          combined = combined.replace(num, String(i + 1));
        }
      });
      return combined;
    }, "");
    const numsOnly = str.replace(/\D/g, "");
    const nums = numsOnly.split("");
    const f = nums[0];
    const l = nums[nums.length - 1];
    const combined = Number(String(f) + String(l));

    console.log({ numsOnly, f, l, combined });
    return acc + combined;
  }, 0);

  console.log("SUM: ", sum);
};

main(inputArray);
