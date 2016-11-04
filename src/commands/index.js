import process from 'process'
import * as helper from '../helper.js'
import taskApi from '../task-api.js'
import config from '../config.js'
import chalk from 'chalk'

async function commandRunner({ options, args, defaultDir, name }) {

  const cwd = process.cwd()
  const handlers = helper.extractHandlers({
    cwd,
    names: args,
    defaultDir,
  })

  const projectRootPath = await helper.getProjectRootPath()
  await helper.mapAsync(handlers, async (fn, i) => {
    helper.taskApiLogHeader(name, args[i])
    console.log(``)

    await fn({
      options,
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

export function tasks({ options, args }) {
  return commandRunner({ options, args, defaultDir: config.defaultTaskDir, name: 'TASKS' })
}

export function buildorders({ options, args }) {
  return commandRunner({ options, args, defaultDir: config.defaultBuildOrdersDir, name: 'BUILD ORDER' })
}
