import { readFile } from "./helpers.js";

const path = "day5.txt";

const splitByNewLine = (s: string) => s.split("\n");

const file = await readFile(path);
const array = splitByNewLine(file.toString());

const sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const EMPTY_SPOT = '   '
const END_OF_INITIAL_STATE = ''

function processRow(str: string) {
  let i = 0
  let colNum = 1
  const state: {
    [col: number]: string
  } = {}
  while (i < str.length) {
    const crate = str.slice(i, i+3)
    if (crate === EMPTY_SPOT) {
      i += 4
      colNum += 1
      continue
    }
    if (crate === ' 1 ') {
      // labels
      return state
    }

    state[colNum] = crate.charAt(1)
    colNum += 1
    i+=4
  }

  return state
}

function part1(input: string[], multipicker = false) {
  // process starting position
  const state: {
    [col: number]: string[]
  } = {}
  let initializingState = true
  for (let i = 0; i < input.length; i++) {
    if (initializingState) {
      if (input[i] === END_OF_INITIAL_STATE) {
        initializingState = false
        continue
      }
      const row = processRow(input[i])
      Object.entries(row).forEach(entry => {
        if (!state[Number(entry[0])]) {
          state[Number(entry[0])] = []
        }
        state[Number(entry[0])].push(entry[1])
      })
      continue
    }

    const [,amount,,start,,end] = input[i].split(' ')
    if (multipicker) {
      state[Number(end)] = [...state[Number(start)].slice(0, Number(amount)), ...state[Number(end)]]
      state[Number(start)] = state[Number(start)].slice(Number(amount))  
      continue
    }

    // The single picker path
    for (let moveIndex= 0; moveIndex < Number(amount); moveIndex++) {
      state[Number(end)].unshift(state[Number(start)].shift())
    }
  }

  console.log(Object.values(state).reduce((result, curr) => result + curr[0], ''))
}

console.log(part1(array))
console.log(part1(array, true))