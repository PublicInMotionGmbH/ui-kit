import React from 'react'

import { TextInput } from '@talixo/text-input'

function ReplyBox (props) {
  return (
    <TextInput
      InputComponent='textarea'
      {...props}
    />
  )
}

export default ReplyBox
