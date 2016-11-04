import path from 'path'

export default async function ci({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    ciType = 'travis',
  } = {},
  taskApi,
}) {

  if (ciType === 'travis') {
    await taskApi.addFile({
      src: path.resolve(__dirname, './templates/travis.yml'),
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
