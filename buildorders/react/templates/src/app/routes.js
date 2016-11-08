import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Index from './views/index/index.js'

export default (
  <Route path='/'>
    <IndexRoute component={Index} />
  </Route>
)
