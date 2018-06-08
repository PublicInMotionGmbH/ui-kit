import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Collapse } from '@talixo/collapse'
import { Icon } from '@talixo/icon'

const moduleName = 'tree'

/**
 * Function to recursivly define propTypes
 * @param {func} f
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
  initialOpen: PropTypes.bool,

  /** Enable to select tree nodes */
  selectEnabled: PropTypes.bool,

  /** Function passed */
  onClick: PropTypes.func,

  /** Collapse tree with smooth effect */
  smooth: PropTypes.bool
}

const defaultProps = {
  initialOpen: false,
  selectEnabled: false,
  smooth: true
}

/**
 * Component which represents TreeNode.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.initialOpen]
 * @property {boolean} [props.selectEnabled]
 * @property {boolean} [props.smooth]
 * @class {React.Element}
 */
class TreeNode extends React.Component {
  state = {
    selected: false,
    collapsed: !this.props.initialOpen
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

  render () {
    const { children, initialOpen, node, selectEnabled, smooth, onClick, ...restProps } = this.props
    const { collapsed, selected } = this.state
    const nodeCls = buildClassName([moduleName, 'node'], null, { selected, childless: !children })
    const nodeNameCls = buildClassName([moduleName, 'node-name'])
    const childrenCls = buildClassName([moduleName, 'node-children'])
    const iconCls = buildClassName([moduleName, 'node-icon'])
    const icon = this.state.collapsed ? 'chevron_right' : 'expand_more'
    let iconContainer
    let nodes

    if (children) {
      iconContainer = <span
        className={iconCls}
        onClick={this.toggle} >
        {<Icon name={`${icon}`} />}
      </span>

      nodes = children.map((el, i) => {
        return (
          <TreeNode
            children={el.children}
            initialOpen={initialOpen}
            key={i}
            node={el}
            selectEnabled={selectEnabled}
            smooth={smooth}
            onClick={onClick}
          />
        )
      })
    }

    return (
      <span {...restProps}>
        <li className={nodeCls}>
          {iconContainer}
          <span className={nodeNameCls} onClick={this.handleClick}>
            {node ? node.name : null}
          </span>
        </li>
        <Collapse
          collapsed={collapsed}
          smooth={smooth}
          animationTime={100}>
          <ul className={childrenCls}>{nodes}</ul>
        </Collapse>
      </span>
    )
  }
}

TreeNode.propTypes = propTypes
TreeNode.defaultProps = defaultProps

export default TreeNode
