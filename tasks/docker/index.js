import path from 'path'
import invariant from 'invariant'

/*
 * dockerType
 * frontend - nginx docker file serving /build
 * backend  - alphine/node serving 'node index.js' on 8080
 */
export default async function docker({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    dockerTarget = 'backend',
  } = {},
  taskApi,
}) {
  const allowedTargets = ['backend', 'frontend']
  invariant(!!~allowedTargets.indexOf(dockerTarget), `--docker-type must be one of these values '${allowedTargets}'`)

  if (dockerTarget === 'frontend') {
    await taskApi.copyDirectory({
      src: path.resolve(__dirname, './templates/nginx'),
      dest: 'nginx',
    })
  }

  await taskApi.templateFile({
    src: path.resolve(__dirname, './templates/Dockerfile'),
    args: {
      dockerTarget,
    },
    dest: 'Dockerfile',
  })

}
