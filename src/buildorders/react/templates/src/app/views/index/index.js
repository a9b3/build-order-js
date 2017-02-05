import styles from './index.scss'
import CSSModules from 'react-css-modules'
import React from 'react'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Index extends React.Component {
  render() {
    return <div styleName='index'>
      Hello World!
    </div>
  }
}
