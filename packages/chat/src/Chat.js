import React from 'react'
import PropTypes from 'prop-types'

// import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Chat.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {array} [props.messages]
 * @param {array} [props.user]
 * @returns {React.Element}
 */
class Chat extends React.Component {
  state = {
    inputValue: ''
  }

  handleInputChange = (e) => {
    const { onChange } = this.props

    this.setState({ inputValue: e.target.value })

    if (onChange) {
      onChange(e.target.value)
    }
  }

  handleSubmit = (e) => {
    const { onSubmit, user } = this.props
    e.preventDefault()

    const message = {
      message: this._input.value,
      user: user || 'name',
      date: new Date().getTime()
    }

    if (onSubmit) {
      onSubmit(message)
    }

    this.setState({ inputValue: '' })
  }

  setRef = (node) => {
    this._input = node
  }

  render () {
    const { className, messages, user, writing, ...passedProps } = this.props

    return (
      <div style={{ display: 'block' }} {...passedProps}>
        {
          messages.map(message => (
            <div>
              <span>
                {message.message}
              </span>
              {message.user}
            </div>
          ))
        }
        {
          writing && (<span>typing...</span>)
        }
        <form onSubmit={this.handleSubmit}>
          <input type='text' ref={this.setRef} value={this.state.inputValue} onChange={this.handleInputChange} />
        </form>
      </div>
    )
  }
}

Chat.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Chat.defaultProps = {
}

export default Chat
