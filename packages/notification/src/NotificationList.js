import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { prefix } from '@talixo/shared'

const moduleName = prefix('notifications')

/**
* Component which handles fading in CSSTransition.
*
* @property {object} props
* @property {*} [props.children]
* @returns {React.Element}
*/
const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={600} classNames='fade'>
    {children}
  </CSSTransition>
)

/**
 * Component which represents list of notifications.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.style]
 * @class
 *
 * @property {object} state
 * @property {array} [state.items]
 */
class NotificationList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    this.timeout = setTimeout(() => this.setState({
      items: [].concat(this.props.children)
    }))
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  /**
  * Remove notification by the index
  *
  * @param {number} i
  */
  handleRemove (i) {
    const { items } = this.state

    this.setState({
      items: items.filter((x, index) => index !== i)
    })
  }

  render () {
    const { className, ...passedProps } = this.props
    return (
      <div className={`${moduleName}__container`}>
        <div className={cls(`${moduleName}__wrapper`, className)} {...passedProps}>
          <TransitionGroup className={moduleName}>
            {this.state.items.map((child, i) => (
              <Fade key={child.props.id}>
                {React.cloneElement(child, {
                  handleRemove: () => this.handleRemove(i)
                })}
              </Fade>
            ))}
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

NotificationList.propTypes = {
  /** Additional class name passed to notifications */
  className: PropTypes.string
}

NotificationList.defaultProps = {
}

export default NotificationList
