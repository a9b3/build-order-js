import CommanderShepard from 'commander-shepard'
import chalk            from 'chalk'
import * as commands    from 'commands/index'
import * as helper      from 'services/helper'
import npmClientAdapter from 'services/npm-client-adapter'

async function initialize() {
  await helper.areCommandsInstalled([['yarn', 'npm'], 'git'])
}

function setupCommanderShepard() {
  const c = new CommanderShepard({
    key            : 'bojs',
    package        : require('../package.json'),
    longDescription: 'Set up your javascript project procedurally',
    flags          : [
      {
        keys            : ['npm'],
        required        : false,
        shortDescription: 'specify npm client to use [npm || yarn] defaults to npm',
      },
      {
        keys            : ['git'],
        required        : false,
        shortDescription: 'initialize empty git repo',
      },
    ],
    subcommands: [
      {
        key             : 'buildorders',
        shortDescription: 'apply build orders to the current project',
        longDescription : 'Apply a set of tasks to the current project',
        command         : commands.buildorders,
      },
      {
        key             : 'list',
        shortDescription: 'list the available buildorders',
        longDescription : 'list the available buildorders',
        command         : commands.list,
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
.catch(e => console.log(chalk.red(e.message)))
