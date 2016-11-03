import npmClientAdapter from './npm-client-adapter.js'
import fs from 'fs'
import chalk from 'chalk'
import * as helper from './helper.js'
import invariant from 'invariant'
import path from 'path'
import handlebars from 'handlebars'

/**
 * @param {Object} opts
 * @param {Object} json - json to merge
 * @param {String} dest - destination file path of json file to merge into
 */
async function mergeToJsonFile({ json:jsonToMerge, dest }) {
  const json = helper.requireJson(dest)

  // log out the merging json
  const jsonStr = JSON.stringify(jsonToMerge, null, '  ')
  const paddedJsonStr = helper.leftPad(jsonStr, ' ', 2)
  console.log(chalk.yellow(`\n  Merging -> ${dest}`))
  console.log(chalk.yellow(paddedJsonStr))
  console.log(``)

  const mergedJson = helper.deepMergeJson(json, jsonToMerge)
  fs.writeFileSync(dest, JSON.stringify(mergedJson, null, '  '))
}

const taskApi = {

  /**
   * @param {String} command          - shell command to run *note* that interactive
   * commands isn't working right now
   * @param {Object} opts
   * @param {Boolean} [showHeader]    - show task api console logs
   */
  async shell(command, { showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('TASK', 'Shell') }

    console.log(chalk.yellow(`\n  Running command ${command}\n`))
    await helper.execPromise(command, { log: true })
  },

  /**
   * @param {Object} opts
   * @param {Array.<String>} packages - Npm packages to add
   * @param {Boolean} [dev]           - Use --save-dev or not
   * @param {Boolean} [showHeader]    - show task api console logs
   */
  async addPackages({ packages, dev, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('TASK', 'Add Package') }

    const paddedPackagesStr = helper.leftPad(packages.join('\n'), ' ', 2)
    console.log(chalk.yellow(`\n  Adding packages to ${dev ? 'devDependencies' : 'dependencies'}\n`))
    console.log(chalk.yellow(paddedPackagesStr))
    console.log(``)
    await npmClientAdapter.add(packages, { dev })
  },

  /**
   * @param {Object} opts
   * @param {Object} json          - plain object to merge to dest file
   * @param {String} dest          - json file path to merge into or will be created if
   * does not exists
   * @param {Boolean} [showHeader] - show task api console logs
   */
  @helper.relativeDest
  async addToJsonFile({ json, dest, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('TASK', 'Add JSON File') }

    if (!helper.fileExists(dest)) {
      fs.writeFileSync(dest, '{}', { encoding: 'utf8' })
    }

    await mergeToJsonFile({ json, dest })
  },

  /**
   * @param {Object} opts
   * @param {Object} json          - json to merge into package.json
   * @param {Boolean} [showHeader] - show task api console logs
   */
  async addToPackageJson({ json, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('TASK', 'Add to package.json') }

    const projectRootPath = await helper.getProjectRootPath()
    const packageJsonFilePath = path.resolve(projectRootPath, 'package.json')
    if (!helper.fileExists(packageJsonFilePath)) {
      fs.writeFileSync(packageJsonFilePath, '{}', { encoding: 'utf8' })
    }

    await mergeToJsonFile({ json, dest: packageJsonFilePath })
  },

  /**
   * @param {Object} opts
   * @param {String} dest          - destination file path
   * @param {Boolean} [showHeader] - show task api console logs
   */
  @helper.relativeDest
  addDirectory({ dest, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('TASK', 'Add Directory') }

    // dir already exists early return
    if (helper.fileExists(dest)) {
      console.log(chalk.gray(`\n  Directory already exists ${dest}\n`))
      return
    }

    console.log(chalk.yellow(`\n  Making dir -> ${dest}\n`))

    fs.mkdirSync(dest)
  },

  /**
   * @param {Object} opts
   * @param {String} src           - File path
   * @param {String} [fileContent] - Contents of file to add, you can provide
   * this instead of a src file to copy over
   * @param {String} dest          - Destination of file to add
   * @param {Boolean} [override]   - Override file if doesn't exist
   */
  @helper.relativeDest
  async addFile({ src, fileContent, dest, override, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('TASK', 'Add File') }

    invariant(typeof fileContent === 'string' || helper.fileExists(src), `Must provide either 'fileContent':String or 'src':filepath`)

    fileContent = [null, undefined].indexOf(fileContent) === -1
      ? fileContent
      : fs.readFileSync(src, { encoding: 'utf8' })

    if (helper.fileExists(dest) && !override) {
      console.log(chalk.gray(`\n  File already exists ${dest}\n`))
      return
    }

    console.log(chalk.yellow(`\n  Adding into file -> ${dest}\n`))
    console.log(chalk.yellow(helper.leftPad(fileContent, ' ', 2)))

    fs.writeFileSync(dest, fileContent, { encoding: 'utf8' })
  },

  /**
   * @param {Object} opts
   * @param {String} src           - File path to source handlebars template
   * @param {Object} args          - Arguments to pass into template
   * @param {String} dest          - Destination file path
   * @param {Boolean} [override]   - Override file if doesn't exist
   * @param {Boolean} [showHeader] - show task api console logs
   */
  @helper.relativeDest
  async templateFile({ src, args, dest, override, showHeader = true } = {}) {
    if (showHeader) { helper.taskApiLogHeader('TASK', 'Template File') }

    if (helper.fileExists(dest) && !override) {
      console.log(chalk.gray(`\n  File already exists ${dest}\n`))
      return
    }

    const template = handlebars.compile(fs.readFileSync(src, { encoding: 'utf8' }))
    const rendered = template(args)

    console.log(chalk.yellow(`\n  From ${src} with args`))
    console.log(chalk.yellow(helper.leftPad(JSON.stringify(args, null, '  '), ' ', 2)))
    console.log(chalk.yellow(`\n  Copying to -> ${dest}\n`))
    const paddedRendered = helper.leftPad(rendered, ' ', 2)
    console.log(chalk.yellow(paddedRendered))

    fs.writeFileSync(dest, rendered, { encoding: 'utf8' })
  },

}

export default taskApi
