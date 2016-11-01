import npmClientAdapter from './npm-client-adapter.js'
import fs from 'fs'
import chalk from 'chalk'
import * as helper from './helper.js'
import invariant from 'invariant'
import path from 'path'

const taskApi = {
  async shell(command) {
    console.log(chalk.yellow(`[Shell command]`))
    await helper.execPromise(command, { log: true })
    console.log(chalk.yellow(`[Successfully ran shell command]\n`))
  },

  getProjectRootPath() {
    return helper.getProjectRootPath()
  },

  async addPackages({
    packages,
    dev,
  }) {
    console.log(chalk.yellow(`[Add packages]`))
    console.log('\n  ', 'adding', chalk.yellow(`${packages}`, '\n'))
    await npmClientAdapter.add(packages, { dev })
    console.log(chalk.yellow(`[Successfully added packages]\n`))
  },

  addFile({ src, fileContent, dest, override }) {
    console.log(chalk.yellow(`[Add file]`))

    invariant(!fileContent || helper.fileExists(src), `'${src}' is not a file`)

    fileContent = [null, undefined].indexOf(fileContent) === -1 ? fileContent : fs.readFileSync(src, { encoding: 'utf8' })
    console.log('\nadding', chalk.yellow(`${fileContent} -> ${dest}`, '\n'))

    if (helper.fileExists(dest) && !override) {
      console.log(`[File already exists]\n`)
      return
    }

    fs.writeFileSync(dest, fileContent, { encoding: 'utf8' })

    console.log(chalk.yellow(`[Successfully added file]\n`))
  },

  async mergeToJsonFile({ json, src }) {
    const pkg = helper.requireJson(src)

    console.log(chalk.yellow('\n  ', 'Merging'))
    console.log(chalk.yellow(JSON.stringify(json, null, '  ')), '\n')

    const mergedJson = helper.deepMergeJson(pkg, json)
    fs.writeFileSync(src, JSON.stringify(mergedJson, null, '  '))
  },

  // if src does not exists, create the file
  async addToJsonFile({ json, src }) {
    console.log(chalk.yellow(`[Add JSON file]`))

    if (!helper.fileExists(src)) {
      fs.writeFileSync(src, '{}', { encoding: 'utf8' })
    }

    await this.mergeToJsonFile({ json, src })

    console.log(chalk.yellow(`[Successfully added JSON file]\n`))
  },

  async addToPackageJson({ json }) {
    console.log(chalk.yellow(`[Add to package.json]`))

    const projectRootPath = await helper.getProjectRootPath()
    const packageJsonFilePath = path.resolve(projectRootPath, 'package.json')
    if (!helper.fileExists(packageJsonFilePath)) {
      throw new Error(`${packageJsonFilePath} does not exist`)
    }

    await this.mergeToJsonFile({ json, src: packageJsonFilePath })

    console.log(chalk.yellow(`[Successfully added to package.json]\n`))
  },

  addDirectory({ dest }) {
    console.log(chalk.yellow(`[Add directory]`))
    console.log(`\n  `, 'adding', chalk.yellow(dest), '\n')

    if (helper.fileExists(dest)) {
      console.log(chalk.yellow(`[Directory already exists]\n`))
      return
    }
    fs.mkdirSync(dest)
    console.log(chalk.yellow(`[Successfully added directory]\n`))
  },
}

export default taskApi
