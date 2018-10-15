import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { buildClassName, prefix } from '@talixo/shared'

import Notification from './Notification'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Should this list be sticked somewhere? */
  sticky: PropTypes.bool,

  /** Should automatically remove notification from list (not recommended)? kind of self-control */
  autoClose: PropTypes.bool,

  /** Horizontal position of sticky list */
  horizontal: PropTypes.oneOf([ 'start', 'center', 'end' ]),

  /** Horizontal position of sticky list */
  vertical: PropTypes.oneOf([ 'top', 'bottom' ]),

  /** Notifications to show */
  items: PropTypes.arrayOf(PropTypes.shape({
    /** Notification content */
    content: PropTypes.node,

    /** Notification type */
    type: PropTypes.oneOf([ 'toast', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info' ])
  })),

  /** Handler for event when notification has been closed */
  onClose: PropTypes.func
}

const defaultProps = {
  items: [],
  sticky: false,
  autoClose: false,
  horizontal: 'start',
  vertical: 'bottom'
}

/**
* Component which handles fading in CSSTransition.
*
* @property {object} props
* @property {*} [props.children]
* @returns {React.Element}
*/
function Fade ({ children, ...props }) {
  return (
    <CSSTransition {...props} timeout={600} classNames='fade'>
      {children}
    </CSSTransition>
  )
}

/**
 * Container which is building unique IDs for elements.
 *
 * @constructor
 */
function IdsContainer () {
  this.map = typeof WeakMap === 'undefined' ? new Map() : new WeakMap()
  this.nextId = 1
}

/**
 * Get unique ID for element.
 *
 * @param {*} element
 * @returns {number}
 */
IdsContainer.prototype.get = function (element) {
  return this.map.get(element) || this.set(element)
}

/**
 * Get unique ID for element
 *
 * @param {*} element
 * @returns {number}
 */
IdsContainer.prototype.set = function (element) {
  const id = ++this.nextId

  this.map.set(element, id)

  return id
}

/**
 * Component which represents list of notifications.
 *
 * @property {object} props
 * @property {string} props.horizontal
 * @property {string} props.vertical
 * @property {boolean} props.sticky
 * @property {boolean} props.autoClose
 * @property {function} [props.onClose]
 * @property {string} [props.className]
 * @property {object[]} [props.items]
 *
 * @class
 */
class NotificationList extends React.PureComponent {
  state = {
    items: this.props.items,
    hidden: []
  }

  container = new IdsContainer()

  /**
   * Update items & hidden items
   *
   * @param {object} props
   */
  componentWillReceiveProps (props) {
    if (props.items !== this.props.items) {
      this.setState({
        items: props.items
      })
    }

    if (this.props.autoClose && !props.autoClose) {
      this.setState({
        hidden: []
      })
    }
  }

  /**
  * Remove notification by the index
  *
  * @param {object} item
  * @param {number} index
  * @param {function} [nextCallback]
  */
  onClose (item, index, nextCallback) {
    const { hidden } = this.state
    const { autoClose, onClose } = this.props

    if (autoClose) {
      this.setState({
        hidden: hidden.concat(this.container.get(item))
      })
    }

    if (nextCallback) {
      nextCallback(item, index)
    }

    if (onClose) {
      onClose(item, index)
    }
  }

  getVisibleItems () {
    const { items, hidden } = this.state

    return items
      .map((item, index) => ({ item: item, index: index, id: this.container.get(item) }))
      .filter(item => hidden.indexOf(item.id) === -1)
  }

  render () {
    const { className, sticky, autoClose, horizontal, vertical, items, ...passedProps } = this.props

    const clsName = buildClassName('notification-list', className, { sticky }, [ horizontal, vertical ])

    const elements = this.getVisibleItems().map(item => {
      const { content, ...props } = item.item
      const close = () => this.onClose(item.item, item.index, item.item.onClose)

      return (
        <Fade key={item.id}>
          <Notification {...props} onClose={close}>{content}</Notification>
        </Fade>
      )
    })

    return (
      <div className={clsName} {...passedProps}>
        <div className={prefix('notification-list__wrapper')}>
          <TransitionGroup className={prefix('notification-list__content')}>
            {elements}
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

NotificationList.displayName = 'NotificationList'

NotificationList.propTypes = propTypes
NotificationList.defaultProps = defaultProps

export default NotificationList
