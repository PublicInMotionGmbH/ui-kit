import React from 'react'

export function createNonStatelessElement (element) {
  if (!element) {
    return element
  }

  const Component = element.type

  if (typeof Component !== 'function' || Component.prototype.render) {
    return element
  }

  if (!Component.$nonStateless) {
    class _Component extends React.PureComponent {
      render () {
        return Component(this.props)
      }
    }

    _Component.displayName = Component.displayName || Component.name

    Object.defineProperty(Component, '$nonStateless', {
      enumerable: false,
      value: _Component
    })
  }

  if (element.ref) {
    return <Component.$nonStateless ref={element.ref} {...element.props} />
  }

  return <Component.$nonStateless {...element.props} />
}
