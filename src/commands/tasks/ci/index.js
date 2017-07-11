import path      from 'path'
import invariant from 'invariant'
import taskApi   from 'services/task-api'

export default async function ci({
  ciTarget = 'travis',
} = {}) {
  const allowedTargets = ['travis', 'circle']
  invariant(!!~allowedTargets.indexOf(ciTarget), `'ciTarget' must be one of these values '${allowedTargets}'`)

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
