import fs from "fs";

var inputFilename = "input";
var input = fs.readFileSync(inputFilename).toString().split("\n");

const availCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const main = (values) => {
  const gameSum = values.reduce((acc, curr) => {
    const [game, allCubes] = curr.split(":");
    const gameNum = Number(game.split(" ")[1]);
    const sets = allCubes.split(";").map((c) => c.trim());

    const isValid = sets.every((set) => {
      const cubes = set.split(",").map((c) => c.trim());

      return cubes.every((cube) => {
        const [num, color] = cube.split(" ");
        return Number(num) <= availCubes[color];
      });
    });

    return isValid ? acc + gameNum : acc;
  }, 0);

  const powerSum = values.reduce((acc, curr) => {
    const [, allCubes] = curr.split(":");
    const sets = allCubes.split(";").map((c) => c.trim());
    const maxCubes = sets.reduce(
      (acc, curr) => {
        const cubes = curr
          .split(",")
          .map((c) => c.trim())
          .reduce(
            (acc, curr) => {
              const [num, color] = curr.split(" ");
              return {
                ...acc,
                [color]: Number(num),
              };
            },
            {
              red: 0,
              green: 0,
              blue: 0,
            }
          );

        return {
          red: Math.max(acc.red, cubes.red),
          green: Math.max(acc.green, cubes.green),
          blue: Math.max(acc.blue, cubes.blue),
        };
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );

    const sum = Object.values(maxCubes).reduce((acc, curr) => acc * curr, 1);

    return acc + sum;
  }, 0);

  console.log("GAME SUM: ", gameSum);
  console.log("GAME SUM: ", powerSum);
};

main(input);
