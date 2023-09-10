import { setFailed } from "@actions/core"
import { statusMatrix } from "isomorphic-git"
import * as fs from "fs"

async function main() {
  const matrix = await statusMatrix({ fs, dir: process.cwd() })
  let modifiedFiles: string[] = []
  matrix.forEach((row) => {
    if (row[2] !== 1) {
      modifiedFiles.push(row[0])
    }
  })
  if (modifiedFiles.length) {
    setFailed(`The following files have been modified: ${modifiedFiles.join(", ")}`)
  }
}

main()
