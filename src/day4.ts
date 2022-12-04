// import * as IntervalTree from '@davidisaaclee/interval-tree'
import { readFile } from './helpers.js'

const path = 'day4.txt'

const splitByNewLine = (s: string) => s.split('\n')

const splitByComma = (s: string) => s.split(',')

const file = await readFile(path)

//process
const array = splitByNewLine(file.toString()).map(splitByComma)

const sample = [
  '2-4,6-8',
'2-3,4-5',
'5-7,7-9',
'2-8,3-7',
'6-6,4-6',
'2-6,4-8',
].map(splitByComma)

function part1(input: string[][]) {
  let count = 0
  input.forEach(pair => {
    const [sec1, sec2] = pair
    const range1 = sec1.split('-')
    const range2 = sec2.split('-')

    if (~~range1[0] <= ~~range2[0] && ~~range1[1] >= ~~range2[1]) {
      count += 1
    } else if (~~range2[0] <= ~~range1[0] && ~~range2[1] >= ~~range1[1])  {
      count += 1
    }
  })

  return count
}

console.log(part1(array))