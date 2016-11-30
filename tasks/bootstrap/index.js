import path from 'path'

/*
 * 1. git init
 * 2. .gitignore
 * 3. package.json
 * 4. readme.md
 * 5. config.js
 */
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
    dest: 'readme.md',
    fileContent: [
      '# Readme',
    ].join('\n')
  })

  await taskApi.addFile({
    fileContent: [
      'module.exports = {}',
    ].join('\n'),
    dest: 'config.js',
  })

}
