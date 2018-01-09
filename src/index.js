import chalk                    from 'chalk'
import CommanderShepard         from 'commander-shepard'

import { buildorders, list }    from 'commands'
import npmClientAdapter         from 'npmClientAdapter'
import { areCommandsInstalled } from 'utils/shellAliases'

async function initialize() {
  await areCommandsInstalled([['yarn', 'npm'], 'git'])
}

function setupCommanderShepard() {
  const commander = new CommanderShepard({
    key: 'bojs',
    package: require('../package.json'),
    longDescription: 'set up your javascript project procedurally',
    flags: [
      {
        keys: ['npm'],
        required: false,
        shortDescription:
          'specify npm client to use [npm || yarn] defaults to npm',
      },
      {
        keys: ['git'],
        required: false,
        shortDescription: 'initialize empty git repo',
      },
    ],
    subcommands: [
      {
        key: 'buildorders',
        shortDescription: 'apply buildorders to the current project',
        command: buildorders,
      },
      {
        key: 'list',
        shortDescription: 'list the available buildorders',
        command: list,
      },
    ],
  })
  npmClientAdapter.setAdapter(commander.flags.npm || 'npm')
  commander.execute()
}

async function main() {
  await initialize()
  setupCommanderShepard()
}

main().catch(e => console.log(chalk.red(e.message)))
