import server from '../src/server.js'
import expect from 'expect'
import config from '../config.js'
import axios from 'axios'

describe('example', () => {
  beforeEach((done) => {
    server.listen(config.PORT)
    .then(() => done()).catch(done)
  })

  afterEach((done) => {
    server.stop()
    .then(() => done()).catch(done)
  })

  it('server response ok', async () => {
    const res = await axios.get(`http://localhost:${config.PORT}`)
    expect(res.status).toBe(200)
  })
})
