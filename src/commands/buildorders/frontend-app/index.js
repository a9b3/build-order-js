import path       from 'path'
import * as tasks from '../../tasks'
import taskApi    from 'services/task-api'

export default async function frontendApp({
  flags,
}) {
  await tasks.bootstrap({ name: flags.name })
  await tasks.eslint({ extend: 'eslint-config-esayemm' })
  await tasks.ci()

  await taskApi.addPackages({
    packages: [
      'jbs-fe',
    ],
    dev: true,
  })

  await taskApi.addToPackageJson({
    json: {
      main: `./build/index.js`,
      scripts: {
        build: 'NODE_ENV=production ./node_modules/jbs-fe/bin.js build',
        start: './node_modules/jbs-fe/bin.js dev',
        test: `NODE_ENV=test ./node_modules/jbs-fe/bin.js test --single-run`,
        'test:watch': `NODE_ENV=test ./node_modules/jbs-fe/bin.js test`,
        deploy: 'npm run build && echo add deployment script here'
      },
      babel: {
        presets: ['./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js'],
      },
    },
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/src'),
    dest: './src',
  })

  if (flags.git) {
    await taskApi.gitInit()
  }
}
