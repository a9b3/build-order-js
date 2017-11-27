import path    from 'path'
import taskAPI from 'taskAPI'

export default async function mocha() {

  await taskAPI.addPackages({
    packages: [
      'babel-register',
      'babel-polyfill',
      'mocha',
      'expect',
    ],
    dev: true,
  })

  await taskAPI.addToPackageJson({
    json: {
      scripts: {
        'test'      : `APP_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill $(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*dist*')`,
        'test:watch': `APP_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill --watch $(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*dist*')`,
      },
    },
  })

  await taskAPI.copyDirectory({
    src : path.resolve(__dirname, './templates/mocha/test'),
    dest: './test',
  })

}
