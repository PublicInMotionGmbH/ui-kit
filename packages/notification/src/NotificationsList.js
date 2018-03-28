import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { prefix } from '@talixo/shared'

const name = prefix('notifications')

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={600} classNames='fade'>
    {children}
  </CSSTransition>
)

/**
 * Component which represents list of notifications.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.style]
 * @returns {React.Element}
 */
class NotificationsList extends React.Component {
  constructor () {
    super()
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    setTimeout(() => this.setState({items: Array.isArray(this.props.children) ? this.props.children : [this.props.children]}), 1000)
  }

  handleRemove (i) {
    let newItems = this.state.items.slice()
    newItems.splice(i, 1)
    this.setState({ items: newItems })
  }

  render () {
    const { className, style } = this.props
    return (
      <div className={`${name}-container`}>
        <div className={`${name}-wrapper`}>
          <TransitionGroup className={name}>
            {this.state.items.map((child, i) => (
              <Fade key={child.props.id}>
                {React.cloneElement(child, {
                  className,
                  style,
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

NotificationsList.propTypes = {
  /** Additional class name passed to notifications */
  className: PropTypes.string,

  /** Additional styles passed to notifications */
  style: PropTypes.object
}

NotificationsList.defaultProps = {
}

export default NotificationsList
