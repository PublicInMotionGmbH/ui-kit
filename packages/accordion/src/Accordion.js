import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

import { Collapse } from '@talixo/collapse'

/**
 * Build element to show in accordion
 *
 * @param {object} config
 * @param {function|null} config.onChange
 * @param {*} config.value
 * @param {boolean} config.smooth
 * @param {number|null} config.animationTime
 * @param {object|{ label: *, content: *, id: * }} option
 * @param {number} index
 * @returns {*}
 */
function buildElement (config, option, index) {
  const { onChange, value, smooth, animationTime } = config

  // Check if current block is collapsed
  const collapsed = value !== option.id

  // Find next value on toggle
  const nextValue = collapsed ? option.id : null

  // Build onClick handler
  const change = onChange ? () => onChange(nextValue) : null

  // Build class name for element
  const className = buildClassName([ 'accordion', 'element' ], null, { collapsed })

  // Build props for elements
  const buttonProps = {
    role: 'tab',
    className: prefix('accordion', 'element', 'toggle'),
    onClick: change,
    'aria-expanded': !collapsed
  }

  const collapseProps = {
    role: 'tabpanel',
    smooth: smooth,
    animationTime: animationTime,
    collapsed: collapsed,
    'aria-hidden': collapsed
  }

  return (
    <div className={className} key={`${index}--${option.id}`}>
      <button type='button' {...buttonProps}>
        {option.label}
      </button>
      <Collapse {...collapseProps}>
        {option.content}
      </Collapse>
    </div>
  )
}

/**
 * Component which represents checkbox.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @returns {React.Element}
 */
function Accordion (props) {
  const { options, className, smooth, animationTime, value, onChange, ...passedProps } = props

  // Calculate animation time
  const time = parseInt(animationTime, 10) || null

  // Build class name for Accordion
  const clsName = buildClassName('accordion', className)

  // Build accordion elements
  const elements = options.map(buildElement.bind(null, { onChange, value, smooth, animationTime: time }))

  return (
    <div className={clsName} {...passedProps}>
      {elements}
    </div>
  )
}

Accordion.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Should it collapse smoothly? */
  smooth: PropTypes.bool,

  /** Animation time (in ms), requires Collapse geometry CSS */
  animationTime: PropTypes.number,

  /** Options to show in accordion */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** ID of currently opened element */
  value: PropTypes.any,

  /** Event fired when button is clicked */
  onChange: PropTypes.func
}

Accordion.defaultProps = {
  smooth: true
}

export default Accordion
