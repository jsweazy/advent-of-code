import fs from "fs";

const compareArray = (a, b) => {
  const bSorted = b.slice().sort();
  return (
    a.length === b.length &&
    a
      .slice()
      .sort()
      .every(function (value, index) {
        return value === bSorted[index];
      })
  );
};

const inputFilename = "input";
const input = fs.readFileSync(inputFilename).toString().split("\n");

const cardRanks = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
];

const cardRanksWithJoker = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "J",
];

const cartTypeRanks = [
  "five",
  "four",
  "full-house",
  "three",
  "two-pair",
  "pair",
  "card",
];

const data = input
  .map((line) => line.split(" "))
  .map((line) => {
    const [hand, bet] = line;
    const cards = hand.split("");
    const group = cards.reduce((acc, cur) => {
      acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
      return acc;
    }, {});

    let type = "card";
    switch (Object.keys(group).length) {
      case 1:
        type = "five";
        break;
      case 2:
        const isFour = Object.entries(group).some(([, v]) => v === 4);
        type = isFour ? "four" : "full-house";
        break;
      case 3:
        const isThree = Object.entries(group).some(([, v]) => v === 3);
        type = isThree ? "three" : "two-pair";
        break;
      case 4:
        type = "pair";
        break;
      default:
        type = "card";
        break;
    }

    return {
      hand,
      cards,
      bet,
      type,
    };
  })
  .sort((a, b) => {
    const aType = cartTypeRanks.indexOf(a.type);
    const bType = cartTypeRanks.indexOf(b.type);

    if (aType === bType) {
      const r = 0;

      for (let i = 0; i < a.cards.length; i++) {
        const aRank = cardRanks.indexOf(a.cards[i]);
        const bRank = cardRanks.indexOf(b.cards[i]);

        if (aRank > bRank) {
          return 1;
        }

        if (aRank < bRank) {
          return -1;
        }
      }

      return 0;
    }

    if (aType > bType) {
      return 1;
    }

    if (aType < bType) {
      return -1;
    }

    return 0;
  });

const dataWJokers = input
  .map((line) => line.split(" "))
  .map((line) => {
    const [hand, bet] = line;
    const cards = hand.split("");
    const group = cards.reduce((acc, cur) => {
      acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
      return acc;
    }, {});
    const counts = Object.entries(group)
      .filter(([k]) => k !== "J")
      .map(([, v]) => v)
      .sort((a, b) => b - a);

    const jokerCount = group["J"] || 0;
    counts[0] = (counts[0] || 0) + jokerCount;

    let type = "card";
    if (compareArray(counts, [5])) {
      type = "five";
    } else if (compareArray(counts, [4, 1])) {
      type = "four";
    } else if (compareArray(counts, [3, 2])) {
      type = "full-house";
    } else if (compareArray(counts, [3, 1, 1])) {
      type = "three";
    } else if (compareArray(counts, [2, 2, 1])) {
      type = "two-pair";
    } else if (compareArray(counts, [2, 1, 1, 1])) {
      type = "pair";
    }

    return {
      hand,
      cards,
      bet,
      type,
    };
  })
  .sort((a, b) => {
    const aType = cartTypeRanks.indexOf(a.type);
    const bType = cartTypeRanks.indexOf(b.type);

    if (aType === bType) {
      for (let i = 0; i < a.cards.length; i++) {
        const aRank = cardRanksWithJoker.indexOf(a.cards[i]);
        const bRank = cardRanksWithJoker.indexOf(b.cards[i]);

        if (aRank > bRank) {
          return 1;
        }

        if (aRank < bRank) {
          return -1;
        }
      }

      return 0;
    }

    if (aType > bType) {
      return 1;
    }

    if (aType < bType) {
      return -1;
    }

    return 0;
  });

const part1 = () => {
  return data.reverse().reduce((acc, cur, idx) => {
    const { bet } = cur;
    return acc + parseInt(bet) * (idx + 1);
  }, 0);
};

const part2 = () => {
  return dataWJokers.reverse().reduce((acc, cur, idx) => {
    const { bet } = cur;
    return acc + parseInt(bet) * (idx + 1);
  }, 0);
};

const main = () => {
  console.log("Part 1:", part1());
  console.log("Part 2:", part2());
};

main();
