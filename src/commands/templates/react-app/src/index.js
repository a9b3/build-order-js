// react-hot-loader/patch has to be first
import 'react-hot-loader/patch'
import 'styles/index.scss'
import React             from 'react'
import { render }        from 'react-dom'
import { AppContainer }  from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import routes            from './components/routes.js'

function renderRoot() {
  render(
    <AppContainer>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('mount'),
  )
}

renderRoot()

if (module.hot) {
  module.hot.accept('./styles/index.scss', () => {
    require('./styles/index.scss')
  })
  module.hot.accept(() => {
    renderRoot()
  })
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
}
