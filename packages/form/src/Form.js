import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import isField from './isField'
import isRowWrappable from './isRowWrappable'
import transformChildrenRecursively from './transformChildrenRecursively'

import FormRow from './FormRow'

export const moduleName = 'form'

const propTypes = {
  /** Children to be put inside form. */
  children: PropTypes.node,

  /** Additional class name. */
  className: PropTypes.string,

  /** Should position Fields horizontally? */
  horizontal: PropTypes.bool,

  /** Only for 'horizontal': should spread Field input when there is no hint? */
  spread: PropTypes.bool
}

function wrapWithRow (node, props) {
  const { horizontal, spread } = props

  return (
    <FormRow horizontal={horizontal} spread={spread}>{node}</FormRow>
  )
}

function wrapChildrenWithRows (children, props) {
  let isModified = false

  const nextChildren = React.Children.map(children, node => {
    if (isRowWrappable(node)) {
      isModified = true
      return wrapWithRow(node, props)
    }

    if (!node || !node.props || !node.props.children) {
      return node
    }

    const innerChildren = wrapChildrenWithRows(node.props.children, props)

    if (innerChildren === node.props.children) {
      return node
    }

    isModified = true
    return React.cloneElement(node, { ref: node.ref }, innerChildren)
  })

  return isModified ? nextChildren : children
}

function isConfigurableNode (node) {
  return isField(node) || isField(node, FormRow)
}

/**
 * Component which represents Form.
 *
 * @property {object} props
 * @property {*} props.children
 * @property {string} [props.className]
 * @property {*} [props.footerComponent]
 * @returns {React.Element}
 */
class Form extends React.Component {
  /**
   * Pass global horizontal/spread parameters to Form fields.
   *
   * @param {array} children
   * @returns {array}
   */
  buildNodesList (children) {
    const { horizontal, spread } = this.props

    if (horizontal == null && spread == null) {
      return children
    }

    return wrapChildrenWithRows(
      transformChildrenRecursively(children, node => this.transformNode(node), isConfigurableNode),
      this.props
    )
  }

  /**
   * Update node with global horizontal/spread values, if it doesn't have own.
   *
   * @param {React.Element} node
   * @returns {React.Element}
   */
  transformNode (node) {
    const { horizontal, spread } = this.props

    const shouldChangeHorizontal = horizontal != null && node.props.horizontal == null
    const shouldChangeSpread = spread != null && node.props.spread == null

    if (!shouldChangeHorizontal && !shouldChangeSpread) {
      return node
    }

    const props = {
      ref: node.ref
    }

    if (shouldChangeSpread) {
      props.spread = spread
    }

    if (shouldChangeHorizontal) {
      props.horizontal = horizontal
    }

    return React.cloneElement(node, props, node.props.children)
  }

  render () {
    const { children, className, horizontal, spread, formatErrorMessage, ...passedProps } = this.props

    const formCls = buildClassName(moduleName, className)

    return (
      <form className={formCls} {...passedProps}>
        {this.buildNodesList(children)}
      </form>
    )
  }
}

Form.displayName = 'Form'

Form.propTypes = propTypes

export default Form
