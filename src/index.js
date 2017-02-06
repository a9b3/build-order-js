import CommanderShepard from 'commander-shepard'
import * as helper from './helper.js'
import npmClientAdapter from './npm-client-adapter.js'
import chalk from 'chalk'
import * as commands from './commands/index.js'

async function initialize() {
  await helper.areCommandsInstalled([['yarn', 'npm'], 'git'])
}

function setupCommanderShepard() {
  const pkg = require('../package.json')
  const binName = Object.keys(pkg.bin)[0]

  const c = new CommanderShepard({
    key: binName,
    package: pkg,
    longDescription: 'Set up your javascript project procedurally',
    flags: [
      {
        keys: ['npm'],
        required: false,
        shortDescription: 'specify npm client to use [npm || yarn] defaults to npm',
      },
      {
        keys: ['git'],
        required: false,
        shortDescription: 'initialize empty git repo',
      },
    ],
    subcommands: [
      {
        key: 'tasks',
        shortDescription: 'apply tasks to the current project',
        longDescription: 'Apply a granular task to current project',
        command: commands.task,
      },
      {
        key: 'buildorders',
        shortDescription: 'apply build orders to the current project',
        longDescription: 'Apply a set of tasks to the current project',
        command: commands.buildorders,
      },
    ],
  })
  npmClientAdapter.setAdapter(c.flags.npm || 'npm')
  c.execute()
}

async function main() {
  await initialize()
  setupCommanderShepard()
}

main()
.catch(e => {
  console.log(chalk.red(e.message))
})
