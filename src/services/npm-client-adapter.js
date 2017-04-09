import * as helper from 'services/helper'

const adapters = {
  npm: {
    add(keys, { dev }) {
      keys = [].concat(keys)
      const options = dev ? '--save-dev' : '--save'
      return helper.execPromise(`npm i ${keys.join(' ')} ${options}`, { log: true })
    },
  },

  yarn: {
    add(keys, { dev }) {
      keys = [].concat(keys)
      const options = dev ? '--dev' : '--save'
      return helper.execPromise(`yarn add ${keys.join(' ')} ${options}`, { log: true })
    },
  },
}

class NpmClientAdapter {
  adapter = null

  setAdapter(key) {
    if (!adapters[key]) {
      throw new Error(`'${key}' is not a valid npm client use 'npm' or 'yarn'`)
    }
    this.adapter = adapters[key]
  }

  add(...args) {
    return this.adapter.add(...args)
  }
}

export default new NpmClientAdapter()
