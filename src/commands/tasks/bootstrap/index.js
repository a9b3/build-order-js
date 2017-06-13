import path from 'path'

/*
 * 1. git init
 * 2. .gitignore
 * 3. package.json
 * 4. readme.md
 * 5. config.js
 */
export default async function bootstrap({
  flags: {
    name = 'changeMe',
  } = {},
  taskApi,
}) {
  await taskApi.shell({
    command: 'git init',
  })

  await taskApi.addFile({
    dest: '.gitignore',
    fileContent: [
      'node_modules/',
      '*.log',
    ].join('\n'),
  })

  await taskApi.templateFile({
    dest: 'package.json',
    src: path.resolve(__dirname, './templates/package.json.tpl'),
    args: {
      name,
    },
  })

  await taskApi.addFile({
    dest: 'readme.md',
    fileContent: [
      '# Readme',
    ].join('\n')
  })
}
