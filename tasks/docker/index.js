import path from 'path'

/*
 * dockerType 'frontend'
 */
export default async function docker({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    dockerType = 'default',
  } = {},
  taskApi,
}) {

  const args = {}
  if (dockerType === 'frontend') {
    args.dockerTypeFrontend = true

    await taskApi.copyDirectory({
      src: path.resolve(__dirname, './templates/nginx'),
      dest: 'nginx',
    })
  }
  await taskApi.templateFile({
    src: path.resolve(__dirname, './templates/Dockerfile'),
    args,
    dest: 'Dockerfile',
  })

}
