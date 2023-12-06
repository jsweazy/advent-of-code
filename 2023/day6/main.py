input = open("input").read().strip().split("\n")
times = [int(x) for x in input[0].split(":")[1].split()]
distances = [int(x) for x in input[1].split(":")[1].split()]

def p1():
  a = 1;

  for i, time in enumerate(times):
    wins = 0;
    for j in range(time):
      if (time - j) * j > distances[i]:
        wins += 1;
    a *= wins;
  
  return a;

def p2():
  time = int(''.join(str(x) for x in times));
  distance = int(''.join(str(x) for x in distances));
  wins = 0;
  for j in range(time):
    if (time - j) * j > distance:
      wins += 1;

  return wins;

print("Part 1:", p1())
print("Part 2:", p2())