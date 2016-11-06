import path from 'path'

export default async function bootstrap({
  env: {
    cwd,
    projectRootPath,
  },
  options,
  taskApi,
}) {

  await taskApi.shell('git init')

  await taskApi.addFile({
    fileContent: [
      'node_modules/',
      '*.log',
    ].join('\n'),
    dest: '.gitignore',
  })

  await taskApi.addFile({
    src: path.resolve(__dirname, './templates/package.json.tpl'),
    dest: 'package.json',
  })

  await taskApi.addFile({
    fileContent: [
      'module.exports = {}',
    ].join('\n'),
    dest: 'config.js',
  })

}
