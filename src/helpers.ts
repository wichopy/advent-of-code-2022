import fs from 'fs/promises'

export async function readFile(path: string) {
  return fs.readFile(new URL(path, import.meta.url))
}