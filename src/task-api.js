import npmClientAdapter from './npm-client-adapter.js'
import fs from 'fs'
import chalk from 'chalk'
import * as helper from './helper.js'
import invariant from 'invariant'
import path from 'path'

async function mergeToJsonFile({ json:jsonToMerge, dest }) {
  const json = helper.requireJson(dest)

  // log out the merging json
  const jsonStr = JSON.stringify(jsonToMerge, null, '  ')
  const paddedJsonStr = helper.leftPad(jsonStr, ' ', 2)
  console.log(chalk.yellow(`\n  Merging`))
  console.log(chalk.yellow(paddedJsonStr))
  console.log(``)

  const mergedJson = helper.deepMergeJson(json, jsonToMerge)
  fs.writeFileSync(dest, JSON.stringify(mergedJson, null, '  '))
}

const taskApi = {
  getProjectRootPath() {
    return helper.getProjectRootPath()
  },

  async shell(command, { showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('Shell') }

    await helper.execPromise(command, { log: true })
  },

  /**
   * @param {Object} opts
   * @param {Array.<String>} packages - Npm packages to add
   * @param {Boolean} [dev]           - Use --save-dev or not
   */
  async addPackages({ packages, dev, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('Add Package') }

    console.log(`\n  Adding ${chalk.yellow(`${packages}`)}\n`)
    await npmClientAdapter.add(packages, { dev })
  },

  /**
   * @param {Object} opts
   * @param {String} src           - File path
   * @param {String} [fileContent] - Contents of file to add
   * @param {String} dest          - Destination of file to add
   * @param {Boolean} override     - Override file if doesn't exist
   */
  addFile({ src, fileContent, dest, override, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('Add File') }

    invariant(!fileContent || helper.fileExists(src), `'${src}' is not a file`)

    fileContent = [null, undefined].indexOf(fileContent) === -1
      ? fileContent
      : fs.readFileSync(src, { encoding: 'utf8' })
    console.log('\nadding', chalk.yellow(`${fileContent} -> ${dest}`, '\n'))

    if (helper.fileExists(dest) && !override) {
      console.log(`[File already exists]\n`)
      return
    }

    fs.writeFileSync(dest, fileContent, { encoding: 'utf8' })
  },

  // if src does not exists, create the file
  async addToJsonFile({ json, dest, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('Add JSON File') }

    if (!helper.fileExists(dest)) {
      fs.writeFileSync(dest, '{}', { encoding: 'utf8' })
    }

    await mergeToJsonFile({ json, dest })
  },

  async addToPackageJson({ json, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('Add to package.json') }

    const projectRootPath = await helper.getProjectRootPath()
    const packageJsonFilePath = path.resolve(projectRootPath, 'package.json')
    if (!helper.fileExists(packageJsonFilePath)) {
      fs.writeFileSync(packageJsonFilePath, '{}', { encoding: 'utf8' })
    }

    await mergeToJsonFile({ json, dest: packageJsonFilePath })
  },

  addDirectory({ dest, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('Add Directory') }

    console.log(chalk.yellow(`\n  adding ${dest}\n`))

    // dir already exists early return
    if (helper.fileExists(dest)) {
      console.log(chalk.yellow(`Directory already exists`))
      return
    }

    fs.mkdirSync(dest)
  },
}

export default taskApi
