import process from 'process'
import * as helper from '../helper.js'
import taskApi from '../task-api.js'
import config from '../config.js'
import chalk from 'chalk'

export default async function buildorders({ options, args:buildOrderNames }) {

  const cwd = process.cwd()
  const handlers = helper.extractHandlers({
    cwd,
    names: buildOrderNames,
    defaultDir: config.defaultBuildOrdersDir,
  })

  const projectRootPath = await helper.getProjectRootPath()
  await helper.mapAsync(handlers, async (fn, i) => {
    helper.taskApiLogHeader('BUILD ORDER', taskNames[i])
    console.log(``)

    await fn({
      options,
      env: {
        cwd,
        projectRootPath,
      },
      taskApi,
    })

    helper.taskApiLogHeader('END BUILD ORDER', taskNames[i])
    console.log(``)
  })

  console.log(chalk.green(`All done!`))

}
