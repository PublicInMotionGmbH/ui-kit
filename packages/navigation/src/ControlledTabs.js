import React from 'react'
import PropTypes from 'prop-types'
import Element from './Element'

/**
 * Component which represents ControlledTabs.
 *
 * @param {object} props
 * @param {number} [props.activeTab]
 * @param {array} [props.labels]
 * @param {function} [props.onChange]
 * @returns {React.Element}
 */
function ControlledTabs (props) {
  const { activeTab, labels, onChange, ...passedProps } = props

  return labels.map((tab, i) => (
    <Element
      key={i}
      onClick={() => { onChange(i) }}
      active={activeTab === i}
      {...passedProps}
    >
      {tab}
    </Element>
  ))
}

ControlledTabs.propTypes = {
  /** Active tab */
  activeTab: PropTypes.number,

  /** List of tab labels */
  labels: PropTypes.array,

  /** Function passed to page buttons */
  onChange: PropTypes.func
}

ControlledTabs.defaultProps = {
  activeTab: 0,
  labels: []
}

export default ControlledTabs
