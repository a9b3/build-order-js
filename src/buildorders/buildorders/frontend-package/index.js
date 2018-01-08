import * as tasks from '../../tasks'
import path       from 'path'
import taskAPI    from 'taskAPI'

export default async function frontendPackage({ flags }) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.eslint({ extend: 'eslint-config-esayemm' })

  await taskAPI.addPackages({
    packages: ['jbs-fe'],
    dev: true,
  })

  await taskAPI.addToPackageJson({
    json: {
      main: `./build/index.js`,
      module: `./build/index.es.js`,
      scripts: {
        build:
          './node_modules/jbs-fe/bin.js build:package --input src --output build --es-input-file src/index.js --es-output-file build/index.es.js',
        start:
          'NODE_PATH=./example ./node_modules/jbs-fe/bin.js dev --app-index ./example/index.js --html-index ./example/index.html --context ./example',
        test: `./node_modules/jbs-fe/bin.js test --single-run`,
        'test:watch': `./node_modules/jbs-fe/bin.js test`,
        prepublish: 'npm run build',
        preversion: 'npm run lint && npm run test',
        version: 'npm publish',
        postversion: 'git add . && git push && git push --tags',
      },
      babel: {
        presets: ['./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js'],
      },
      files: ['build/'],
    },
  })

  await taskAPI.shell({ command: `mkdir src` })
  await taskAPI.shell({ command: `touch src/index.js` })

  await taskAPI.copyDirectory({
    src: path.resolve(__dirname, '../../templates/frontend-app/src'),
    dest: './example',
  })

  if (flags.git) {
    await taskAPI.gitInit()
  }
}
