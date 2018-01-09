import path                   from 'path'
import { getProjectRootPath } from 'utils/shellAliases'

export async function relativeFromProjectRoot(dest) {
  return path.resolve(await getProjectRootPath(), dest)
}
