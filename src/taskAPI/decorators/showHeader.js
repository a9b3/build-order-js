import * as helper from 'helper'

/*
 * @decorator
 * if function is called with { showHeader: true, ... }
 * call taskAPILogHeader with given message
 */
export default function showHeader(message = '') {
  return (target, key, descriptor) => {
    const fn = descriptor.value
    const newFn = async(...args) => {
      if ((args[0] || {}).showHeader) {
        helper.taskAPILogHeader('TASK', message)
      }
      const res = await fn.call(target, ...args)
      return res
    }

    descriptor.value = newFn
    return descriptor
  }
}
