// react-hot-loader/patch has to be first
import 'react-hot-loader/patch'
import 'styles/index.scss'
import React                    from 'react'
import { render }               from 'react-dom'
import { createBrowserHistory } from 'history'
import { AppContainer }         from 'react-hot-loader'
import Root                     from './root.js'

const browserHistory = createBrowserHistory()

function renderRoot(Component) {
  render(
    <AppContainer>
      <Component history={browserHistory} />
    </AppContainer>,
    document.getElementById('mount')
  )
}

renderRoot(Root)

if (module.hot) {
  module.hot.accept('../styles/index.scss', () => {
    require('../styles/index.scss')
  })
  module.hot.accept(() => {
    renderRoot(Root)
  })
}
