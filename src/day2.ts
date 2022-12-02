import { readFile } from "./helpers.js";

const file = await readFile("day2Input.txt");
const array = file.toString().split("\n");

// X: lose
// Y: draw
// Z: win
const mapping: Record<string, choice> = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
  A: "rock",
  B: "paper",
  C: "scissors",
};

const choiceScoring = {
  scissors: 3,
  paper: 2,
  rock: 1,
};

type choice = "scissors" | "rock" | "paper";

function decode(input: string[]) {
  // console.log(input)
  let score = 0;
  let losses = 0
  let draws = 0
  let wins = 0
  input.forEach((value) => {
    const [oppRaw, meRaw] = value.split(" ") as string[];
    let opp = mapping[oppRaw]
    let me = mapping[meRaw]
    // console.log(opp, me)
    
    score += choiceScoring[me];

    if (
      opp === 'paper' && me === 'rock'
      || opp === 'rock' && me === 'scissors'
      || opp === 'scissors' && me === 'paper'
    ) {
      losses += 1
      return
    }

    if (opp === me) {
      score += 3
      draws += 1
      return
    }

    score += 6
    wins += 1
  });

  return { mapping, score, losses, draws, wins, } 
}

console.log(decode(array));
