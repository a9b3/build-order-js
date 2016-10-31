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

export default async function tasks({ options, args:tasks }) {
  const cwd = process.cwd()
  // check tasks validity first
  const taskHandlers = tasks.map(task => {
    // check if path exists else check in default tasks directory
    let taskPath
    if (helper.fileExists(path.resolve(cwd, task))) {
      taskPath = path.resolve(cwd, task)
    } else if (helper.fileExists(path.resolve(config.defaultTaskDir, task))) {
      taskPath = path.resolve(config.defaultTaskDir, task)
    }
    if (!taskPath) {
      throw new Error(`'${task}' is not a file or a default task`)
    }

    // check if taskPath exports a function
    const taskHandler = require(taskPath).default || require(taskPath)
    if (!taskHandler || typeof taskHandler !== 'function') {
      throw new Error(`'${task}' must export a function`)
    }
    return taskHandler
  })

  const projectRootPath = await helper.getProjectRootPath()
  await runTasks(taskHandlers, tasks, {
    env: {
      cwd,
      projectRootPath,
    },
  })

  console.log(chalk.green(`All done!`))
}
