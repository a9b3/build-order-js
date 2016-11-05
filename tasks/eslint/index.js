import path from 'path'

// eslintType 'react'
export default async function babel({
  env: {
    cwd,
    projectRootPath,
  },
  options: {
    eslintType = 'default',
  } = {},
  taskApi,
}) {

  /*
   * npm packages
   */
  await taskApi.addPackages({
    packages: [
      'babel-eslint',
      'eslint',
      'eslint-config-esayemm',
      eslintType === 'react' && 'eslint-plugin-react',
    ].filter(a => a),
    dev: true,
  })

  /*
   * package.json
   */
  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'eslint': './node_modules/eslint/bin/eslint.js .',
      },
    },
  })

  await taskApi.addFile({
    fileContent: [
      'build/',
      'lib/',
      'node_modules/',
    ].join('\n'),
    dest: '.eslintignore',
  })

  await taskApi.addToJsonFile({
    dest: '.eslintrc',
    json: {
      "extends": [
        eslintType === 'react' ? "esayemm/lib/react" : "esayemm",
      ].filter(a => a),
    },
  })

}
