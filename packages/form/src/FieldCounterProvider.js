import React from 'react'
import PropTypes from 'prop-types'

class FieldCounterProvider extends React.PureComponent {
  getChildContext () {
    return {
      formFieldCounter: {
        generateUid: this.generateUid
      }
    }
  }

  constructor (props) {
    super(props)

    this.currentIndex = isNaN(props.initialIndex) ? 1 : +props.initialIndex
  }

  generateUid = () => {
    return this.currentIndex++
  }

  render () {
    return this.props.children
  }
}

FieldCounterProvider.childContextTypes = {
  formFieldCounter: PropTypes.object
}

FieldCounterProvider.defaultProps = {
  initialIndex: 1
}

export default FieldCounterProvider
