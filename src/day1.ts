import fs from 'fs/promises'
import { MaxHeap } from '@datastructures-js/heap'

const FILE_PATH = 'day1Input.txt'
const SEPERATOR = ''

async function readFile(path: string) {
  return fs.readFile(new URL(path, import.meta.url))
}

const inputFile = await readFile(FILE_PATH)
const array = inputFile.toString().split('\n')

function findMaxCalorieElf(input: string[]) {
  let done = false
  let i = 0
  let currentCalorieCount = 0
  const numbersHeap = new MaxHeap<number>()

  while (!done) {
    if (input[i] === undefined) {
      done = true
      continue
    }

    if (input[i] === SEPERATOR) {
      numbersHeap.insert(currentCalorieCount)

      currentCalorieCount = 0
      i += 1
      continue
    }

    currentCalorieCount += ~~input[i]
    i += 1
  }

  const top3: number[] = []
  top3[0] = numbersHeap.extractRoot()
  top3[1] = numbersHeap.extractRoot()
  top3[2] = numbersHeap.extractRoot()

  return {
    max: top3[0],
    top3Total: top3.reduce((sum, curr) => {
      return sum + curr
    }, 0)
  }
}

console.log(findMaxCalorieElf(array))
