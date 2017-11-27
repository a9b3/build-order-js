import invariant from 'invariant'
import taskAPI   from 'taskAPI'

/**
 * extend: 'eslint-config-esayemm/lib/react',
 *
 * else pass in 'eslint-config-esayemm'
 */
export default async function eslint({
  extend,
}) {
  invariant(typeof extend === 'string', `Must provide 'extend' field to eslint (what eslint preset to extend).`)

  /*
   * npm packages
   */
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

  /*
   * package.json
   */
  await taskAPI.addToPackageJson({
    json: {
      scripts: {
        'lint': './node_modules/eslint/bin/eslint.js .',
      },
    },
  })

  /*
   * eslint files
   */
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
