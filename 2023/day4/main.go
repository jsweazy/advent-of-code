package main

import (
	"os"
	"fmt"
	"strings"
	"slices"
	"math"
)

func main() {
	content, err := os.ReadFile("input")

	if err != nil {
		// do something
	}

	lines := strings.Split(string(content), "\n")

	points := 0;

	for _, line := range lines {
		_, allNums, _ := strings.Cut(line, ":")
		winningNumsStr, numsStr, _ := strings.Cut(allNums, " | ")
		winningNums := strings.Fields(winningNumsStr)
		nums := strings.Fields(numsStr)

		var winners []string
		for _, n := range nums {
			if slices.Contains(winningNums, n) && !slices.Contains(winners, n) {
				winners = append(winners, n)
			}
		}

		if len(winners) > 0 {
			points = int(math.Pow(2.0, math.Max(float64(len(winners) - 1), 0.0))) + points
		}
	}

	fmt.Println("Points:", points)
}