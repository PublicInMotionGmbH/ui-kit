import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
const moduleName = 'tree'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Data passed to generate tree view */
  data: PropTypes.array,

  /** Open tree when load */
  initialOpen: PropTypes.bool,

  /** Enable to select tree nodes */
  selectEnabled: PropTypes.bool
}

/**
 * Component which represents TreeNode.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @class {React.Element}
 */
class TreeNode extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      isExpanded: this.props.open
    }
    this.toggle = this.toggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount (props) {
    this.setState({
      isExpanded: this.props.initialOpen
    })
  }

  handleClick (props) {
    if (!this.props.selectEnabled) return
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  toggle () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render () {
    const { children, open, selectEnabled, initialOpen } = this.props
    const { isExpanded, isSelected } = this.state
    let icon = this.state.isExpanded ? 'expand_more' : 'chevron_right'
    let iconContainer
    let nodes
    let style
    let treeNodeClsName = ''
    let selected = isSelected ? 'isSelected' : 'notSelected'

    if (children) {
      iconContainer = <span className='collapse-icon' onClick={this.toggle} >{<Icon name={`${icon}`} />}</span>

      nodes = children.map((i) =>
        <TreeNode
          selectEnabled={selectEnabled}
          initialOpen={initialOpen}
          open={open}
          key={i.id}
          node={i}
          children={i.children} />
      )

      if (isExpanded) {
        style = {
          display: 'block'
        }
      } else {
        style = {
          display: 'none'
        }
      }
    } else {
      treeNodeClsName = `${moduleName}-node--childless`
    }

    return (
      <span>
        <li className={`${moduleName}-node ${treeNodeClsName} ${selected}`}>{iconContainer}<span className={`${moduleName}-node__name`} onClick={this.handleClick}>{this.props.node.name}</span></li>
        <ul style={style}>{nodes}</ul>
      </span>
    )
  }
}

TreeNode.propTypes = propTypes

export default TreeNode
