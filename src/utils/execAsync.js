import { exec } from 'child_process'
import process  from 'process'

export default function execAsync(command, { pipe = false }) {
  return new Promise((resolve, reject) => {
    const child = exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }
      resolve({ err, stdout, stderr })
    })
    if (pipe) {
      child.stdout.pipe(process.stdout)
      child.stderr.pipe(process.stderr)
    }
  })
}
