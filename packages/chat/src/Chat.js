import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import TextareaAutosize from 'react-textarea-autosize'

import { buildClassName } from '@talixo/shared'
import { Textarea } from '@talixo/textarea'

import Message from './Message'

const moduleName = 'chat'

const propTypes = {
  /** Additional button. */
  additionalButton: PropTypes.node,

  /** Information message. */
  additionalInformation: PropTypes.node,

  /** Called when the user is typing. */
  addTypingUser: PropTypes.func,

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
      time: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  ),

  /** Message renderer. */
  messageRenderer: PropTypes.func,

  /** User name. */
  name: PropTypes.string,

  /** Handler for onSubmit event. */
  onSubmit: PropTypes.func,

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

  /** Reply input placeholder. */
  placeholder: PropTypes.string,

  /** Message type. */
  type: PropTypes.oneOf(['chat', 'comments'])
}

const defaultProps = {
  messages: [],
  messageRenderer: message => typeof message === 'string' ? message.replace(/(?:\r\n|\r|\n)/g, '<br/>') : message,
  type: 'chat',
  usersTyping: [],
  placeholder: 'reply',
  name: 'user'
}

/**
 * Component which represents Chat.
 *
 * @property {object} props
 * @property {*} [props.additionalButton]
 * @property {*} [props.additionalInformation]
 * @property {*} [props.addTypingUser]
 * @property {string} [props.className]
 * @property {array} [props.messages]
 * @property {string} [props.messages.name]
 * @property {string} [props.messages.id]
 * @property {*} [props.messages.message]
 * @property {number} [props.messages.time]
 * @property {*} [props.messageRenderer]
 * @property {string} [props.name]
 * @property {*} [props.onSubmit]
 * @property {string} [props.id]
 * @property {array} [props.usersTyping]
 * @property {string} [props.usersTyping.name]
 * @property {string} [props.usersTyping.id]
 * @property {boolean} [props.usersTyping.status]
 * @property {string} [props.placeholder]
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
    shift: false,
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
  handleInputChange = (value) => {
    this.setState({ inputValue: value })

    // If the user is typing clear the timeout
    if (this.state.typingStatus) {
      clearTimeout(this._typingTimeout)
    }
    this.setState(state => ({ typingStatus: true, value }), () => {
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

    this.mockHeightChange()

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
    if (onSubmit && !/^(^$|\s+)$/.test(inputValue)) {
      onSubmit(message)
      this.mockHeightChange()
      this.setState({ inputValue: '' })
    }
  }

  handleKeyDown = (event) => {
    const which = event.which || event.key

    if (which === 16) {
      this.setState({ shift: true })
    }

    if (!this.state.shift && which === 13 && /^(^$|\s+)$/.test(this._input.value)) {
      this.setState({ inputValue: '' })
    }
  }

  handleKeyUp = (event) => {
    const which = event.which || event.key

    if (which === 16) {
      this.setState({ shift: false })
    }

    if (!this.state.shift && which === 13 && /^(^$|\s+)$/.test(this._input.value)) {
      this.setState({ inputValue: '' })
    }
  }

  handleKeyPress = (event) => {
    const which = event.which || event.key

    if (!this.state.shift && which === 13) {
      this._form.dispatchEvent(new window.Event('submit'))
    }

    if (!this.state.shift && which === 13 && /^(^$|\s+)$/.test(this._input.value)) {
      event.preventDefault()
      this.setState({ inputValue: '' })
    }
  }

  mockHeightChange = (e) => {
    if (this.state.shift) return
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
    const messageClsName = buildClassName([moduleName, 'message'], null, { [type]: type })

    return messages.map((message, i) => (
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

  /**
   * Render typing users.
   *
   * @returns {React.Element}
   */
  renderTypingUsers = () => {
    const { usersTyping, id } = this.props
    const otherUsers = usersTyping.filter(user => user.id !== id)
    const typingUsers = otherUsers
      .map((user, i) => {
        let moreUsers = ''
        if (i > 0) {
          moreUsers = ', '
          if (i === otherUsers.length - 1) {
            moreUsers = ' and '
          }
        }
        return `${moreUsers}${user.name}`
      })
      .join('')

    return (
      <React.Fragment>
        {typingUsers}
        {otherUsers.length > 0 && ` ${otherUsers.length > 1 ? 'are' : 'is'} typing`}
      </React.Fragment>
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
    const { additionalButton, className, additionalInformation, id, messages, name, onSubmit, usersTyping, addTypingUser, messageRenderer, placeholder, type, ...passedProps } = this.props
    const { inputValue } = this.state

    const wrapperClsName = buildClassName(moduleName, className)
    const messagesClsName = buildClassName([moduleName, 'messages'])
    const formClsName = buildClassName([moduleName, 'form'])
    const additionalInfoCls = buildClassName([moduleName, 'additional-info'])
    const additionalBtnCls = buildClassName([moduleName, 'additional-button'])
    const inputContainerCls = buildClassName([moduleName, 'input-container'])
    const textareaCls = buildClassName([moduleName, 'textarea'])
    const inputContainerInnerCls = buildClassName([moduleName, 'input-container-inner'])
    const userTypingContainerCls = buildClassName([moduleName, 'user-typing-container'])

    return (
      <div className={wrapperClsName} {...passedProps}>
        <div className={messagesClsName} ref={(node) => this.setRef(node, '_messages')}>
          {messages.length > 0 && this.renderMessages()}
        </div>
        <form
          ref={(node) => this.setRef(node, '_form')}
          className={formClsName}
          onSubmit={this.handleSubmit}
        >
          <span className={userTypingContainerCls}>
            {usersTyping.length > 0 && this.renderTypingUsers()}
          </span>
          <span className={inputContainerCls}>
            {additionalButton && <span className={additionalBtnCls}>{additionalButton}</span>}
            <span className={inputContainerInnerCls}>
              {additionalInformation && <span className={additionalInfoCls}>{additionalInformation}</span>}
              <Textarea
                className={textareaCls}
                onChange={(value) => { this.handleInputChange(value) }}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onKeyPress={this.handleKeyPress}
                placeholder={placeholder}
                value={inputValue}
                TextareaComponent={TextareaAutosize}
                inputRef={(node) => this.setRef(node, '_input')}
                onHeightChange={this.mockHeightChange}
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
