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
  informationMessage: PropTypes.node,

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
  renderMessageMarkdown: message => message
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

  handleInputChange = (e) => {
    if (this.state.typingStatus) {
      clearTimeout(this._typingTimeout)
    }

    this.setState(state => ({ typingStatus: true }), () => {
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
    const { messages, renderMessageMarkdown } = this.props
    const msgContainerCls = buildClassName(moduleName, null, 'messages-container')

    return (
      messages.map((message, i) => (
        <div key={i} className={msgContainerCls}>
          <span>
            {renderMessageMarkdown(message.message)}
          </span>
          {message.user}
        </div>
      )
      ))
  }

  renderTypingUsers = () => {
    const { usersTyping } = this.props
    const userTypingContainerCls = buildClassName(moduleName, null, 'user-typing-container')

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
    const { additionalButton, className, informationMessage, messages, user, usersTyping, addTypingUser, messageRenderer, ...passedProps } = this.props

    const infoMsgCls = buildClassName(moduleName, null, 'info-message')
    const additionalBtnCls = buildClassName(moduleName, null, 'additional-button')
    const inputContainerCls = buildClassName(moduleName, null, 'input-container')

    return (
      <div style={{ display: 'block' }} {...passedProps}>
        {messages.length > 0 && this.renderMessages()}
        {usersTyping && this.renderTypingUsers()}
        <form onSubmit={this.handleSubmit}>
          {additionalButton && <span className={additionalBtnCls}>{additionalButton}</span>}
          <span className={inputContainerCls}>
            {informationMessage && <span className={infoMsgCls}>{informationMessage}</span>}
            <TextInput
              type='text'
              inputRef={this.setRef}
              onChange={this.handleInputChange}
              placeholder='reply'
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
