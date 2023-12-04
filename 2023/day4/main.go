package main

import (
	"os"
	"fmt"
	"strings"
	"slices"
	"math"
)

func main() {
	content, _ := os.ReadFile("input")

	lines := strings.Split(string(content), "\n")

	points := 0;

	totals := make([]int, len(lines))
	for i := range totals {
		totals[i] = 1
	}

	for index, line := range lines {
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
		
		curTotal := totals[index]
		for i := 1; i <= len(winners); i++ {
			totals[index + i] += curTotal
		}
	}

	totalCards := 0
	for _, c := range totals {
		totalCards += c
	}

	fmt.Println("Points:", points)
	fmt.Println("Total cards:", totalCards)
}