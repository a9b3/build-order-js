import path       from 'path'
import * as tasks from '../../tasks'
import taskApi    from 'services/task-api'

export default async function frontendPackage({
  flags,
}) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.eslint({ extend: 'eslint-config-esayemm' })

  await taskApi.addPackages({
    packages: [
      'jbs-fe',
    ],
    dev: true,
  })

  await taskApi.addToPackageJson({
    json: {
      main: `./build/index.js`,
      module: `./build/index.es.js`,
      scripts: {
        build: 'NODE_ENV=production ./node_modules/jbs-fe/bin.js build:package --input src --output build --es-input-file src/index.js --es-output-file build/index.es.js',
        start: './node_modules/jbs-fe/bin.js dev --app-index ./example/app/index.js --html-index ./example/index.html --context ./example',
        test: `NODE_ENV=test ./node_modules/jbs-fe/bin.js test --single-run`,
        'test:watch': `NODE_ENV=test ./node_modules/jbs-fe/bin.js test`,
        prepublish: 'npm run build',
        preversion: 'npm run lint && npm run test',
        version: 'npm publish',
        postversion: 'git add . && git push && git push --tags',
      },
      babel: {
        presets: ['./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js'],
      },
      files: [
        'build/',
      ],
    },
  })

  await taskApi.shell({ command: `mkdir src` })
  await taskApi.shell({ command: `touch src/index.js` })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './example',
  })

  if (flags.git) {
    await taskApi.gitInit()
  }
}
