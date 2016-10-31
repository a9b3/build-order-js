import fs from 'fs-extra'
import chalk from 'chalk'
import { exec } from 'child_process'

/*
 * const text = await execPromise('echo hi')
 * => text = 'hi'
 *
 * returns stdout
 */
export function execPromise(execCommand, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = exec(execCommand, { async: true })

    let allData = ''
    child.stdout.on('data', data => {
      if (opts.log) {
        console.log(chalk.grey(data))
      }
      allData += data
    })

    child.on('close', code => {
      if (code > 100) reject(new Error(`exit code ${code}`))
      resolve(allData)
    })
  })
}

export function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.F_OK)
    return true
  } catch (e) {
    return false
  }
}

/*
 * returns project root based on where .git is located in the ancestor nodes
 */
export async function getProjectRootPath() {
  const res = await execPromise('git rev-parse --show-toplevel')
  return res.trim()
}

// TODO this might need to be improved on to not use 'which'
export async function isCommandInstalled(command) {
  const res = await execPromise(`which ${command}`)
  return Boolean(res.trim()) ? true : false
}

/*
 * [['yarn', 'npm'], 'git']
 * =
 * ('yarn' || 'npm') && 'git'
 */
export async function areCommandsInstalled(commands) {
  for (let i = 0; i < commands.length; i++) {
    const checkForThese = [].concat(commands[i])

    let hasTheseCommands
    for (let j = 0; j < checkForThese.length; j++) {
      if (hasTheseCommands) {
        break
      }
      hasTheseCommands = await isCommandInstalled(checkForThese[j])
    }

    if (!hasTheseCommands) {
      throw new Error(`Missing dependencies '${checkForThese}'`)
    }
  }

  return false
}
