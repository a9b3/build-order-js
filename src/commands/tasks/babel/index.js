export default async function babel({
  taskApi,
}) {
  /*
   * npm packages
   */
  await taskApi.addPackages({
    packages: ['js-build-scripts'],
    dev: true,
  })

  /*
   * package.json
   */
  await taskApi.addToPackageJson({
    json: {
      scripts: {
        'babel': `rm -rf es && ./node_modules/js-build-scripts/bin.js babel`,
      },
      babel: {
        "extends": "./node_modules/js-build-scripts/configs/babelrc.json",
      },
    },
  })
}
