import npmClientAdapter from './npm-client-adapter.js'
import fs from 'fs'
import chalk from 'chalk'
import * as helper from './helper.js'

const taskApi = {
  async addPackages({
    packages,
    dev,
  }) {
    console.log(chalk.gray(`[Add packages ${packages}]`))
    await npmClientAdapter.add(packages, { dev })
    console.log(chalk.gray(`[Successfully added packages ${packages}]\n`))
  },

  addFile() {

  },

  addToPackageJson() {

  },

  addDirectory({ dest }) {
    console.log(chalk.gray(`[Add directory ${dest}]`))
    if (helper.fileExists(dest)) {
      console.log(chalk.gray(`[Directory already exists ${dest}]\n`))
      return
    }
    fs.mkdirSync(dest)
    console.log(chalk.gray(`[Successfully added directory ${dest}]\n`))
  },
}

export default taskApi
