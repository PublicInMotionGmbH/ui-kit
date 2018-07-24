import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { TextInput } from '@talixo/text-input'
import { Slider } from '@talixo/slider'
import { Tooltip } from '@talixo/tooltip'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
  defaultColor: '#e0e0e050',
  defaultAlpha: 1
}

/**
 * Component which represents ColorInput.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class ColorInput extends React.PureComponent {
  state = {
    color: this.props.defaultColor,
    alpha: this.props.defaultAlpha
  }

  handleChangeColor (e) {
    this.setState({color: e})
  }

  handleChangeAlpha (value) {
    this.setState({alpha: value})
  }

  render () {
    const { className, ...passedProps } = this.props
    const { color } = this.state

    const clsName = buildClassName('color-input', className)
    const displayClsName = buildClassName('color-input__display', className)
    const displayBgClsName = buildClassName('color-input__display--background', className)
    const textInputColorClsName = buildClassName('color-input__text-input', className)
    const pickerClsName = buildClassName('color-input__picker', className)
    const alphaBtnClsName = buildClassName('color-input__alpha-button', className)

    return (
      <div className={clsName}>

        <div className={displayBgClsName}>
          <div className={displayClsName}
            style={{
              background: color
            }} />
        </div>

        <TextInput
          className={textInputColorClsName} {...passedProps}
          placeholder={`e.g. ${this.props.defaultColor}`}
          value={color}
          onChange={e => this.handleChangeColor(e)}
        />
        <input
          className={pickerClsName}
          type='color'
          value={color}
          onChange={e => this.handleChangeColor(e.target.value)}
        />

        <Tooltip
          position='right'
          triggerOn='click'
          arrow={false}
          render={() => <div><Slider onChange={value => this.handleChangeAlpha(value)} /></div>}
        >
          <span className={alphaBtnClsName}>
            Alpha
          </span>
        </Tooltip>
      </div>
    )
  }
}

ColorInput.propTypes = propTypes
ColorInput.defaultProps = defaultProps

export default ColorInput
