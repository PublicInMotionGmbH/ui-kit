import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { prefix } from '@talixo/commons'

const name = prefix('tab')

/**
 * Component which represents Tab.
 *
 * @param {object} props
 * @param {string} [props.active]
 * @param {string} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.id]
 * @param {string} [props.onClick]
 * @param {string} [props.style]
 * @returns {React.Element}
 */
const Tab = ({ active, children, className, id, onClick, style }) => {
  const mappedChildren = React.Children.map(children, child => {
    return typeof child === 'string' ? <span>{child}</span> : child
  })
  return (
    <div
      className={cls(name, className, {
        active: active !== false
      })}
      style={style}
      id={id}
      onClick={onClick}
    >
      {mappedChildren}
    </div>
  )
}

Tab.propTypes = {
  /** Active state */
  active: PropTypes.bool,

  /** Tab content */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Id passed to tab */
  id: PropTypes.string,

  /** Function that runs whe tab is clicked */
  onClick: PropTypes.func,

  /** Additional styles passed to the tab */
  style: PropTypes.object
}

Tab.defaultProps = {
  active: false
}

export default Tab
