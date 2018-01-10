export default function noCacheRequire(name) {
  delete require.cache[require.resolve(name)]
  return require(name)
}
