import chalk    from 'chalk'
import { exec } from 'child_process'
import fs       from 'fs-extra'
import path     from 'path'

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

/**
 * returns project root based on where .git is located in the ancestor nodes
 *
 * @returns {String} project root dir
 */
export async function getProjectRootPath() {
  try {
    const res = await execPromise('git rev-parse --show-toplevel')
    return res.trim()
  } catch (e) {
    return ''
  }
}

/**
 * @param {String} command - check if command line tool exists ex. 'git', 'npm'
 * @returns {Boolean}
 */
// TODO this might need to be improved on to not use 'which'
export async function isCommandInstalled(command) {
  const res = await execPromise(`which ${command}`)
  return Boolean(res.trim())
}

/**
 * Check if commands are installed
 *
 * ex.
 *
 * [['yarn', 'npm'], 'git']
 * =
 * ('yarn' || 'npm') && 'git'
 *
 * @param {Array.<String>} commands - refer to ex
 * @returns {Boolean}
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
    for (const key in b) {
      // eslint-disable-line
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

    // IMPORTANT: this is not allowing arr dupes
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
  const c = a
  return _deepMergeJson(a, b, c, opts)
}

export function requireJson(filepath) {
  return JSON.parse(fs.readFileSync(filepath, 'utf8'))
}

export function padString(str, char, limit) {
  const diff = limit - str.length
  return str + ' ' + char.repeat(diff - 1)
}

export function leftPad(str, char = '', leftPadAmt = 0) {
  return str
    .split('\n')
    .map(line => char.repeat(leftPadAmt) + line)
    .join('\n')
}

export function taskAPILogHeader(header, taskName, color) {
  const str = padString(`${header}: [${taskName}]`, '*', 80)
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

/**
 * Array.map for async functions
 *
 * async/await style
 * const res = await mapAsync([asyncFn, asyncFn], async (fn) => await fn())
 *
 * promise style
 * mapAsync([foo, foo], fn => fn())
 * .then(res => {
 *   console.log(res)
 * })
 *
 * @param {Array.<Promise>} arr - Array of async functions/promises
 * @param {Function} callback - Accepts async function as argument
 * @returns {Promise}
 */
export async function mapAsync(arr, callback) {
  const results = []
  for (let i = 0; i < arr.length; i++) {
    results.push(await callback(arr[i], i))
  }
  return results
}

/**
 * Recursively walk a file tree starting at src
 *
 * @param {String} src - file path
 * @param {Function} callback - Will be passed (file, stat)
 * @returns {Array.<Any>} Array of returns from callback
 */
export function walk(src, callback, results = []) {
  if (!fs.existsSync(src)) {
    return results
  }

  const stat = fs.lstatSync(src)
  if (stat.isDirectory()) {
    fs.readdirSync(src).forEach(file => {
      const filepath = path.resolve(src, file)
      results.concat(walk(filepath, callback, results))
    })
    results.push(callback(src, stat))
  } else {
    results.push(callback(src, stat))
  }
  return results
}

/**
 * @param {String} src - file path
 * @returns{Array.<String>} Array of filepaths deleted
 */
export function rmdir(src) {
  return walk(src, (file, stat) => {
    stat.isDirectory() ? fs.rmdirSync(file) : fs.unlinkSync(file)
    return file
  })
}

/**
 * Copy src to dest
 *
 * @param {String} src - file path
 * @param {String} dest - file path
 */
export function copyFile(src, dest, opts = { encoding: 'utf8' }) {
  const fileContent = fs.readFileSync(src, opts)
  fs.writeFileSync(dest, fileContent, opts)
}

/**
 * Copy src to dest recursively
 *
 * @param {String} src - file path
 * @param {String} dest - file path
 */
export function copy(src, dest, { overwrite = false } = {}) {
  const stat = fs.lstatSync(src)
  if (stat.isDirectory()) {
    if (fs.existsSync(dest) && overwrite) {
      rmdir(dest)
    }
    fs.mkdirSync(dest)

    const files = fs.readdirSync(src)
    files.forEach(file => {
      const filePath = path.resolve(src, file)
      const destFilePath = path.resolve(dest, file)
      copy(filePath, destFilePath)
    })
  } else {
    copyFile(src, dest)
  }
}

/**
 * concatMappedArrays(['one', 'two'], {
 *   one: [1],
 *   two: [2],
 *   three: [3],
 * })
 * => [1,2]
 */
export function concatMappedArrays(keys, mappedArrays) {
  return keys.reduce((arr, key) => {
    if (!mappedArrays[key]) {
      return arr
    }
    if (mappedArrays[key].constructor !== Array) {
      return arr
    }

    return arr.concat(mappedArrays[key])
  }, [])
}

/**
 * requires a json file, executes a deep merge, and then writes the merged
 * content back into the json file
 * *might want to consider separating the file operation from the merge
 * operation
 *
 * @param {Object} opts
 * @param {Object} json - json to merge
 * @param {String} dest - destination file path of json file to merge into
 */
export function mergeToJsonFile({ json: jsonToMerge, dest }) {
  const json = requireJson(dest)

  // log out the merging json
  const jsonStr = JSON.stringify(jsonToMerge, null, '  ')
  const paddedJsonStr = leftPad(jsonStr, ' ', 2)
  console.log(chalk.yellow(`\n  Merging -> ${dest}`))
  console.log(chalk.yellow(paddedJsonStr))
  console.log(``)

  const mergedJson = deepMergeJson(json, jsonToMerge)
  fs.writeFileSync(dest, JSON.stringify(mergedJson, null, '  '))
}
