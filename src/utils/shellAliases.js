import execAsync from 'utils/execAsync'

/**
 * @param {String} command - check if command line tool exists ex. 'git', 'npm'
 * @returns {Boolean}
 */
// TODO this might need to be improved on to not use 'which'
export async function isCommandInstalled(command) {
  const { stdout } = await execAsync(`which ${command}`)
  return Boolean(stdout.trim())
}

/**
 * Check if commands are installed
 *
 * ex.
 *
 * [['yarn', 'npm'], 'git']
 * =
 * ('yarn' || 'npm') && 'git'
 *
 * @param {Array.<String>} commands - refer to ex
 */
export async function areCommandsInstalled(commands) {
  for (let i = 0; i < commands.length; i++) {
    const commandsToCheck = [].concat(commands[i])
    const hasTheseCommands = (await Promise.all(
      commandsToCheck.map(isCommandInstalled),
    )).some(Boolean)
    if (!hasTheseCommands) {
      throw new Error(`Missing dependencies '${checkForThese}'`)
    }
  }
}

/**
 * returns project root based on where .git is located in the ancestor nodes
 *
 * @returns {String} project root dir
 */
export async function getProjectRootPath() {
  try {
    const { stdout } = await execAsync('git rev-parse --show-toplevel')
    return stdout.trim()
  } catch (e) {
    return ''
  }
}
