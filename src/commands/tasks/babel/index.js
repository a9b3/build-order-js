export default async function babel({
  flags: {
    buildorderType,
  },
  taskApi,
}) {
  /*
   * npm packages
   */
  await taskApi.addPackages({
    packages: ['js-build-scripts'],
    dev: true,
  })

  const babelrcFile = ['frontend', 'react'].indexOf(buildorderType) > -1 ? 'babelrc.json' : 'babelrc.node.json'

  /*
   * package.json
   */
  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'babel': `rm -rf es && ./node_modules/js-build-scripts/bin.js babel`,
      },
      babel: {
        "extends": `./node_modules/js-build-scripts/configs/${babelrcFile}`,
      },
    },
  })
}
