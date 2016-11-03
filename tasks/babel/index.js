import path from 'path'

export default async function babel({
  env: {
    cwd,
    projectRootPath,
  },
  options,
  taskApi,
}) {

  await taskApi.addDirectory({
    dest: './foo',
  })

  await taskApi.templateFile({
    src: path.resolve(__dirname, 'templates/foo'),
    args: options,
    dest: 'foo/coo',
  })

  await taskApi.addPackages({
    packages: [
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-decorators-legacy',
      'babel-preset-es2015',
      'babel-preset-stage-0',
      'babel-cli',
    ],
    dev: true,
  })

  await taskApi.addToJsonFile({
    dest: '.babelrc',
    json: {
      "presets": [
        "stage-0",
        "es2015"
      ],
      "plugins": [
        "transform-decorators-legacy",
        "transform-class-properties"
      ],
    },
  })

  await taskApi.addToPackageJson({
    json: {
      main: 'build/index.js',
      scripts: {
        'babel-build': 'rm -rf build && ./node_modules/babel-cli/bin/babel.js src --out-dir build',
      },
    },
  })

}
