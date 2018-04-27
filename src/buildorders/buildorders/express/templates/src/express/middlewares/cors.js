import cors   from 'cors'

import config from 'config'

export default cors({
  origin: (origin, callback) => {
    const originIsInWhiteList = config.CORS_ORIGINS.some(re => re.test(origin))
    callback(!originIsInWhiteList && 'Cors Issue', originIsInWhiteList)
  },
})
