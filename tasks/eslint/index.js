import path from 'path'

// TODO (sam) make this more generic, currently using my specific settings
export default async function babel({
  env: {
    cwd,
    projectRootPath,
  },
  options,
  taskApi,
}) {

  await taskApi.addPackages({
    packages: [
      'babel-eslint',
      'eslint',
      'eslint-config-esayemm',
      'eslint-plugin-react',
    ],
    dev: true,
  })

  await taskApi.addFile({
    fileContent: [
      'build/',
      'node_modules/',
    ].join('\n'),
    dest: '.eslintignore',
  })

  await taskApi.addToJsonFile({
    dest: '.eslintrc',
    json: {
      "extends": [
        "esayemm/lib/react",
      ],
    },
  })

  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'eslint': './node_modules/eslint/bin/eslint.js .',
      },
    },
  })

}
