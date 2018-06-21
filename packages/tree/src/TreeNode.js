import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Collapse } from '@talixo/collapse'
import { Icon } from '@talixo/icon'

const moduleName = 'tree-node'

/**
 * Only way to handle recursive data types through PropTypes.
 * https://github.com/facebook/react/issues/5676
 */
const lazyDataType = (...args) => dataType(...args)

const dataType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(lazyDataType)
}))

const propTypes = {
  /** Children of node */
  children: dataType,

  /** Additional class name */
  className: PropTypes.string,

  /** Open tree when load */
  initiallyOpen: PropTypes.bool,

  /** Function passed onClick, It allows to select node */
  onClick: PropTypes.func,

  /** Collapse tree with smooth effect */
  smooth: PropTypes.bool,

  /** Renderer for element */
  render: PropTypes.func
}

const defaultProps = {
  initiallyOpen: false,
  smooth: true,
  render: x => x
}

/**
 * Component which represents TreeNode.
 *
 * @property {object} props
 * @property {function} props.render
 * @property {boolean} props.initiallyOpen
 * @property {boolean} props.smooth
 * @property {string} [props.className]
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
   * Function which handle toggle on node, change collapse.
   */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const { children, node, onClick, smooth, render } = this.props
    const { collapsed, selected } = this.state

    const nodeCls = buildClassName(moduleName, null, { selected, childless: !children })
    const nodeNameCls = buildClassName([ moduleName, 'name' ], null, { selectable: onClick })
    const childrenCls = buildClassName([ moduleName, 'children' ])

    const iconCls = buildClassName([ moduleName, 'icon' ])
    const iconName = collapsed ? 'chevron_right' : 'expand_more'

    const icon = (
      <span className={iconCls} onClick={this.toggle}>
        <Icon name={iconName} />
      </span>
    )

    const element = (
      <span className={nodeNameCls} onClick={this.handleClick}>
        {render(node)}
      </span>
    )

    return (
      <li className={nodeCls}>
        {icon}
        {element}

        <Collapse collapsed={collapsed} smooth={smooth} animationTime={100}>
          <ul className={childrenCls}>{children}</ul>
        </Collapse>
      </li>
    )
  }
}

TreeNode.propTypes = propTypes
TreeNode.defaultProps = defaultProps

export default TreeNode
