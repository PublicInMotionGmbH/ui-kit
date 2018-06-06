import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { TextInput } from '@talixo/text-input'

const moduleName = 'chat'

const propTypes = {
  /** AddtiionalButton */
  additionalButton: PropTypes.node,

  /** Additional class name. */
  className: PropTypes.string,

  /** Information message */
  additionalInformation: PropTypes.node,

  /** Additional class name. */
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      /** User name. */
      user: PropTypes.string,

      message: PropTypes.node,

      time: PropTypes.string
    })
  ),

  /**  */
  messageRenderer: PropTypes.func,

  /** Typing users. */
  usersTyping: PropTypes.arrayOf(
    PropTypes.shape({
      /** User name. */

      user: PropTypes.string,

      /** Typing status. */
      status: PropTypes.boolean
    })
  ),

  /** User name. */
  user: PropTypes.string
}

const defaultProps = {
  messages: [],
  usersTyping: [],
  user: 'user',
  messageRenderer: message => message
}

/**
 * Component which represents Chat.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {array} [props.messages]
 * @param {array} [props.user]
 * @returns {React.Element}
 */
class Chat extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: '',
      typingStatus: false
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.typingStatus !== this.state.typingStatus) {
      this.props.addTypingUser({
        status: this.state.typingStatus,
        user: this.props.user
      })
    }
  }

  handleInputChange = (inputValue) => {
    if (this.state.typingStatus) {
      clearTimeout(this._typingTimeout)
    }

    this.setState(state => ({ typingStatus: true, inputValue }), () => {
      this._typingTimeout = setTimeout(() => this.setState({ typingStatus: false }), 2000)
    })
  }

  handleSubmit = (e) => {
    const { onSubmit, user } = this.props
    e.preventDefault()

    const message = {
      message: this._input.value,
      user: user || 'name',
      date: new Date().getTime()
    }

    if (onSubmit && this._input.value !== '') {
      onSubmit(message)
    }

    this._input.value = ''
  }

  setRef = (node) => {
    this._input = node
  }

  renderMessages = () => {
    const { messages, messageRenderer } = this.props
    const msgContainerCls = buildClassName([moduleName, 'messages-container'])

    return (
      messages.map((message, i) => (
        <div key={i} className={msgContainerCls}>
          <span>
            {messageRenderer(message.message)}
          </span>
          {message.user}
        </div>
      )
      ))
  }

  renderTypingUsers = () => {
    const { usersTyping } = this.props
    const userTypingContainerCls = buildClassName([moduleName, 'user-typing-container'])

    return (
      <span className={userTypingContainerCls}>
        {usersTyping.map((user, i) => {
          let moreUsers = null
          if (i > 0) {
            moreUsers = ', '
            if (i === usersTyping.length - 1) {
              moreUsers = ' and '
            }
          }
          return <span key={i}>{moreUsers && <span>{moreUsers}</span>}{user.user}</span>
        })}
        {usersTyping.length > 0 &&
         (<span>{usersTyping.length === 1 ? ' is' : ' are'} typing</span>)}
      </span>
    )
  }

  render () {
    const { additionalButton, className, additionalInformation, messages, user, usersTyping, addTypingUser, messageRenderer, ...passedProps } = this.props
    const { inputValue } = this.state

    const wrapperClsName = buildClassName(moduleName, className)
    const additionalInfoCls = buildClassName([moduleName, 'additional-info'])
    const additionalBtnCls = buildClassName([moduleName, 'additional-button'])
    const inputContainerCls = buildClassName([moduleName, 'input-container'])

    return (
      <div className={wrapperClsName} style={{ display: 'block' }} {...passedProps}>
        {messages.length > 0 && this.renderMessages()}
        {usersTyping && this.renderTypingUsers()}
        <form onSubmit={this.handleSubmit}>
          {additionalButton && <span className={additionalBtnCls}>{additionalButton}</span>}
          <span className={inputContainerCls}>
            {additionalInformation && <span className={additionalInfoCls}>{additionalInformation}</span>}
            <TextInput
              inputRef={this.setRef}
              onChange={this.handleInputChange}
              placeholder='reply'
              value={inputValue}
            />
          </span>
        </form>
      </div>
    )
  }
}

Chat.propTypes = propTypes
Chat.defaultProps = defaultProps

export default Chat
