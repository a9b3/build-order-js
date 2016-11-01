import path from 'path'

export default async function bootstrap({
  env: {
    cwd,
    projectRootPath,
  },
  taskApi,
}) {

  await taskApi.shell('git init')

  await taskApi.addFile({
    fileContent: '',
    dest: path.resolve(await taskApi.getProjectRootPath(), '.gitignore'),
  })

  await taskApi.addFile({
    src: path.resolve(__dirname, './templates/package.json.tpl'),
    dest: path.resolve(await taskApi.getProjectRootPath(), 'package.json'),
  })

  await taskApi.addFile({
    dest: path.resolve(await taskApi.getProjectRootPath(), 'index.js'),
    fileContent: '',
  })

  await taskApi.addDirectory({
    dest: path.resolve(await taskApi.getProjectRootPath(), 'src'),
  })

}
