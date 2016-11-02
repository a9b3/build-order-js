import process from 'process'
import path from 'path'
import * as helper from '../helper.js'
import taskApi from '../task-api.js'
import config from '../config.js'
import chalk from 'chalk'

async function runTasks(taskHandlers, taskNames, opts) {
  opts.taskApi = taskApi
  for (let i = 0; i < taskHandlers.length; i++) {
    console.log(`[Running task ${taskNames[i]}]`)
    await taskHandlers[i](opts)
    console.log(chalk.green(`[${taskNames[i]} finished successfully]`))
  }
}

export default async function tasks({ options, args:taskNames }) {
  const cwd = process.cwd()
  // check tasks validity first
  const taskHandlers = taskNames.map(taskName => {
    // check if path exists else check in default taskNames directory
    let taskPath
    if (helper.fileExists(path.resolve(cwd, taskName))) {
      taskPath = path.resolve(cwd, taskName)
    } else if (helper.fileExists(path.resolve(config.defaultTaskDir, taskName))) {
      taskPath = path.resolve(config.defaultTaskDir, taskName)
    }
    if (!taskPath) {
      throw new Error(`'${taskName}' is not a file or a default task`)
    }

    // check if taskPath exports a function
    const taskHandler = require(taskPath).default || require(taskPath)
    if (!taskHandler || typeof taskHandler !== 'function') {
      throw new Error(`'${taskName}' must export a function`)
    }
    return taskHandler
  })

  const projectRootPath = await helper.getProjectRootPath()
  await runTasks(taskHandlers, taskNames, {
    env: {
      cwd,
      projectRootPath,
    },
  })

  console.log(chalk.green(`All done!`))
}
