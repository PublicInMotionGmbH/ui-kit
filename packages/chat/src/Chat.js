import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'

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
      time: PropTypes.number
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
  messageRenderer: message => message,
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
  handleInputChange = (e) => {
    const inputValue = e.target.value

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
    if (onSubmit && !/^(^$|\s+)$/.test(inputValue)) {
      onSubmit(message)
      this.setState({ inputValue: '' })
      if (this._input) this._input.style.height = '1em'
    }
  }

  handleKeyDown = (event) => {
    const which = event.which || event.key
    const segments = this._input.value.split('\n')
    const segmentsLength = segments.length

    let height
    if (which === 16) {
      this.setState({ shift: true })
    } else if (this.state.shift && which === 13) {
      height = segmentsLength + 1
    } else if (which === 8 && segments.slice(-1)[0] === '' && segmentsLength > 1) {
      height = segmentsLength - 1
    }
    this._input.style.height = `${height}em`

    if (!this.state.shift && which === 13 && /^(^$|\s+)$/.test(this._input.value)) {
      this.setState({ inputValue: '' })
      this._input.style.height = '1em'
    }
  }

  handleKeyUp = (event) => {
    const which = event.which || event.key

    if (which === 16) {
      this.setState({ shift: false })
    }

    if (!this.state.shift && which === 13 && /^(^$|\s+)$/.test(this._input.value)) {
      this.setState({ inputValue: '' })
      this._input.style.height = '1em'
    }
  }

  handleKeyPress = (event) => {
    const which = event.which || event.key

    if (!this.state.shift && which === 13) {
      this._form.dispatchEvent(new window.Event('submit'))
    }
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
        message={messageRenderer(message.message.replace(/(?:\r\n|\r|\n)/g, '<br/>'))}
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
    const userTypingContainerCls = buildClassName([moduleName, 'user-typing-container'])
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
      <span className={userTypingContainerCls}>
        {typingUsers}
        {otherUsers.length > 0 && ` ${otherUsers.length > 1 ? 'are' : 'is'} typing`}
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
    const { additionalButton, className, additionalInformation, id, messages, name, onSubmit, usersTyping, addTypingUser, messageRenderer, placeholder, type, ...passedProps } = this.props
    const { inputValue } = this.state

    const wrapperClsName = buildClassName(moduleName, className)
    const messagesClsName = buildClassName([moduleName, 'messages'])
    const formClsName = buildClassName([moduleName, 'form'])
    const additionalInfoCls = buildClassName([moduleName, 'additional-info'])
    const additionalBtnCls = buildClassName([moduleName, 'additional-button'])
    const inputContainerCls = buildClassName([moduleName, 'input-container'])
    const inputContainerInnerCls = buildClassName([moduleName, 'input-container-inner'])

    return (
      <div className={wrapperClsName} style={{ display: 'block' }} {...passedProps}>
        <div className={messagesClsName} ref={(node) => this.setRef(node, '_messages')}>
          {messages.length > 0 && this.renderMessages()}
        </div>
        <form
          ref={(node) => this.setRef(node, '_form')}
          className={formClsName}
          onSubmit={this.handleSubmit}
        >
          {usersTyping.length > 0 && this.renderTypingUsers()}
          <span className={inputContainerCls}>
            {additionalButton && <span className={additionalBtnCls}>{additionalButton}</span>}
            <span className={inputContainerInnerCls}>
              {additionalInformation && <span className={additionalInfoCls}>{additionalInformation}</span>}
              <textarea
                ref={(node) => this.setRef(node, '_input')}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onKeyPress={this.handleKeyPress}
                placeholder={placeholder}
                value={inputValue}
                style={{
                  maxHeight: '5em'
                }}
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
