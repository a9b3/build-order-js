const env = process.env.NODE_ENV || 'dev'

const config = {}

const envOverrides = {
  port: process.env.PORT,
}

config.dev = {
  port: envOverrides.port || 8080,
}

config.test = {
  port: envOverrides.port || 8080,
}

config.travis = {
  port: envOverrides.port || 8080,
}

config.prod = {
  port: envOverrides.port || 8080,
}

export default Object.assign(
  {},
  config[env],
)
