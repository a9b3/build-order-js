import path      from 'path'
import invariant from 'invariant'
import taskAPI   from 'taskAPI'

export default async function ci({
  ciTarget = 'travis',
} = {}) {
  const allowedTargets = ['travis', 'circle']
  invariant(!!~allowedTargets.indexOf(ciTarget), `'ciTarget' must be one of these values '${allowedTargets}'`)

  if (ciTarget === 'travis') {
    await taskAPI.addFile({
      src : path.resolve(__dirname, './templates/travis.yml'),
      dest: '.travis.yml',
    })
  }

  if (ciTarget === 'circle') {
    await taskAPI.addFile({
      src : path.resolve(__dirname, './templates/circle.yml'),
      dest: 'circle.yml',
    })
  }
}
