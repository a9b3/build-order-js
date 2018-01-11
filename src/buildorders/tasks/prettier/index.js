import path    from 'path'
import taskAPI from 'taskAPI'

export default async function prettier() {
  await taskAPI.addPackages({ devPackages: ['prettier'] })
  await taskAPI.copy({
    src: path.resolve(__dirname, './templates/prettierrc.js'),
    dest: '.prettierrc.js',
  })
}
