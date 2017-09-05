import React      from 'react'
import styles     from './index.scss'
import CSSModules from 'react-css-modules'

@CSSModules(styles)
export default class Index extends React.Component {
  render() {
    return <div styleName='index'>
      Hello World!
    </div>
  }
}
