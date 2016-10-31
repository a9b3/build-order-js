import path from 'path'

export default async function babel({
  env: {
    cwd,
    projectRootPath,
  },
  taskApi,
}) {

  await taskApi.addPackages({
    packages: [
      'mocha',
      'expect',
    ],
    dev: true,
  })

  // await taskApi.addDirectory({
  //   dest: path.resolve(projectRootPath, 'test'),
  // })
  //
  // await taskApi.addFile({
  //   src: './index.js',
  //   dest: path.resolve(projectRootPath, 'test', 'index.js'),
  // })
  //
  // await taskApi.addToPackageJson({
  //   json: {
  //     scripts: {
  //       'test': 'asodp',
  //     },
  //   },
  // })

}
