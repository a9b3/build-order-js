import path from 'path'

export default async function test({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    testType = 'mocha',
  } = {},
  taskApi,
}) {

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
        'test': './node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill',
        'test:watch': './node_modules/mocha/bin/mocha --compilers js:babel-register --require babel-polyfill --watch',
      },
    },
  })

  await taskApi.copyDirectory({
    src: path.resolve(__dirname, './templates/test'),
    dest: './test',
  })

}
