import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

import Icon from '@talixo/icon'

const moduleName = prefix('sidebar-element')

/**
 * Component which represents Sidebar.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
class SidebarElement extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.saveRef = this.saveRef.bind(this)

    this.listener = null
    this.state = {
      opened: false
    }
  }

  componentWillUnmount () {
    this.detachListener()
    this.node = null
  }

  saveRef (node) {
    this.node = node
  }

  handleClose (e) {
    if (!this.node) {
      return
    }

    const html = document.documentElement

    let element = e.target
    while (element !== html && element !== this.node) {
      element = element.parentElement
    }

    if (element === this.node) {
      return
    }

    this.setState({ opened: false })
    this.detachListener()
  }

  handleClick (e) {
    const { children, onClick } = this.props
    const opened = !this.state.opened

    if (!children) {
      return
    }

    this.setState({ opened: opened })

    if (opened) {
      this.attachListener()
    } else {
      this.detachListener()
    }

    if (onClick) {
      onClick(e)
    }
  }

  attachListener () {
    this.detachListener()
    document.documentElement.addEventListener('click', this.handleClose)
    window.addEventListener('hashchange', this.handleClose)
    window.addEventListener('popstate', this.handleClose)
    window.addEventListener('close-sidebar', this.handleClose)
  }

  detachListener () {
    document.documentElement.removeEventListener('click', this.handleClose)
    window.removeEventListener('hashchange', this.handleClose)
    window.removeEventListener('popstate', this.handleClose)
    window.removeEventListener('close-sidebar', this.handleClose)
  }

  render () {
    const { className, icon, label, active, children, onClick, ...passedProps } = this.props
    const { opened } = this.state

    const clsName = cls(moduleName, className, {
      [`${moduleName}--active`]: active,
      [`${moduleName}--opened`]: opened
    })

    const element = children ? React.Children.only(children) : null

    return (
      <div className={clsName} {...passedProps} ref={this.saveRef}>
        <div className={`${moduleName}__button`} onClick={this.handleClick}>
          <Icon name={icon} />
          {label}
        </div>

        {element}
      </div>
    )
  }
}

SidebarElement.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

export default SidebarElement
