import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { TextInput } from '@talixo/text-input'

import Message from './Message'

const moduleName = 'chat'

const propTypes = {
  /** AddtiionalButton */
  additionalButton: PropTypes.node,

  /** Information message */
  additionalInformation: PropTypes.node,

  /** Additional class name. */
  className: PropTypes.string,

  /** Additional class name. */
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      /** User name. */
      user: PropTypes.string,

      message: PropTypes.node,

      time: PropTypes.string
    })
  ),

  /** Function passed to message renderer */
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

  /** Message type. */
  type: PropTypes.oneOf(['chat', 'comments']),

  /** User name. */
  user: PropTypes.string
}

const defaultProps = {
  messages: [],
  type: 'chat',
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
    const { messages, messageRenderer, type, user } = this.props
    const messageClsName = buildClassName([moduleName, 'message'], null, { [type]: type })

    return (
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
    )
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
