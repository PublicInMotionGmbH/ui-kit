import React from 'react'

function prepareOptions (props) {
  const { children, value, multiple } = props

  const selected = value == null ? [] : [].concat(value)
  const listedOptions = React.Children.map(children, element => element.props.value)

  const selectedIndexes = selected.map(value => listedOptions.indexOf(value)).filter(x => x !== -1)

  return {
    selected: multiple ? selectedIndexes : selectedIndexes[0],
    options: React.Children.map(
      children,
      (element, index) => React.cloneElement(element, ({ value: index }))
    )
  }
}

class NativeSelect extends React.Component {
  state = prepareOptions(this.props)

  componentWillReceiveProps (props) {
    if (this.props.value !== props.value || this.props.children !== props.children) {
      this.setState(prepareOptions(props))
    }
  }

  render () {
    const { value, children, ...passedProps } = this.props
    const { selected, options } = this.state

    return (
      <select {...passedProps} value={selected}>
        {options}
      </select>
    )
  }
}

export default NativeSelect
