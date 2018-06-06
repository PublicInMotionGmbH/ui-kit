import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'
import { TextInput } from '@talixo/text-input'

import Message from './Message'

const moduleName = 'chat'

const propTypes = {
  /** Additional button. */
  additionalButton: PropTypes.node,

  /** Information message. */
  additionalInformation: PropTypes.node,

  /** Additional class name. */
  className: PropTypes.string,

  /** Additional class name. */
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      /** User name. */
      user: PropTypes.string,

      /** Message content. */
      message: PropTypes.node,

      /** Message time stamp. */
      time: PropTypes.number
    })
  ),

  /** Message renderer. */
  messageRenderer: PropTypes.func,

  /** User name. */
  user: PropTypes.string,

  /** Typing users. */
  usersTyping: PropTypes.arrayOf(
    PropTypes.shape({
      /** User name. */
      user: PropTypes.string,

      /** Typing status. */
      status: PropTypes.boolean
    })
  ),

  /** Message type. */
  type: PropTypes.oneOf(['chat', 'comments'])
}

const defaultProps = {
  messages: [],
  messageRenderer: message => message,
  type: 'chat',
  usersTyping: [],
  user: 'user'
}

/**
 * Component which represents Chat.
 *
 * @property {object} props
 * @property {*} [props.additionalButton]
 * @property {*} [props.additionalInformation]
 * @property {string} [props.className]
 * @property {array} [props.messages]
 * @property {string} [props.messages.user]
 * @property {*} [props.messages.message]
 * @property {number} [props.messages.time]
 * @property {*} [props.messageRenderer]
 * @property {string} [props.user]
 * @property {array} [props.usersTyping]
 * @property {string} [props.usersTyping.user]
 * @property {boolean} [props.usersTyping.status]
 * @property {string} [props.type]
 *
 * @property {object} state
 * @property {string} state.inputValue
 * @property {boolean} state.typingStatus
 *
 * @class
 */
class Chat extends React.PureComponent {
  state = {
    inputValue: '',
    typingStatus: false
  }

  /**
   * Fire addTypingUser when state.typingStatus is updated
   */
  componentDidUpdate (prevProps, prevState) {
    if (prevState.typingStatus !== this.state.typingStatus) {
      this.props.addTypingUser({
        status: this.state.typingStatus,
        user: this.props.user
      })
    }
  }

  /**
   * Handle input value change.
   *
   * @param {string} inputValue
   */
  handleInputChange = (inputValue) => {
    // If the user is typing clear the timeout
    if (this.state.typingStatus) {
      clearTimeout(this._typingTimeout)
    }

    this.setState(state => ({ typingStatus: true, inputValue }), () => {
      this._typingTimeout = setTimeout(() => this.setState({ typingStatus: false }), 2000)
    })
  }

  /**
   * Handle form submit.
   *
   * @param {SyntheticEvent} event
   */
  handleSubmit = (event) => {
    const { onSubmit, user } = this.props
    const { inputValue } = this.state

    // Prevent the form from being submitted
    event.preventDefault()
    // Prevent further propagation of the event
    event.stopPropagation()
    // Prevent synthetic event from being reused
    event.persist()

    // Build message
    const message = {
      message: inputValue,
      user: user,
      date: moment().valueOf()
    }

    // Submit message if the inputValue is not empty
    if (onSubmit && inputValue !== '') {
      onSubmit(message)
    }

    // Reset input value
    this.setState({ inputValue: '' })
  }

  /**
  * Save base node element.
  *
  * @param {Element} node
  */
  setRef = (node) => {
    this._input = node
  }

  /**
   * Render messages.
   *
   * @returns {React.Element}
   */
  renderMessages = () => {
    const { messages, messageRenderer, type, user } = this.props

    // Build class names
    const messagesClsName = buildClassName([moduleName, 'messages'])
    const messageClsName = buildClassName([moduleName, 'message'], null, { [type]: type })

    return (
      <div className={messagesClsName}>
        {
          messages.map((message, i) => (
            <Message
              className={messageClsName}
              key={i}
              message={messageRenderer(message.message)}
              user={message.user}
              time={message.time}
              style={{ marginLeft: type === 'chat' && user === message.user && 'auto' }}
            />
          ))
        }
      </div>
    )
  }

  /**
   * Render typing users.
   *
   * @returns {React.Element}
   */
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

  /**
   * Render chat component.
   *
   * @returns {React.Element}
   */
  render () {
    const { additionalButton, className, additionalInformation, messages, user, usersTyping, addTypingUser, messageRenderer, type, ...passedProps } = this.props
    const { inputValue } = this.state

    const wrapperClsName = buildClassName(moduleName, className)
    const formClsName = buildClassName([moduleName, 'form'])
    const additionalInfoCls = buildClassName([moduleName, 'additional-info'])
    const additionalBtnCls = buildClassName([moduleName, 'additional-button'])
    const inputContainerCls = buildClassName([moduleName, 'input-container'])
    const inputContainerInnerCls = buildClassName([moduleName, 'input-container-inner'])
    const messagesClsName = buildClassName([moduleName, 'messages'])

    return (
      <div className={wrapperClsName} style={{ display: 'block' }} {...passedProps}>
        <div className={messagesClsName}>
          {messages.length > 0 && this.renderMessages()}
        </div>
        <form className={formClsName} onSubmit={this.handleSubmit}>
          {usersTyping && this.renderTypingUsers()}
          <span className={inputContainerCls}>
            {additionalButton && <span className={additionalBtnCls}>{additionalButton}</span>}
            <span className={inputContainerInnerCls}>
              {additionalInformation && <span className={additionalInfoCls}>{additionalInformation}</span>}
              <TextInput
                inputRef={this.setRef}
                onChange={this.handleInputChange}
                placeholder='reply'
                value={inputValue}
              />
            </span>
          </span>
        </form>
      </div>
    )
  }
}

Chat.propTypes = propTypes

Chat.defaultProps = defaultProps

export default Chat
