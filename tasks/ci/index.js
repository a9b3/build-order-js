import path from 'path'

export default async function ci({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    ciType = 'travis',
    ciTarget = 'default',
  } = {},
  taskApi,
}) {

  if (ciType === 'travis') {
    await taskApi.templateFile({
      src: path.resolve(__dirname, './templates/travis.yml'),
      args: {
        ciType,
        ciTarget,
      },
      dest: '.travis.yml',
    })
  }

  if (ciType === 'circle') {
    await taskApi.addFile({
      src: path.resolve(__dirname, './templates/circle.yml'),
      dest: 'circle.yml',
    })
  }

}
