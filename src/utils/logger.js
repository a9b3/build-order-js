import { padString } from 'utils/stringFormatter'

export function taskAPILogHeader(header, taskName) {
  return console.log(padString(`${header}: [${taskName}]`, '*', 80), '\n')
}
