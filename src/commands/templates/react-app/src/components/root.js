import React      from 'react'
import PropTypes  from 'prop-types'
import { Router } from 'react-router'

import routes     from 'components/routes'

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  }

  render() {
    return <Router
      history={this.props.history}
    >
      {routes}
    </Router>
  }
}
