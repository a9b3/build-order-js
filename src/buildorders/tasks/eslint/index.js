import taskAPI from 'taskAPI'

/**
 * @param {string || array.<string>} extend - eg. eslint-config-x
 */
export default async function eslint({ extend = '' } = {}) {
  // always use array so you can spread it
  extend = [].concat(extend)
  await taskAPI.addPackages({
    devPackages: ['eslint', ...extend],
  })
  await taskAPI.addToPackageJson({
    json: { scripts: { lint: './node_modules/eslint/bin/eslint.js .' } },
  })
  await taskAPI.addFile({
    fileContent: ['build/', 'lib/', 'node_modules/'].join('\n'),
    dest: '.eslintignore',
  })
  await taskAPI.addToJsonFile({
    dest: '.eslintrc',
    json: { extends: extend },
  })
}
