export function leftPad(str, insertChar = '', repeatAmt = 0) {
  return str
    .split('\n')
    .map(line => insertChar.repeat(repeatAmt) + line)
    .join('\n')
}

export function padString(str, char, limit) {
  const diff = limit - str.length
  return str + ' ' + char.repeat(diff - 1)
}
