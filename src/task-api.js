import npmClientAdapter from './npm-client-adapter.js'

const taskApi = {
  async addPackages({
    packages,
    dev,
  }) {
    await npmClientAdapter.add(packages, { dev })
  },

  addFile() {

  },

  addToPackageJson() {

  },

  addDirectory() {

  },
}

export default taskApi
