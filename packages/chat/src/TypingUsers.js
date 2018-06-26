import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'chat'

const propTypes = {
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

  /** User info. */
  user: PropTypes.shape({
    /** User name. */
    name: PropTypes.string,

    /** User id. */
    id: PropTypes.string.isRequired
  }).isRequired
}

function TypingUsers (props) {
  const { typingUsers, user: { id } } = props
  const userTypingContainerCls = buildClassName([moduleName, 'user-typing-container'])
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
    <div className={userTypingContainerCls}>
      {users}
      {otherUsers.length > 0 && ` ${otherUsers.length > 1 ? 'are' : 'is'} typing`}
    </div>
  )
}

TypingUsers.propTypes = propTypes

export default TypingUsers
