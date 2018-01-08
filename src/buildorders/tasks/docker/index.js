import path    from 'path'
import taskAPI from 'taskAPI'

export default async function docker() {
  await taskAPI.templateFile({
    src: path.resolve(__dirname, './templates/Dockerfile'),
    dest: 'Dockerfile',
  })
}
