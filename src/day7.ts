import { readFile } from "./helpers.js";
import { MinHeap } from '@datastructures-js/heap'

const path = "day7.txt";

const data = await readFile(path)
const input = data.toString().split('\n')
const sample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split('\n')

interface File {
  type: 'file'
  size: number
  name: string
}

interface Directory {
  type: 'directory'
  name: string
  totalSize: number
  parent: null | Directory
  children: (File | Directory)[]
}

const ChangeDirectory = '$ cd'
const ListDirectory = '$ ls'

const TotalSize = 70000000
const MinSpaceNeeded = 30000000

function part1(input: string[]) {
  const root: Directory = {
    name: '/',
    totalSize: null,
    children: [],
    parent: null,
    type: 'directory',
  }
  let pwd = root
  let captureLs = false
  for (let i = 0; i< input.length; i++) {
    const stdOut = input[i]
    if (stdOut === '$ cd /') {
      // We already initialize root above
      continue
    }
    if (stdOut === ListDirectory) {
      captureLs = true
      continue
    }

    if (stdOut.startsWith('$ cd')) {
      const [,,directoryName] = stdOut.split(' ')
      if (directoryName === '..') {
        pwd = pwd.parent
        continue
      }

      const foundDir = pwd.children.find(fileOrDir => {
        if (fileOrDir.type === 'file') {
          return false
        }
        
        if (fileOrDir.name === directoryName) {
          return true
        }
      })

      if (!foundDir) {
        throw new Error('no directory with this name found')
      }

      pwd = foundDir as Directory
      continue
    }

    if (captureLs) {
      const [tok1, tok2] = stdOut.split(' ')
      if (isNaN(Number(tok1))) {
        pwd.children.push({
          name: tok2,
          totalSize: null,
          children: [],
          type: 'directory',
          parent: pwd
        })
      } else {
        pwd.children.push({
          size: Number(tok1),
          name: tok2,
          type: 'file'
        })
      }
    }
  }

  let sumOfDirectoriesLessThan10000 = 0
  const minHeap = new MinHeap<Directory>((dir) => dir.totalSize)
  function calcSizeOfChildren(dir: Directory) {
    let totalSize = 0
    for (let i = 0; i < dir.children.length; i++) {
      const fileOrDir = dir.children[i]

      if (fileOrDir.type === 'file') {
        totalSize += fileOrDir.size
      }

      if (fileOrDir.type === 'directory') {
        totalSize += calcSizeOfChildren(fileOrDir)
      }
    }
    // console.log(dir.name, totalSize)
    if (totalSize <= 100000) {
      sumOfDirectoriesLessThan10000 += totalSize
    }
    dir.totalSize = totalSize
    minHeap.push(dir)
    console.log(totalSize, dir.name)
    return totalSize
  }

  const usedSpace = calcSizeOfChildren(root)
  const unusedSpace = TotalSize - usedSpace
  
  console.table({
    unusedSpace,
    usedSpace,
  })

  let minDir = minHeap.pop()
  while(minDir.totalSize + unusedSpace < MinSpaceNeeded) {
    console.log('still too small, need a bigger dir', usedSpace - minDir.totalSize)
    console.log(minDir.totalSize)
    minDir = minHeap.pop()
  }

  console.log(minDir.name, minDir.totalSize)
}

console.log(part1(input))