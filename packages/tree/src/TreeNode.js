import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Collapse } from '@talixo/collapse'
import { Icon } from '@talixo/icon'

const moduleName = 'tree'

/**
 * Function to recursivly define propTypes
 * @param {function} f
 * @returns {function}
 */
function lazyFunction (f) {
  return function () {
    return f.apply(this, arguments)
  }
}

const lazyChildrenType = lazyFunction(function () {
  return childrenType
})

const childrenType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(lazyChildrenType)
}))

const propTypes = {
  /** Children of node */
  children: childrenType,

  /** Additional class name */
  className: PropTypes.string,

  /** Open tree when load */
  initiallyOpen: PropTypes.bool,

  /** Function passed onClick, It allows to select node */
  onClick: PropTypes.func,

  /** Collapse tree with smooth effect */
  smooth: PropTypes.bool
}

const defaultProps = {
  initiallyOpen: false,
  smooth: true
}

/**
 * Component which represents TreeNode.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.initiallyOpen]
 * @property {boolean} [props.smooth]
 * @class {React.Element}
 */
class TreeNode extends React.Component {
  state = {
    selected: false,
    collapsed: !this.props.initiallyOpen
  }

  /**
   * Function which handle click on node, change select
   */
  handleClick = (e) => {
    if (!this.props.onClick) return

    this.setState({
      selected: !this.state.selected
    })

    this.props.onClick(this.props.node, e)
  }

  /**
   * Function which handle toggle on node, change collaps
   */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  /**
   * Function which render icon
   * @returns {*}
   */
  renderIcon = () => {
    const iconCls = buildClassName([moduleName, 'node-icon'])
    const icon = this.state.collapsed ? 'chevron_right' : 'expand_more'

    return (
      <span
        className={iconCls}
        onClick={this.toggle} >
        {<Icon name={icon} />}
      </span>
    )
  }

  /**
   * Function which render children
   * @returns {React.Element}
   */
  renderChildren = () => {
    const { children, initiallyOpen, smooth, onClick } = this.props

    return (
      children.map((el, i) => {
        return (
          <TreeNode
            children={el.children}
            initiallyOpen={initiallyOpen}
            key={i}
            node={el}
            smooth={smooth}
            onClick={onClick}
          />
        )
      })
    )
  }

  render () {
    const { children, node, smooth } = this.props
    const { collapsed, selected } = this.state
    const nodeCls = buildClassName([moduleName, 'node'], null, { selected, childless: !children })
    const nodeNameCls = buildClassName([moduleName, 'node-name'])
    const childrenCls = buildClassName([moduleName, 'node-children'])

    return (
      <span>
        <li className={nodeCls}>
          {children && this.renderIcon()}
          <span className={nodeNameCls} onClick={this.handleClick}>
            { node.render && typeof node.render ? node.render(node.name) : node.name }
          </span>
        </li>
        <Collapse
          collapsed={collapsed}
          smooth={smooth}
          animationTime={100}>
          <ul className={childrenCls}>{children && this.renderChildren()}</ul>
        </Collapse>
      </span>
    )
  }
}

TreeNode.propTypes = propTypes
TreeNode.defaultProps = defaultProps

export default TreeNode
