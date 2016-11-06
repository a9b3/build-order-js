import path from 'path'
import invariant from 'invariant'

export default async function ci({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    ciTarget = 'travis',
  } = {},
  taskApi,
}) {
  const allowedTypes = ['travis', 'circle']
  invariant(!!~allowedTypes.indexOf(ciTarget), `--ci-type must be one of these values '${allowedTypes}'`)

  if (ciTarget === 'travis') {
    await taskApi.addFile({
      src: path.resolve(__dirname, './templates/travis.yml'),
      dest: '.travis.yml',
    })
  }

  if (ciTarget === 'circle') {
    await taskApi.addFile({
      src: path.resolve(__dirname, './templates/circle.yml'),
      dest: 'circle.yml',
    })
  }

}
