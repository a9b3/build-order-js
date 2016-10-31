import path from 'path'

export default async function bootstrap({
  env: {
    cwd,
    projectRootPath,
  },
  taskApi,
}) {

  await taskApi.addPackages({
    packages: [
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-decorators-legacy',
      'babel-preset-es2015',
      'babel-preset-stage-0',
    ],
    dev: true,
  })

  await taskApi.addToJsonFile({
    src: path.resolve(projectRootPath, '.babelrc'),
    json: {
      "presets": [
        "stage-0",
        "es2015"
      ],
      "plugins": [
        "transform-decorators-legacy"
      ],
    },
  })

  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'test': 'ahsid',
      },
    },
  })

}
