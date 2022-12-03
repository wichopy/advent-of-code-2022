import { readFile } from "./helpers.js";

const file = await readFile("day3.txt");
const array = file.toString().split("\n");

function calcPriorityValue(foundLetter: string) {
  return foundLetter.charCodeAt(0) >= 97
    ? foundLetter.charCodeAt(0) - 96 // a-z [1-26]
    : foundLetter.charCodeAt(0) - 38; // A-Z [27-52]
}

function itemPriorities(input: string[]) {
  let sum = 0;
  input.forEach((value, index) => {
    const first = value.slice(0, value.length / 2);
    const second = value.slice(value.length / 2);
    let found = false;
    let foundLetter;
    for (let i = 0; i < first.length; i++) {
      const charLeft = first.charAt(i);

      for (let j = 0; j < second.length; j++) {
        if (charLeft === second.charAt(j)) {
          found = true;
          break;
        }
      }

      if (found) {
        foundLetter = charLeft;
        break;
      }
    }

    sum += calcPriorityValue(foundLetter);
  });
  return sum;
}

function groupsOfThree(input: string[]) {
  let sum = 0;
  let foundLetter;
  for (let i = 0; i < input.length; i += 3) {
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i].charAt(j);
      const regex = new RegExp(char);
      if (regex.test(input[i + 1]) && regex.test(input[i + 2])) {
        foundLetter = char;
        break;
      }
    }

    if (foundLetter) {
      sum += calcPriorityValue(foundLetter);
      continue;
    }

  }

  return sum;
}

const sample = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

console.log(itemPriorities(array));
console.log(groupsOfThree(array));
