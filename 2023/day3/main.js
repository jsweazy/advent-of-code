import fs from "fs";

var inputFilename = "input";
var input = fs.readFileSync(inputFilename).toString().split("\n");

const parseLine = (line) => {
  const nums = [...(line.matchAll(/\d+/g) || [])].map((n) => {
    const value = n[0];
    const start = n.index === 0 ? 0 : n.index - 1;
    const length = n.index === 0 ? value.length + 1 : value.length + 2;
    const indexs = Array.from({ length: value.length }, (_, i) => n.index + i);
    const indexMatches = Array.from({ length }, (_, i) => start + i);
    return {
      value: value,
      index: n.index,
      indexs: indexs,
      indexMatches: indexMatches,
    };
  });
  const symbols = [...(line.matchAll(/[^a-z0-9.]/gi) || [])].map((n) => {
    const value = n[0];
    const start = n.index === 0 ? 0 : n.index - 1;
    const length = n.index === 0 ? value.length + 1 : value.length + 2;
    const indexs = Array.from({ length: value.length }, (_, i) => n.index + i);
    const indexMatches = Array.from({ length }, (_, i) => start + i);
    return {
      value: value,
      index: n.index,
      indexs: indexs,
      indexMatches: indexMatches,
    };
  });

  return {
    nums,
    symbols,
  };
};

const numsWithAdjacentSymbol = (lines, lineIndex, line) => {
  if (line.nums.length === 0) {
    return [];
  }

  const prevLine = lines[lineIndex - 1];
  const nextLine = lines[lineIndex + 1];

  return line.nums
    .filter((num) => {
      return (
        line.symbols.some((s) => num.indexMatches.includes(s.index)) ||
        nextLine?.symbols.some((s) => num.indexMatches.includes(s.index)) ||
        prevLine?.symbols.some((s) => num.indexMatches.includes(s.index))
      );
    })
    .map((n) => Number(n.value));
};

const adjacentNumsToGears = (lines, lineIndex, line) => {
  const gears = line.symbols.filter((s) => s.value === "*");

  if (gears.length === 0) {
    return [];
  }

  const prevLine = lines[lineIndex - 1];
  const nextLine = lines[lineIndex + 1];

  return gears.map((symbol) => {
    const nums = [
      ...(line.nums.filter((n) =>
        symbol.indexMatches.some((i) => n.indexs.includes(i))
      ) || []),
      ...(nextLine?.nums.filter((n) =>
        symbol.indexMatches.some((i) => n.indexs.includes(i))
      ) || []),
      ...(prevLine?.nums.filter((n) =>
        symbol.indexMatches.some((i) => n.indexs.includes(i))
      ) || []),
    ];
    return nums.length > 1 ? nums.reduce((a, b) => a * Number(b.value), 1) : 0;
  });
};

const main = (rows) => {
  const lines = rows.map((line) => parseLine(line));
  const total = lines.reduce((acc, line, idx) => {
    return (
      acc + numsWithAdjacentSymbol(lines, idx, line).reduce((a, b) => a + b, 0)
    );
  }, 0);
  const gearRatio = lines.reduce((acc, line, idx) => {
    return (
      acc + adjacentNumsToGears(lines, idx, line).reduce((a, b) => a + b, 0)
    );
  }, 0);

  console.log("Total: ", total);
  console.log("Gear Ratio: ", gearRatio);
};

main(input);
