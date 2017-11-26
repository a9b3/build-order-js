import path      from 'path'
import taskApi   from 'services/task-api'

export default async function docker() {
  await taskApi.templateFile({
    src : path.resolve(__dirname, './templates/Dockerfile'),
    dest: 'Dockerfile',
  })
}
