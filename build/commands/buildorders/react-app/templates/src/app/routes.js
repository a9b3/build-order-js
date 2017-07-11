import React     from 'react'
import { Route } from 'react-router'
import Index     from 'views/index/index.js'

export default (
  <Route path='/'>
    <Route path='/' component={Index} />
  </Route>
)
