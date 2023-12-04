use std::{
    fs::File,
    io::{BufRead, BufReader},
};

fn main() {
    let file = File::open("input").expect("Can't open file");
    let buf = BufReader::new(file);

    let lines: Vec<String> = buf
        .lines()
        .map(|l| l.expect("Could not parse line"))
        .collect::<Vec<String>>();

    let mut points = 0;
    let mut totals = vec![1; lines.len()];

    for (idx, line) in lines.iter().enumerate() {
        let parts = line.split(": ").collect::<Vec<&str>>();
        let all_nums = parts[1];
        let num_parts = all_nums.split(" | ").collect::<Vec<&str>>();
        let winning_nums = num_parts[0].split(" ").collect::<Vec<&str>>();
        let nums = num_parts[1].split(" ").collect::<Vec<&str>>();

        let mut winners = nums
            .iter()
            .filter(|&n| winning_nums.contains(n) && !n.is_empty())
            .cloned()
            .collect::<Vec<&str>>();

        winners.sort();
        winners.dedup();

        if winners.len() > 0 {
            let p = i32::pow(2, (winners.len() - 1) as u32);
            points += i32::pow(2, (winners.len() - 1) as u32);
        }

        let total = totals[idx];

        for i in 1..winners.len() + 1 {
            totals[idx + i] += total;
        }
    }

    let total_cards = totals.into_iter().map(|t| t as i32).sum::<i32>();

    println!("Points: {:?}", points);
    println!("Totals cards: {:?}", total_cards);
}
