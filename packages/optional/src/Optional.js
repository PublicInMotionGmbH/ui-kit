import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Textarea } from '@talixo/textarea'
import { Checkbox } from '@talixo/checkbox'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
}

/**
 * Component which represents Optional.
 *
 * @property {object} props
 * @property {string} [props.className]
 *
 * @class {React.Element}
 */
class Optional extends React.PureComponent {
  state = {
    value: this.props.value || null,
    visible: !this.props.collapsible || false
  }

  handleTextareaChange (value) {
    this.setState({
      value: value
    })
  }

  handleCheckboxChange (value) {
    this.setState({
      visible: value
    })
  }

  render () {
    const { className, label, name, collapsible, ...passedProps } = this.props
    const { value, visible } = this.state

    const clsName = buildClassName('optional', className)
    const clsLabelName = buildClassName('optional-label', className)
    const clsCheckboxName = buildClassName('optional-checkbox', className)

    return (
      <div
        className={clsName} {...passedProps}
        name={name}
        label={label}
        value={value}
      >
        {collapsible &&
          <Checkbox
            className={clsCheckboxName}
            onChange={(value) => this.handleCheckboxChange(value)}
          >
            {<span className={clsLabelName}>{label}</span>}
          </Checkbox>}
        {!collapsible && label && <span className={clsLabelName}>{label}</span>}
        {visible &&
          <Textarea
            value={value}
            onChange={(value) => this.handleTextareaChange(value)}
          />}
      </div>
    )
  }
}

Optional.displayName = 'Optional'

Optional.propTypes = propTypes
Optional.defaultProps = defaultProps

export default Optional
