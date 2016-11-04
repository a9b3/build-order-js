import path from 'path'

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

  await taskApi.addFile({
    src: path.resolve(__dirname, './templates/Dockerfile'),
    dest: 'Dockerfile',
  })

}
