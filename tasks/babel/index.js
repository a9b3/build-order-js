import path from 'path'

/*
 * babelType 'default' 'react'
 */
export default async function babel({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    babelType = 'default',
  } = {},
  taskApi,
}) {

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
        'babel-build': 'rm -rf lib && ./node_modules/babel-cli/bin/babel.js src --out-dir lib',
      },
    },
  })

  if (babelType === 'react') {
    await taskApi.addPackages({
      packages: [
        'babel-plugin-react-transform',
        'babel-plugin-transform-runtime',
        'babel-preset-airbnb',
        'babel-preset-react',
        'babel-runtime',
      ],
      dev: true,
    })

    await taskApi.addToJsonFile({
      dest: '.babelrc',
      json: {
        "presets": [
          "react",
        ],
        "plugins": [
          "transform-runtime",
          "react-hot-loader/babel",
        ],
        "env": {
          "test": {
            "presets": [
              "airbnb",
              "es2015",
              "stage-0",
              "react",
            ],
          },
        },
      },
    })
  }

}
