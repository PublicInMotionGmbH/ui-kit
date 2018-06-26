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
  onTyping: PropTypes.func,

  /** Additional class name. */
  className: PropTypes.string,

  /** Additional class name. */
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      /** User info. */
      user: PropTypes.shape({
        /** User name. */
        name: PropTypes.string,

        /** User id. */
        id: PropTypes.string.isRequired
      }),

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

  /** User info. */
  user: PropTypes.shape({
    /** User name. */
    name: PropTypes.string,

    /** User id. */
    id: PropTypes.string.isRequired
  }).isRequired,

  /** Handler for onSubmit event. */
  onSubmit: PropTypes.func,

  /** Typing users. */
  typingUsers: PropTypes.arrayOf(
    PropTypes.shape({
      /** User info. */
      user: PropTypes.shape({
        /** User name. */
        name: PropTypes.string,

        /** User id. */
        id: PropTypes.string.isRequired
      }),

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
  typingUsers: [],
  placeholder: 'reply'
}

/**
 * Component which represents Chat.
 *
 * @property {object} props
 * @property {*} [props.additionalButton]
 * @property {*} [props.additionalInformation]
 * @property {*} [props.onTyping]
 * @property {string} [props.className]
 * @property {Array<{ [user]: { [name]: string, [id]: string }, [status]: boolean }>} [props.messages]
 * @property {number} [props.messages.time]
 * @property {*} [props.messageRenderer]
 * @property {object} [props.user]
 * @property {string} [props.user.id]
 * @property {string} [props.user.name]
 * @property {*} [props.onSubmit]
 * @property {Array<{ [user]: { [name]: string, [id]: string }, [status]: boolean }>} [props.typingUsers]
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
    typingStatus: false
  }

  /**
   * Fire onTyping when state.typingStatus is updated.
   * Scroll messages continer to bottom if messages are updated.
   */
  componentDidUpdate (prevProps, prevState) {
    if (prevState.typingStatus !== this.state.typingStatus && this.props.onTyping) {
      this.props.onTyping({
        status: this.state.typingStatus
      })
    }

    if (this.props.messages !== prevProps.messages) {
      this.scrollToBottom(this._messages)
    }
  }

  /**
   * Clear timeout on unmounting.
   */
  componentWillUnmount () {
    clearTimeout(this._typingTimeout)
  }

  /**
   * Handle input value change.
   *
   * @param {string} inputValue
   */
  handleInputChange = (value) => {
    // If the user is typing clear the timeout
    if (this.state.typingStatus) {
      clearTimeout(this._typingTimeout)
    }

    this.setState(state => ({ inputValue: value, typingStatus: true }), () => {
      this._typingTimeout = setTimeout(() => this.setState({ typingStatus: false }), 2000)
    })
  }

  /**
   * Handle form submit.
   *
   * @param {SyntheticEvent} event
   */
  handleSubmit = (event) => {
    const { onSubmit, user: { name, id } } = this.props
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
      user: {
        name: name,
        id: id
      },
      time: +moment()
    }

    // Prevent from submitting message if the inputValue is empty
    if (/^\s*$/.test(inputValue)) {
      return
    }

    // Submit message
    if (onSubmit) {
      onSubmit(message)
      // Reset input value
      this.setState({ inputValue: '' })
    }
  }

  /**
   * Handle key press.
   *
   * @param {SyntheticEvent} event
   */
  handleKeyPress = (event) => {
    const which = event.which || event.key

    // Dispatch submit event only if 'enter' key is pressed
    if (which === 13 && event.shiftKey === false) {
      event.preventDefault()
      this._form.dispatchEvent(new window.Event('submit'))
    }
  }

  /**
   * Render messages.
   *
   * @returns {React.Element}
   */
  renderMessages = () => {
    const { user: { id }, messages, messageRenderer, type } = this.props

    return messages.map((message, i) => (
      <Message
        className={buildClassName([moduleName, 'message'], id === message.user.id && `talixo-${moduleName}__message--auto`, { [type]: type })}
        key={i}
        message={messageRenderer(message.message)}
        name={message.user.name}
        time={message.time}
      />
    ))
  }

  /**
   * Render typing users.
   *
   * @returns {React.Element}
   */
  renderTypingUsers = () => {
    const { typingUsers, user: { id } } = this.props
    const otherUsers = typingUsers.filter(user => user.user.id !== id)
    const users = otherUsers
      .map((user, i) => {
        let moreUsers = ''
        if (i > 0) {
          moreUsers = ', '
          if (i === otherUsers.length - 1) {
            moreUsers = ' and '
          }
        }
        return `${moreUsers}${user.user.name}`
      })
      .join('')

    return (
      <React.Fragment>
        {users}
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
    const { additionalButton, className, additionalInformation, user, messages, onSubmit, typingUsers, onTyping, messageRenderer, placeholder, type, ...passedProps } = this.props
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
          <div className={userTypingContainerCls}>
            {typingUsers.length > 0 && this.renderTypingUsers()}
          </div>
          <span className={inputContainerCls}>
            {additionalButton && <span className={additionalBtnCls}>{additionalButton}</span>}
            <span className={inputContainerInnerCls}>
              {additionalInformation && <span className={additionalInfoCls}>{additionalInformation}</span>}
              <Textarea
                className={textareaCls}
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder={placeholder}
                value={inputValue}
                TextareaComponent={TextareaAutosize}
                inputRef={(node) => this.setRef(node, '_input')}
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
