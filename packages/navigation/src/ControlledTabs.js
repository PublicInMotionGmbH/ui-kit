import React from 'react'
import PropTypes from 'prop-types'

import Element from './Element'

const propTypes = {
  /** Active tab */
  activeTab: PropTypes.number,

  /** List of tab labels */
  labels: PropTypes.arrayOf(PropTypes.object),

  /** Function passed to page buttons */
  onChange: PropTypes.func
}

const defaultProps = {
  activeTab: 0,
  labels: []
}

/**
 * Component which represents ControlledTabs.
 *
 * @param {object} props
 * @param {number} [props.activeTab]
 * @param {object[]} [props.labels]
 * @param {function} [props.onChange]
 * @returns {React.Element}
 */
function ControlledTabs (props) {
  const { activeTab, labels, onChange, ...passedProps } = props

  return labels.map(tab => (
    <Element
      key={tab.id}
      onClick={() => { onChange(tab.id) }}
      active={activeTab === tab.id}
      {...passedProps}
    >
      {tab.name}
    </Element>
  ))
}

ControlledTabs.propTypes = propTypes

ControlledTabs.defaultProps = defaultProps

export default ControlledTabs
