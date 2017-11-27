import path    from 'path'
import taskAPI from 'taskAPI'

/*
 * 1. git init
 * 2. .gitignore
 * 3. package.json
 * 4. readme.md
 * 5. config.js
 */
export default async function bootstrap({
  name = 'changeMe',
}) {
  await taskAPI.shell({
    command: 'git init',
  })

  await taskAPI.addFile({
    dest       : '.gitignore',
    fileContent: [
      'node_modules/',
      '*.log',
      'build/',
    ].join('\n'),
  })

  await taskAPI.templateFile({
    dest: 'package.json',
    src : path.resolve(__dirname, './templates/package.json.tpl'),
    args: {
      name,
    },
  })

  await taskAPI.addFile({
    dest       : 'readme.md',
    fileContent: [
      '# Readme',
    ].join('\n'),
  })
}
