import path      from 'path'
import invariant from 'invariant'

/*
 * dockerType
 * backend  - alphine/node serving 'node index.js' on 8080
 */
export default async function docker({
  flags: {
    dockerTarget = 'backend',
  } = {},
  taskApi,
}) {
  const allowedTargets = ['backend']
  invariant(!!~allowedTargets.indexOf(dockerTarget), `--docker-type must be one of these values '${allowedTargets}'`)

  if (dockerTarget === 'backend') {
    await taskApi.templateFile({
      src: path.resolve(__dirname, './templates/Dockerfile'),
      args: {
        dockerTarget,
      },
      dest: 'Dockerfile',
    })
  }
}
