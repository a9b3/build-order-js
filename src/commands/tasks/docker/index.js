import path      from 'path'
import invariant from 'invariant'
import taskApi   from 'services/task-api'

export default async function docker() {
  await taskApi.templateFile({
    src: path.resolve(__dirname, './templates/Dockerfile'),
    dest: 'Dockerfile',
  })
}
