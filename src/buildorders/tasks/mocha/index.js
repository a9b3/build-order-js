import taskAPI from 'taskAPI'

export default async function mocha() {
  await taskAPI.addPackages({
    devPackages: ['babel-register', 'babel-polyfill', 'mocha', 'expect'],
  })
  await taskAPI.addToPackageJson({
    json: {
      scripts: {
        test: `APP_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill $(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*dist*')`,
        'test:watch': `APP_ENV=test ./node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill --watch $(find . -name '*.spec.js' ! -ipath '*node_modules*' ! -ipath '*dist*')`,
      },
    },
  })
}
