import { readFile } from "./helpers.js";
import { MinHeap } from '@datastructures-js/heap'

const path = "day8.txt";

const data = await readFile(path)
const input = data.toString().split('\n').map(row => row.split(''))

const sample = `30373
25512
65332
33549
35390`.split('\n').map(row => row.split(''))

function getScenicScore(position: number[], graph: string[][]) {
  // console.log(position,'right', countLookingRight(position, graph))
  // console.log(position, 'left', countLookingLeft(position, graph))
  // console.log(position, 'down', countLookingDown(position, graph))
  // console.log(position, 'up', countLookingUp(position, graph))
  const score =  countLookingRight(position, graph) * 
  countLookingLeft(position, graph) * 
  countLookingUp(position, graph) * 
  countLookingDown(position, graph)
  // console.log(position, score)
  if (score === 0) {
    throw new Error('cant have 0')
  }
  return score
}
function countLookingRight(position: number[], graph: string[][]) {
  const [row,col] = position
  const wide = Number(graph[0].length)
  let tallestSoFar = Number(graph[row][col])
  const coordsMax = [row, col]
  let isTallestTreeInLineOfSight = true
  for(let i = col + 1; i < wide - 1; i++) { // col increase
    if (Number(graph[row][i]) >= tallestSoFar) {
      coordsMax[1] = i
      //Found visible tree
      // visibleCount += 1
      // interiorVisibleCoords.add(`[${row}-${col}]`)
      tallestSoFar = Number(graph[row][i])
      isTallestTreeInLineOfSight = false
      break
    }
  }

  // How many trees behind the tallest tree?
  return isTallestTreeInLineOfSight ? wide - 1 - col : Math.max(coordsMax[1] - col, 1)
}

function countLookingLeft(position: number[], graph: string[][]) {
  const [row, col] = position
  let tallestSoFar = Number(graph[row][col])
  const coordsMax = [row, col]
  let isTallestTreeInLineOfSight = true
  for(let i = col - 1; i > 0; i--) { // col decrease
    
    if (Number(graph[row][i]) >= tallestSoFar) {
      coordsMax[1] = i
      //Found visible tree
      // visibleCount += 1
      // interiorVisibleCoords.add(`[${row}-${col}]`)
      tallestSoFar = Number(graph[row][col])  
      isTallestTreeInLineOfSight = false
      break
    }
  }

  return isTallestTreeInLineOfSight ? col : Math.max(col - coordsMax[1], 1)
}

function countLookingUp(position: number[], graph: string[][]) {
  const [row, col] = position
  let tallestSoFar = Number(graph[row][col])
  const coordsMax = [row, col]
  let isTallestTreeInLineOfSight = true
  for(let i = row - 1; i > 0; i--) { //row decrase
    // console.log('r', row, 'c', col)
    if (Number(graph[i][col]) >= tallestSoFar) {
      coordsMax[0] = i
      //Found visible tree
      // visibleCount += 1
      // interiorVisibleCoords.add(`[${row}-${col}]`)
      tallestSoFar = Number(graph[i][col])
      isTallestTreeInLineOfSight = false
      break
    }
  }

  return isTallestTreeInLineOfSight ? row : Math.max(row - coordsMax[0], 1)
}

function countLookingDown(position: number[], graph: string[][]) {
  const [row, col] = position
  let tallestSoFar = Number(graph[row][col])
  const coordsMax = [row, col]
  const depth = graph.length
  let isTallestTreeInLineOfSight = true
  for(let i = row + 1; i < depth - 1; i++) { // row increase
    if (Number(graph[i][col]) >= tallestSoFar) {
      coordsMax[0] = i
      //Found visible tree
      // visibleCount += 1
      // interiorVisibleCoords.add(`[${row}-${col}]`)
      tallestSoFar = Number(graph[i][col]) 
      isTallestTreeInLineOfSight = false
      break
    }
  }

  return isTallestTreeInLineOfSight ? depth - 1 - row :  Math.max(coordsMax[0] - row, 1)
}

function day8(input: string[][]) {
  const depth = input.length
  const wide = input[0].length

  const interiorVisibleCoords = new Set([])
  
  let visibleCount = depth * 2 + (wide - 2) * 2
  // look right
  for(let row = 1; row< depth - 1; row++) { // row increase
    let tallestSoFar = Number(input[row][0])
    for(let col = 1; col < wide - 1; col++) { // col increase
      if (Number(input[row][col]) > tallestSoFar) {
        //Found visible tree
        // visibleCount += 1
        interiorVisibleCoords.add(`[${row}-${col}]`)
        tallestSoFar = Number(input[row][col])
      }
    }
  }

  //look to the left
  for(let row = 1; row< depth - 1; row++) { // row increase
    let tallestSoFar = Number(input[row][wide-1])
    for(let col = wide - 1; col > 0; col--) { // col decrease
      if (Number(input[row][col]) > tallestSoFar) {
        //Found visible tree
        // visibleCount += 1
        interiorVisibleCoords.add(`[${row}-${col}]`)
        tallestSoFar = Number(input[row][col])  
      }
    }
  }

  // Scan top to bottom
  for(let col = 1; col < wide - 1; col++) { //col increate
    let tallestSoFar = Number(input[0][col])
    for(let row = 1; row < depth - 1; row++) { // row increase
      if (Number(input[row][col]) > tallestSoFar) {
        //Found visible tree
        // visibleCount += 1
        interiorVisibleCoords.add(`[${row}-${col}]`)
        tallestSoFar = Number(input[row][col]) 
      }
    }
  }

  // Scan bottom to top
  for(let col = 1; col < wide - 1; col++) { //col increase
    let tallestSoFar = Number(input[depth-1][col])
    for(let row = depth - 2; row > 0; row--) { //row decrase
      // console.log('r', row, 'c', col)
      if (Number(input[row][col]) > tallestSoFar) {
        //Found visible tree
        // visibleCount += 1
        interiorVisibleCoords.add(`[${row}-${col}]`)
        tallestSoFar = Number(input[row][col])
      }
    }
  }

  const scenicScores = new Map()
  let maxScore = 0
  for(let row = 1; row < depth-1; row++) {
    for(let col = 1; col < wide-1; col++) {
      maxScore = Math.max(Math.abs(getScenicScore([row, col], input)), maxScore)
    }
  }

  console.log('MAx scenic score: ', maxScore)

  return visibleCount + interiorVisibleCoords.size
  // Scan top to bottom

  // Scan bottom to top
}

console.log(day8(input))