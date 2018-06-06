import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Message from './Message'

const moduleName = 'chat'

const propTypes = {
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
  user: 'user'
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

  render () {
    const { className, messages, user, usersTyping, addTypingUser, type, ...passedProps } = this.props

    const messagesClsName = buildClassName([moduleName, 'messages'])
    const messageClsName = buildClassName([moduleName, 'message'], null, { [type]: type })

    return (
      <div style={{ display: 'block' }} {...passedProps}>
        <div className={messagesClsName}>
          {
            messages.map((message, i) => (
              <Message
                className={messageClsName}
                key={i}
                message={message.message}
                user={message.user}
                time={message.time}
                style={{ marginLeft: type === 'chat' && user === message.user && 'auto' }}
              />
            ))
          }
          {
            usersTyping.length > 0 && (
              <span>
                {
                  usersTyping.map((user, i) => {
                    let moreUsers = null
                    if (i > 0) {
                      moreUsers = ', '
                      if (i === usersTyping.length - 1) {
                        moreUsers = ' and '
                      }
                    }
                    return <span key={i}>{moreUsers && <span>{moreUsers}</span>}{user.user}</span>
                  })
                }
                {usersTyping.length === 1 ? ' is' : ' are'} typing
              </span>
            )
          }
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            ref={this.setRef}
            onChange={this.handleInputChange}
            placeholder='reply'
          />
        </form>
      </div>
    )
  }
}

Chat.propTypes = propTypes

Chat.defaultProps = defaultProps

export default Chat
