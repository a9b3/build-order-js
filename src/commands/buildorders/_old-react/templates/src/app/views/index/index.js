import styles from './index.scss'

@CSSModules(styles)
export default class Index extends React.Component {
  render() {
    return <div styleName='index'>
      Hello World!
    </div>
  }
}
