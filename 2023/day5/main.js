import fs from "fs";

const inputFilename = "input";

const chunk = (arr, size) => {
  const chunks = [];

  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    chunks.push(chunk);
  }

  return chunks;
};

const parseData = () => {
  const input = fs.readFileSync(inputFilename).toString().split("\n\n");
  let [seeds, ...maps] = input;
  seeds = seeds
    .split(": ")[1]
    .split(" ")
    .map((s) => Number(s));

  return {
    seeds,
    maps,
  };
};

const sourceToDestination = (source, lines) => {
  for (let l of lines) {
    const [ds, ss, r] = l.split(" ").map((s) => Number(s));

    if (ss <= source && source <= ss + r) {
      return source - ss + ds;
    }
  }

  return source;
};

const rangeToDestination = (range, map) => {
  const answer = [];
  for (let m of map) {
    const [ds, ss, r] = m.split(" ").map((s) => Number(s));
    const se = ss + r;
    let retry = [];
    while (range.length !== 0) {
      // --------------------------------------
      // | start        [ss se]           end |
      // | [before]    [intercept]    [after] |
      // --------------------------------------
      const [start, end] = range.pop();
      const before = [start, Math.min(end, ss)];
      const intercept = [Math.max(start, ss), Math.min(end, se)];
      const after = [Math.max(se, start), end];

      if (before[0] < before[1]) {
        retry.push(before);
      }
      if (intercept[0] < intercept[1]) {
        answer.push([intercept[0] - ss + ds, intercept[1] - ss + ds]);
      }
      if (after[0] < after[1]) {
        retry.push(after);
      }
    }
    range = retry;
  }

  return answer.concat(range);
};

const part1 = (data) => {
  let locations = [];
  for (let s of data.seeds) {
    for (let m of data.maps) {
      let [_, ...lines] = m.split("\n");
      s = sourceToDestination(s, lines);
    }
    locations.push(s);
  }

  return Math.min(...locations);
};

const part2 = (data) => {
  let locations = [];
  const ranges = chunk(data.seeds, 2);

  for (let r of ranges) {
    let range = [[r[0], r[0] + r[1]]];
    for (let m of data.maps) {
      let [_, ...lines] = m.split("\n");
      range = rangeToDestination(range, lines);
    }
    locations.push(Math.min(...range.flat()));
  }
  return Math.min(...locations);
};

const main = () => {
  const data = parseData();
  const p1 = part1(data);
  const p2 = part2(data);

  console.log("Lowest location P1:", p1);
  console.log("Lowest location P2:", p2);
};

main();
