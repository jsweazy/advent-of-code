package main

import (
	"os"
	"fmt"
	"strings"
	"strconv"
)

func stringToInts(strs []string) ([]int, error) {
	ints := make([]int, len(strs))
	for i, str := range strs {
			n, err := strconv.Atoi(str)
			if err != nil {
				return nil, err 
			}
			ints[i] = n
	}
	return ints, nil
}

func parseData() ([]int, []int) {
	content, _ := os.ReadFile("input")
	lines := strings.Split(string(content), "\n")
	times, _ := stringToInts(strings.Fields(strings.Split(lines[0], ":")[1]))
	distances, _ := stringToInts(strings.Fields(strings.Split(lines[1], ":")[1]))
	return times, distances
}

func part1() (int) {
	times, distances := parseData()

	a := 1;
	for i, t := range times {
		wins := 0
		for j := 1; j < t; j++ {
			d := (t - j) * j
			if d > distances[i] {
				wins++
			}
		}
		a *= wins
	}

	return a
}

func part2() (int) {
	times, distances := parseData()
	time := ""
	for _, t := range times {
		time += strconv.Itoa(t)
	}
	distance := ""
	for _, d := range distances {
		distance += strconv.Itoa(d)
	}

	t, _ := strconv.Atoi(time)
	d, _ := strconv.Atoi(distance)

	wins := 0
	for i := 1; i < t; i++ {
		dd := (t - i) * i
		if dd > d {
			wins++
		}
	}

	return wins
}

func main() {
	p1 := part1()
	p2 := part2()

	fmt.Println("Part 1:", p1)
	fmt.Println("Part 2:", p2)
}