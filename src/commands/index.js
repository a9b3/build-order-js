import chalk                  from 'chalk'
import config                 from 'config'
import fs                     from 'fs'
import * as helper            from 'helper'
import invariant              from 'invariant'
import path                   from 'path'
import process                from 'process'
import taskAPI                from 'taskAPI'
import { getProjectRootPath } from 'utils/shellAliases'

/*****************************************************************************
 * COMMANDS
 *****************************************************************************/

/*
 * list folders for 'buildorders'
 */
export async function list() {
  const dir = config.DEFAULT_BUILD_ORDERS_DIR

  const names = (await flatWalk(
    dir,
    name => fs.lstatSync(path.resolve(dir, name)).isDirectory() && name,
  )).filter(a => a)

  names.forEach(name => {
    console.log(name)
  })
}

/*
 * executes a buildorder
 */
export function buildorders({ flags, args }) {
  return commandRunner({
    flags,
    args,
    defaultDir: config.DEFAULT_BUILD_ORDERS_DIR,
    name: 'BUILD ORDER',
  })
}

/*****************************************************************************
 * HELPERS
 *****************************************************************************/

/*
 * runs either buildorder or tasks
 */
async function commandRunner({ flags, args, defaultDir, name }) {
  const cwd = process.cwd()
  const handlers = extractHandlers({
    cwd,
    names: args,
    defaultDir,
  })

  const projectRootPath = await getProjectRootPath()
  Promise.all(
    handlers.map(async (fn, i) => {
      helper.taskAPILogHeader(name, args[i])
      console.log(``)

      // callsite for task functions
      await fn({
        flags,
        env: {
          cwd,
          projectRootPath,
        },
        taskAPI,
      })

      helper.taskAPILogHeader(`END ${name}`, args[i])
      console.log(``)
    }),
  )

  console.log(chalk.green(`All done!`))
}

// names is an array of
// - filepaths relative to cwd
// or
// - default dir folder

/**
 * @param {Object} opts
 * @param {Array.<String>} names - json to merge
 * @param {String} cwd - return of process.cwd()
 * @param {String} defaultDir
 */
function extractHandlers({ names, cwd, defaultDir }) {
  return names.map(name => {
    const cwdFilePath = path.resolve(cwd, name)
    const defaultFilePath = path.resolve(defaultDir, name)

    const handlerPath =
      path.extname(name) !== '' && fs.existsSync(cwdFilePath)
        ? cwdFilePath
        : fs.existsSync(defaultFilePath) ? defaultFilePath : null
    invariant(handlerPath, `${name} is not a file or a default`)

    const handler = require(handlerPath).default || require(handlerPath)
    invariant(
      handler || typeof handler === 'function',
      `${name} must export a function`,
    )
    return handler
  })
}

/*
 * flatWalk
 */
async function flatWalk(dir, cb) {
  const files = fs.readdirSync(dir)

  const res = []
  for (let i = 0; i < files.length; i++) {
    res.push(await cb(files[i]))
  }
  return res
}
