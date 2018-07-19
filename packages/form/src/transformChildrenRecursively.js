import React from 'react'

/**
 * Transform React node according when pass some conditions (recursively).
 *
 * @param {React.Element} node
 * @param {function} transform
 * @param {function} [condition]
 * @returns {*}
 */
export function transformNodeRecursively (node, transform, condition = x => x) {
  if (!node || typeof node !== 'object') {
    return node
  }

  if (condition(node)) {
    node = transform(node)
  }

  if (!node || !node.props || !node.props.children) {
    return node
  }

  const children = transformChildrenRecursively(node.props.children, transform, condition)

  if (children === node.props.children) {
    return node
  }

  return React.cloneElement(node, { ref: node.ref }, children)
}

/**
 * Transform list of children according to some conditions.
 *
 * @param {array} children
 * @param {function} transform
 * @param {function} [condition]
 * @returns {array}
 */
function transformChildrenRecursively (children, transform, condition = x => x) {
  let isModified = false

  const nextChildren = React.Children.map(children, node => {
    const nextNode = transformNodeRecursively(node, transform, condition)

    if (nextNode !== node) {
      isModified = true
    }

    return nextNode
  })

  if (isModified) {
    return nextChildren
  }

  return children
}

export default transformChildrenRecursively
