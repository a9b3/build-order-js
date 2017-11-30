import invariant from 'invariant'
import taskAPI   from 'taskAPI'

export default async function eslint({
  extend,
}) {
  invariant(typeof extend === 'string', `Must provide 'extend' field to eslint (what eslint preset to extend).`)

  await taskAPI.addPackages({
    packages: [
      // required if using certain babel enabled features
      // eslint-config-esayemm sets the parser config
      // https://github.com/babel/babel-eslint
      'babel-eslint',
      'eslint',
      'eslint-config-esayemm',
      'eslint-plugin-react',
    ],
    dev: true,
  })

  await taskAPI.addToPackageJson({
    json: {
      scripts: {
        'lint': './node_modules/eslint/bin/eslint.js .',
      },
    },
  })

  await taskAPI.addFile({
    fileContent: [
      'build/',
      'lib/',
      'node_modules/',
    ].join('\n'),
    dest: '.eslintignore',
  })

  await taskAPI.addToJsonFile({
    dest: '.eslintrc',
    json: {
      "extends": [
        extend,
      ],
    },
  })
}
