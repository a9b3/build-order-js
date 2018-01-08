import invariant from 'invariant'
import execAsync from 'utils/execAsync'

const adapters = {
  npm: {
    add(keys, { dev }) {
      keys = [].concat(keys)
      const options = dev ? '--save-dev' : '--save'
      return execAsync(`npm i ${keys.join(' ')} ${options}`, { pipe: true })
    },
  },

  yarn: {
    add(keys, { dev }) {
      keys = [].concat(keys)
      const options = dev ? '--dev' : '--save'
      return execAsync(`yarn add ${keys.join(' ')} ${options}`, { pipe: true })
    },
  },
}

class NpmClientAdapter {
  adapter = null

  setAdapter(key) {
    invariant(adapters[key], `'${key}' must be one of ${Object.keys(adapters)}`)
    this.adapter = adapters[key]
  }

  add(...args) {
    return this.adapter.add(...args)
  }
}

export default new NpmClientAdapter()
