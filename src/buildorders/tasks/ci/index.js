import invariant from 'invariant'
import path      from 'path'
import taskAPI   from 'taskAPI'

// ci creates files for ci integration
export default async function ci({ ciTarget = 'travis' } = {}) {
  switch (ciTarget) {
    case 'travis':
      return await taskAPI.addFile({
        src: path.resolve(__dirname, './templates/travis.yml'),
        dest: '.travis.yml',
      })
    case 'circle':
      return await taskAPI.addFile({
        src: path.resolve(__dirname, './templates/circle.yml'),
        dest: 'circle.yml',
      })
    default:
      return invariant(
        allowedTargets.includes(ciTarget),
        `'ciTarget' must be one of these values '${allowedTargets}'`,
      )
  }
}
