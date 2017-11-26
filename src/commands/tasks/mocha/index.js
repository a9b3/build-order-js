import path    from 'path'
import taskApi from 'services/task-api'

export default async function mocha() {

  await taskApi.addPackages({
    packages: [
      'babel-register',
      'babel-polyfill',
      'mocha',
      'expect',
    ],
    dev: true,
  })

  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'test'      : `APP_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill $(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*dist*')`,
        'test:watch': `APP_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill --watch $(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*dist*')`,
      },
    },
  })

  await taskApi.copyDirectory({
    src : path.resolve(__dirname, './templates/mocha/test'),
    dest: './test',
  })

}
