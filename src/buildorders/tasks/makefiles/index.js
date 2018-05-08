import path    from 'path'

import taskAPI from 'taskAPI'

export const TYPES = {
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
}

export default async function makefiles({ type }) {
  let file
  switch (type) {
    case TYPES.FRONTEND:
      file = './templates/frontend'
      break
    case TYPES.BACKEND:
      file = './templates/backend'
      break
  }

  await taskAPI.copy({
    src: path.resolve(__dirname, file),
    dest: 'Makefile',
  })
}
