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

  if (dockerType === 'frontend') {
    await taskApi.copyDirectory({
      src: path.resolve(__dirname, './templates/nginx'),
      dest: 'nginx',
    })
  }

  await taskApi.templateFile({
    src: path.resolve(__dirname, './templates/Dockerfile'),
    args: {
      dockerType,
    },
    dest: 'Dockerfile',
  })

}
