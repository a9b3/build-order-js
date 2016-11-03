import fs from 'fs-extra'
import chalk from 'chalk'
import { exec } from 'child_process'
import path from 'path'

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
  try {
    const res = await execPromise('git rev-parse --show-toplevel')
    return res.trim()
  } catch (e) {
    return ''
  }
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

function _deepMergeJson(a, b, c, opts = {}) {
  if (a.constructor === Object) {
    for (let key in b) {
      if (!c[key]) {
        c[key] = b[key]
      } else {
        c[key] = _deepMergeJson(a[key], b[key], c[key], opts)
      }
    }
  } else if (a.constructor === Array) {
    if (b.constructor !== Array) {
      throw new Error(`Cannot merge ${a} with ${b} not the same type`)
    }

    /* IMPORTANT: this is not allowing arr dupes */
    for (let i = 0; i < b.length; i++) {
      if (a.indexOf(b[i]) === -1) {
        a = a.concat(b)
      }
    }
    return a
  } else {
    return opts.override ? b : a
  }

  return c
}

export function deepMergeJson(a, b, opts) {
  let c = a
  return _deepMergeJson(a, b, c, opts)
}

export function requireJson(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}

export function padString(str, char, limit) {
  const diff = limit - str.length
  return str + ' ' + char.repeat(diff-1)
}

export function leftPad(str, char = '', leftPadAmt = 0) {
  return str.split('\n').map(line => char.repeat(leftPadAmt) + line).join('\n')
}

export function taskApiLogHeader(taskName, color) {
  const str = padString(`TASK: [${taskName}]`, '*', 80)
  color ? console.log(chalk[color](str)) : console.log(str)
}

export function relativeDest(v, key, desc) {
  const old = desc.value

  desc.value = async function(opts, ...args) {
    const projectRootPath = await getProjectRootPath()
    opts.dest = path.resolve(projectRootPath, opts.dest)

    return old.call(this, opts, ...args)
  }

  return desc
}
