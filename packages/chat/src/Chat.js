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
      name: PropTypes.string,

      /** User id. */
      id: PropTypes.string,

      /** Message content. */
      message: PropTypes.node,

      /** Message time stamp. */
      time: PropTypes.number
    })
  ),

  /** Message renderer. */
  messageRenderer: PropTypes.func,

  /** User name. */
  name: PropTypes.string,

  /** User id. */
  id: PropTypes.string.isRequired,

  /** Typing users. */
  usersTyping: PropTypes.arrayOf(
    PropTypes.shape({
      /** User name. */
      name: PropTypes.string,

      /** User id. */
      id: PropTypes.string,

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
  name: 'user'
}

/**
 * Component which represents Chat.
 *
 * @property {object} props
 * @property {*} [props.additionalButton]
 * @property {*} [props.additionalInformation]
 * @property {string} [props.className]
 * @property {array} [props.messages]
 * @property {string} [props.messages.name]
 * @property {string} [props.messages.id]
 * @property {*} [props.messages.message]
 * @property {number} [props.messages.time]
 * @property {*} [props.messageRenderer]
 * @property {string} [props.name]
 * @property {string} [props.id]
 * @property {array} [props.usersTyping]
 * @property {string} [props.usersTyping.name]
 * @property {string} [props.usersTyping.id]
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
   * Fire addTypingUser when state.typingStatus is updated.
   * Scroll messages continer to bottom if messages are updated.
   */
  componentDidUpdate (prevProps, prevState) {
    if (prevState.typingStatus !== this.state.typingStatus && this.props.addTypingUser) {
      this.props.addTypingUser({
        status: this.state.typingStatus,
        name: this.props.name,
        id: this.props.id
      })
    }

    if (this.props.messages !== prevProps.messages) {
      this.scrollToBottom(this._messages)
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
    const { onSubmit, name, id } = this.props
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
      name: name,
      id: id,
      time: moment().valueOf()
    }

    // Submit message if the inputValue is not empty
    if (onSubmit && inputValue !== '') {
      onSubmit(message)
    }

    // Reset input value
    this.setState({ inputValue: '' })
  }

  /**
   * Render messages.
   *
   * @returns {React.Element}
   */
  renderMessages = () => {
    const { id, messages, messageRenderer, type } = this.props

    // Build class names
    const messagesClsName = buildClassName([moduleName, 'messages'])
    const messageClsName = buildClassName([moduleName, 'message'], null, { [type]: type })

    return (
      <div className={messagesClsName} ref={(node) => this.setRef(node, '_messages')}>
        {
          messages.map((message, i) => (
            <Message
              className={messageClsName}
              key={i}
              message={messageRenderer(message.message)}
              name={message.name}
              time={message.time}
              style={{ marginLeft: type === 'chat' && id === message.id && 'auto' }}
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
          return <span key={i}>{moreUsers && <span>{moreUsers}</span>}{user.name}</span>
        })}
        {usersTyping.length > 0 &&
         (<span>{usersTyping.length === 1 ? ' is' : ' are'} typing</span>)}
      </span>
    )
  }

  /**
  * Save base node element.
  *
  * @param {Element} node
  * @param {string} name
  */
  setRef = (node, name) => {
    this[name] = node
  }

  /**
   * Scroll to bottom of the element.
   *
   * @param {node} element
   */
  scrollToBottom = (element) => {
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
  }

  /**
   * Render chat component.
   *
   * @returns {React.Element}
   */
  render () {
    const { additionalButton, className, additionalInformation, id, messages, name, usersTyping, addTypingUser, messageRenderer, type, ...passedProps } = this.props
    const { inputValue } = this.state

    const wrapperClsName = buildClassName(moduleName, className)
    const formClsName = buildClassName([moduleName, 'form'])
    const additionalInfoCls = buildClassName([moduleName, 'additional-info'])
    const additionalBtnCls = buildClassName([moduleName, 'additional-button'])
    const inputContainerCls = buildClassName([moduleName, 'input-container'])
    const inputContainerInnerCls = buildClassName([moduleName, 'input-container-inner'])

    return (
      <div className={wrapperClsName} style={{ display: 'block' }} {...passedProps}>
        {messages.length > 0 && this.renderMessages()}
        <form className={formClsName} onSubmit={this.handleSubmit}>
          {usersTyping && this.renderTypingUsers()}
          <span className={inputContainerCls}>
            {additionalButton && <span className={additionalBtnCls}>{additionalButton}</span>}
            <span className={inputContainerInnerCls}>
              {additionalInformation && <span className={additionalInfoCls}>{additionalInformation}</span>}
              <TextInput
                inputRef={(node) => this.setRef(node, '_input')}
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
