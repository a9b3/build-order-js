import bootstrapTask from '../../tasks/bootstrap/index.js'
import babelTask from '../../tasks/babel/index.js'

export default async function express(opts) {
  const taskApi = opts.taskApi

  await bootstrapTask(opts)
  await babelTask(opts)
}
