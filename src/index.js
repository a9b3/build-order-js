import chalk                    from 'chalk'
import { Commander, Command }   from 'commander-shepard'

import { buildorders, list }    from 'commands'
import npmClientAdapter         from 'npmClientAdapter'
import { areCommandsInstalled } from 'utils/shellAliases'

async function initialize() {
  await areCommandsInstalled([['yarn', 'npm'], 'git'])
}

function setupCommanderShepard() {
  const commander = new Commander({
    key: 'bojs',
    packageJson: require('../package.json'),
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
  })
  commander.use(
    'buildorders',
    new Command({
      handler: buildorders,
      shortDescription: 'apply buildorders to the current project',
    }),
  )
  commander.use(
    'list',
    new Command({
      handler: list,
      shortDescription: 'list the available buildorders',
    }),
  )
  npmClientAdapter.setAdapter(commander.runtimeData.flags.npm || 'npm')
  return commander.start()
}

async function main() {
  await initialize()
  await setupCommanderShepard()
}

main().catch(e => console.log(chalk.red(e.message)))
