import babelTask from '../../tasks/babel/index.js'

export default async function express(opts) {
  const taskApi = opts.taskApi

  await babelTask(opts)
}
