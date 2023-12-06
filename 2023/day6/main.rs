use std::{
    fs::File,
    io::{BufRead, BufReader},
};

struct Data {
    times: Vec<u64>,
    distance: Vec<u64>,
}

fn parse_data() -> Data {
    let file = File::open("input").expect("Can't open file");
    let buf = BufReader::new(file);

    let lines: Vec<String> = buf
        .lines()
        .map(|l| l.expect("Could not parse line"))
        .collect::<Vec<String>>();

    let times = lines[0].split(":").collect::<Vec<&str>>()[1]
        .split(" ")
        .collect::<Vec<&str>>()
        .iter()
        .filter(|&n| !n.is_empty())
        .map(|&n| n.parse::<u64>().unwrap())
        .collect::<Vec<u64>>();

    let distance = lines[1].split(":").collect::<Vec<&str>>()[1]
        .split(" ")
        .collect::<Vec<&str>>()
        .iter()
        .filter(|&n| !n.is_empty())
        .map(|&n| n.parse::<u64>().unwrap())
        .collect::<Vec<u64>>();

    Data { times, distance }
}

fn part1() -> u64 {
    let data = parse_data();

    let mut a = 1;
    for (idx, time) in data.times.iter().enumerate() {
        let mut wins = 0;
        for i in 1..*time {
            let d = (time - i) * i;

            if d > data.distance[idx] {
                wins += 1;
            }
        }

        a *= wins;
    }

    return a;
}

fn part2() -> u64 {
    let data = parse_data();
    let mut str_time = String::new();
    for t in data.times {
        str_time.push_str(&t.to_string())
    }
    let time = str_time.parse::<u64>().unwrap();

    let mut str_distance = String::new();
    for d in data.distance {
        str_distance.push_str(&d.to_string())
    }
    let distance = str_distance.parse::<u64>().unwrap();

    let mut wins = 0;

    for i in 1..time {
        let d = (time - i) * i;

        if d > distance {
            wins += 1;
        }
    }

    return wins;
}

fn main() {
    println!("Part 1: {}", part1());
    println!("Part 1: {}", part2());
}
