import process     from 'process'
import path        from 'path'
import invariant   from 'invariant'
import chalk       from 'chalk'
import * as helper from 'services/helper'
import taskApi     from 'services/task-api'
import config      from 'config'

export function tasks({ flags, args }) {
  return commandRunner({
    flags,
    args,
    defaultDir: config.defaultTaskDir,
    name: 'TASKS',
  })
}

export function buildorders({ flags, args }) {
  return commandRunner({
    flags,
    args,
    defaultDir: config.defaultBuildOrdersDir,
    name: 'BUILD ORDER',
  })
}

async function commandRunner({ flags, args, defaultDir, name }) {

  const cwd = process.cwd()
  const handlers = extractHandlers({
    cwd,
    names: args,
    defaultDir,
  })

  // set default flags
  flags.babelOutdir = flags.babelOutdir || 'build'

  const projectRootPath = await helper.getProjectRootPath()
  await helper.mapAsync(handlers, async (fn, i) => {
    helper.taskApiLogHeader(name, args[i])
    console.log(``)

    // callsite for task functions
    await fn({
      flags,
      env: {
        cwd,
        projectRootPath,
      },
      taskApi,
    })

    helper.taskApiLogHeader(`END ${name}`, args[i])
    console.log(``)
  })

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
function extractHandlers({
  names,
  cwd,
  defaultDir,
}) {
  return names.map(name => {
    const cwdFilePath = path.resolve(cwd, name)
    const defaultFilePath = path.resolve(defaultDir, name)

    const handlerPath = path.extname(name) !== '' && helper.fileExists(cwdFilePath)
      ? cwdFilePath
      : helper.fileExists(defaultFilePath)
        ? defaultFilePath
        : null
    invariant(handlerPath, `${name} is not a file or a default`)

    const handler = require(handlerPath).default || require(handlerPath)
    invariant(handler || typeof handler === 'function', `${name} must export a function`)
    return handler
  })
}
