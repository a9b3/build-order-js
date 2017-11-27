import fs               from 'fs'
import chalk            from 'chalk'
import invariant        from 'invariant'
import path             from 'path'
import _                from 'lodash'
import npmClientAdapter from 'services/npm-client-adapter'
import * as helper      from 'services/helper'
import showHeader       from 'taskAPI/decorators/showHeader'

class TaskAPI {
  /**
   * @param {Object} opts
   * @param {String} command - shell command to run *note* that interactive
   * commands isn't working right now
   */
  @showHeader('Shell')
  async shell({ command } = {}) {
    console.log(chalk.yellow(`\n  Running command ${command}\n`))
    await helper.execPromise(command, { log: true })
  }

  /**
   * @param {Object} opts
   * @param {String} [initMessage] - git init message
   */
  @showHeader('Git Init')
  async gitInit({ initMessage = `ಠ_ಠ` } = {}) {
    await helper.execPromise('git add .', { log: true })
    await helper.execPromise(`git commit -m '${initMessage}'`, { log: true })
  }

  /**
   * @param {Object} opts
   * @param {Array.<String>} packages - Npm packages to add
   * @param {Boolean} [dev]           - Use --save-dev or not
   */
  @showHeader('Add Package')
  async addPackages({ packages, dev } = {}) {
    const paddedPackagesStr = helper.leftPad(packages.join('\n'), ' ', 2)
    console.log(chalk.yellow(`\n  Adding packages to ${dev ? 'devDependencies' : 'dependencies'}\n`))
    console.log(chalk.yellow(paddedPackagesStr))
    console.log(``)

    await npmClientAdapter.add(packages, { dev })
  }

  /**
   * @param {Object} opts
   * @param {Object} json          - plain object to merge to dest file
   * @param {String} dest          - json file path to merge into or will be created if
   * does not exists
   */
  @showHeader('Add JSON File')
  @helper.relativeDest
  async addToJsonFile({ json, dest } = {}) {
    if (!helper.fileExists(dest)) {
      fs.writeFileSync(dest, '{}', { encoding: 'utf8' })
    }

    await helper.mergeToJsonFile({ json, dest })
  }

  /**
   * @param {Object} opts
   * @param {Object} json          - json to merge into package.json
   */
  @showHeader('Add to package.json')
  async addToPackageJson({ json } = {}) {
    const projectRootPath = await helper.getProjectRootPath()
    const packageJsonFilePath = path.resolve(projectRootPath, 'package.json')
    if (!helper.fileExists(packageJsonFilePath)) {
      fs.writeFileSync(packageJsonFilePath, '{}', { encoding: 'utf8' })
    }

    await helper.mergeToJsonFile({ json, dest: packageJsonFilePath })
  }

  /**
   * @param {Object} opts
   * @param {String} dest          - destination file path
   */
  @showHeader('Add Directory')
  @helper.relativeDest
  addDirectory({ dest } = {}) {
    // dir already exists early return
    if (helper.fileExists(dest)) {
      console.log(chalk.gray(`\n  Directory already exists ${dest}\n`))
      return
    }

    console.log(chalk.yellow(`\n  Making dir -> ${dest}\n`))

    fs.mkdirSync(dest)
  }

  /**
   * @param {Object} opts
   * @param {String} src           - File path
   * @param {String} [fileContent] - Contents of file to add, you can provide
   * this instead of a src file to copy over
   * @param {String} dest          - Destination of file to add
   * @param {Boolean} [overwrite]   - overwrite file if doesn't exist
   */
  @showHeader('Add File')
  @helper.relativeDest
  async addFile({ src, fileContent, dest, overwrite } = {}) {
    invariant(typeof fileContent === 'string' || helper.fileExists(src), `Must provide either 'fileContent':String or 'src':filepath`)

    fileContent = [null, undefined].indexOf(fileContent) === -1
      ? fileContent
      : fs.readFileSync(src, { encoding: 'utf8' })

    if (helper.fileExists(dest) && !overwrite) {
      console.log(chalk.gray(`\n  File already exists ${dest}\n`))
      return
    }

    console.log(chalk.yellow(`\n  Adding into file -> ${dest}\n`))
    console.log(chalk.yellow(helper.leftPad(fileContent, ' ', 2)))

    fs.writeFileSync(dest, fileContent, { encoding: 'utf8' })
  }

  /**
   * @param {Object} opts
   * @param {String} src           - File path
   * @param {String} dest          - Destination of file to add
   * @param {Boolean} [overwrite]   - overwrite file if doesn't exist
   */
  @showHeader('Copy Directory')
  @helper.relativeDest
  async copyDirectory({ src, dest, overwrite } = {}) {
    // dir already exists early return
    if (helper.fileExists(dest) && !overwrite) {
      console.log(chalk.gray(`\n  Directory already exists ${dest}\n`))
      return
    }

    console.log(chalk.yellow(`\n  Copying dir -> ${dest}\n`))

    helper.copy(src, dest, { overwrite })
  }

  /**
   * @param {Object} opts
   * @param {String} src           - File path to source handlebars template
   * @param {Object} args          - Arguments to pass into template
   * @param {String} dest          - Destination file path
   * @param {Boolean} [overwrite]   - overwrite file if doesn't exist
   */
  @showHeader('Template File')
  @helper.relativeDest
  async templateFile({ src, args = {}, dest, overwrite } = {}) {
    if (helper.fileExists(dest) && !overwrite) {
      console.log(chalk.gray(`\n  File already exists ${dest}\n`))
      return
    }

    const compiled = _.template(fs.readFileSync(src, { encoding: 'utf8' }))
    const rendered = compiled(args)

    console.log(chalk.yellow(`\n  From ${src} with args`))
    console.log(chalk.yellow(helper.leftPad(JSON.stringify(args, null, '  '), ' ', 2)))
    console.log(chalk.yellow(`\n  Copying to -> ${dest}\n`))
    const paddedRendered = helper.leftPad(rendered, ' ', 2)
    console.log(chalk.yellow(paddedRendered))

    fs.writeFileSync(dest, rendered, { encoding: 'utf8' })
  }
}

export default new TaskAPI()
