import { readFile } from "./helpers.js";

const path = "day6.txt";

const data = await readFile(path)
const input = data.toString()
const sample = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'

function part1(input: string, messageSize = 4) {
  const window: {
    [key: string]: number
  } = {}
  let r = 0
  let l = 0
  while (r < input.length) {
    if (!window[input[r]]) {
      window[input[r]] = 0
    }

    // Read value at right pointer
    window[input[r]] += 1
    if (Object.values(window).length >= 4 && Object.values(window).filter(Boolean).every(val => val === 1)) {
      // Found window with unique chars
      break
    }

    if (r - l < messageSize -1) {
      // Grow window
      r += 1
    } else if (r-l === messageSize -1) {
      // Slide window
      r += 1
      // Remove value at left prior to incrementing it
      window[input[l]] -= 1
      l += 1
    }
  }

  console.log(r + 1)
}

console.log(part1(input, 14))