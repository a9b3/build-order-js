import chalk                       from 'chalk'
import fs                          from 'fs-extra'
import invariant                   from 'invariant'
import _                           from 'lodash'
import npmClientAdapter            from 'npmClientAdapter'
import path                        from 'path'
import showHeader                  from 'taskAPI/decorators/showHeader'
import execAsync                   from 'utils/execAsync'
import { relativeFromProjectRoot } from 'utils/fsUtils'
import { getProjectRootPath }      from 'utils/shellAliases'
import { leftPad }                 from 'utils/stringFormatter'

class TaskAPI {
  /**
   * shell executes a shell command
   *
   * @param {Object} opts
   * @param {String} command - shell command to run *note* that interactive
   * commands isn't working right now
   */
  @showHeader('Shell')
  async shell({ command } = {}) {
    console.log(chalk.yellow(`\n  Running command ${command}\n`))
    await execAsync(command, { log: true })
  }

  /**
   * gitInit executes an initial commit
   *
   * @param {Object} opts
   * @param {String} [initMessage] - git init message
   */
  @showHeader('Git Init')
  async gitInit({ initMessage = `ಠ_ಠ` } = {}) {
    await execAsync('git add .', { log: true })
    await execAsync(`git commit -m '${initMessage}'`, { log: true })
  }

  /**
   * addPackages adds an npm package using the npmAdapter
   *
   * @param {Object} opts
   * @param {Array.<String>} packages - Npm packages to add
   * @param {Boolean} [dev]           - Use --save-dev or not
   */
  @showHeader('Add Package')
  async addPackages({ packages, dev } = {}) {
    const paddedPackagesStr = leftPad(packages.join('\n'), ' ', 2)
    console.log(
      chalk.yellow(
        `\n  Adding packages to ${dev ? 'devDependencies' : 'dependencies'}\n`,
      ),
    )
    console.log(chalk.yellow(paddedPackagesStr))
    console.log(``)

    await npmClientAdapter.add(packages, { dev })
  }

  /**
   * addToJsonFile merges the given object to the json file
   *
   * @param {Object} opts
   * @param {Object} json          - plain object to merge to dest file
   * @param {String} dest          - json file path to merge into or will be created if
   * does not exists
   */
  @showHeader('Add JSON File')
  async addToJsonFile({ json, dest } = {}) {
    dest = await relativeFromProjectRoot(dest)
    if (!fs.existsSync(dest)) {
      fs.writeFileSync(dest, '{}', { encoding: 'utf8' })
    }
    fs.writeFileSync(
      dest,
      JSON.stringify(_.merge(require(dest), json), null, '  '),
    )
  }

  /**
   * addToPackageJson merges object into package.json file
   *
   * @param {Object} opts
   * @param {Object} json          - json to merge into package.json
   */
  @showHeader('Add to package.json')
  async addToPackageJson({ json } = {}) {
    const projectRootPath = await getProjectRootPath()
    this.addToJsonFile({
      json,
      dest: path.resolve(projectRootPath, 'package.json'),
    })
  }

  /**
   * addDirectory makes a directory
   *
   * @param {Object} opts
   * @param {String} dest          - destination file path
   */
  @showHeader('Add Directory')
  async addDirectory({ dest } = {}) {
    dest = await relativeFromProjectRoot(dest)
    // dir already exists early return
    if (fs.existsSync(dest)) {
      console.log(chalk.gray(`\n  Directory already exists ${dest}\n`))
      return
    }

    console.log(chalk.yellow(`\n  Making dir -> ${dest}\n`))

    fs.mkdirSync(dest)
  }

  /**
   * addFile creates a file with the given content
   *
   * @param {Object} opts
   * @param {String} src           - File path
   * @param {String} [fileContent] - Contents of file to add, you can provide
   * this instead of a src file to copy over
   * @param {String} dest          - Destination of file to add
   * @param {Boolean} [overwrite]   - overwrite file if doesn't exist
   */
  @showHeader('Add File')
  async addFile({ src, fileContent, dest, overwrite } = {}) {
    dest = await relativeFromProjectRoot(dest)
    invariant(
      typeof fileContent === 'string' || fs.existsSync(src),
      `Must provide either 'fileContent':String or 'src':filepath`,
    )

    fileContent =
      [null, undefined].indexOf(fileContent) === -1
        ? fileContent
        : fs.readFileSync(src, { encoding: 'utf8' })

    if (fs.existsSync(dest) && !overwrite) {
      console.log(chalk.gray(`\n  File already exists ${dest}\n`))
      return
    }

    console.log(chalk.yellow(`\n  Adding into file -> ${dest}\n`))
    console.log(chalk.yellow(leftPad(fileContent, ' ', 2)))

    fs.writeFileSync(dest, fileContent, { encoding: 'utf8' })
  }

  /**
   * copyDirectory copies directory
   *
   * @param {Object} opts
   * @param {String} src           - File path
   * @param {String} dest          - Destination of file to add
   * @param {Boolean} [overwrite]   - overwrite file if doesn't exist
   */
  @showHeader('Copy Directory')
  async copyDirectory({ src, dest, overwrite } = {}) {
    dest = await relativeFromProjectRoot(dest)
    // dir already exists early return
    if (fs.existsSync(dest) && !overwrite) {
      console.log(chalk.gray(`\n  Directory already exists ${dest}\n`))
      return
    }

    console.log(chalk.yellow(`\n  Copying dir -> ${dest}\n`))

    fs.copy(src, dest, { overwrite })
  }

  /**
   * templateFile creates file from a given template
   *
   * @param {Object} opts
   * @param {String} src           - File path to source handlebars template
   * @param {Object} args          - Arguments to pass into template
   * @param {String} dest          - Destination file path
   * @param {Boolean} [overwrite]   - overwrite file if doesn't exist
   */
  @showHeader('Template File')
  async templateFile({ src, args = {}, dest, overwrite } = {}) {
    dest = await relativeFromProjectRoot(dest)
    if (fs.existsSync(dest) && !overwrite) {
      console.log(chalk.gray(`\n  File already exists ${dest}\n`))
      return
    }

    const compiled = _.template(fs.readFileSync(src, { encoding: 'utf8' }))
    const rendered = compiled(args)

    console.log(chalk.yellow(`\n  From ${src} with args`))
    console.log(chalk.yellow(leftPad(JSON.stringify(args, null, '  '), ' ', 2)))
    console.log(chalk.yellow(`\n  Copying to -> ${dest}\n`))
    const paddedRendered = leftPad(rendered, ' ', 2)
    console.log(chalk.yellow(paddedRendered))

    fs.writeFileSync(dest, rendered, { encoding: 'utf8' })
  }
}

export default new TaskAPI()
