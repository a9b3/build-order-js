import chalk from 'chalk'
import fs from 'fs'
import invariant from 'invariant'
import path from 'path'
import process from 'process'

import config from 'config'
import taskAPI from 'taskAPI'
import { getProjectRootPath } from 'utils/shellAliases'
import { taskAPILogHeader } from 'utils/stringFormatter'

/*
 * list prints name of all the buildorders
 */
export async function list() {
  const dir = config.DEFAULT_BUILD_ORDERS_DIR
  fs
    .readdirSync(dir)
    .map(
      filename =>
        fs.lstatSync(path.resolve(dir, filename)).isDirectory() && filename,
    )
    .filter(Boolean)
    .forEach(name => console.log(name))
}

/*
 * buildorders executes a buildorder
 */
export async function buildorders({ flags, args }) {
  const taskHeader = 'BUILD ORDER'
  const name = args[0]
  taskAPILogHeader(taskHeader, name)
  const handler = _requireHandlerRelative({ name })
  await handler({
    flags,
    env: { cwd: process.cwd(), projectRootPath: await getProjectRootPath() },
    taskAPI,
  })
  taskAPILogHeader(`END ${taskHeader}`, name)
  console.log(chalk.green(`All done!`))
}

/**
 * _requireHandlerRelative returns functions from files relative to defaultDir
 *
 * @param {string} name - names are basenames in directory
 * config.DEFAULT_BUILD_ORDERS_DIR
 * @param {string} defaultDir
 * @returns {array.<function>}
 */
function _requireHandlerRelative({
  name,
  defaultDir = config.DEFAULT_BUILD_ORDERS_DIR,
}) {
  const handlerPath = path.resolve(defaultDir, name)
  invariant(fs.existsSync(handlerPath), `${name} is not a file or a default`)
  const handler = require(handlerPath).default || require(handlerPath)
  invariant(
    handler || typeof handler === 'function',
    `${name} must export a function`,
  )
  return handler
}
