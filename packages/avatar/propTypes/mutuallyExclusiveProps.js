/**
 * Copyright (c) 2016 Airbnb
 *
 * This source code is licensed under the MIT license
 */

function wrapValidator (validator, typeName, typeChecker = null) {
  return Object.assign(validator.bind(), {
    typeName,
    typeChecker// ,
    // isRequired: Object.assign(validator.isRequired.bind(), {
    //   typeName,
    //   typeChecker,
    //   typeRequired: true
    // })
  })
}

// Additional required field
function mutuallyExclusiveProps (propType, required, ...exclusiveProps) {
  // if (typeof propType !== 'function') {
  //   throw new TypeError('a propType is required')
  // }
  //
  // if (exclusiveProps.length < 1) {
  //   throw new TypeError('at least one prop that is mutually exclusive with this propType is required')
  // }

  const propList = exclusiveProps.join(', or ')

  const map = exclusiveProps.reduce((acc, prop) => ({ ...acc, [prop]: true }), {})
  const countProps = (count, prop) => (count + (map[prop] ? 1 : 0))

  const validator = function mutuallyExclusiveProps (props, propName, componentName, ...rest) {
    const exclusivePropCount = Object.keys(props)
      .filter(prop => props[prop] != null)
      .reduce(countProps, 0)
    if (exclusivePropCount > 1) {
      return new Error(`A ${componentName} cannot have more than one of these props: ${propList}`)
    }
    // Require at least one of exclusive props
    if (required && exclusivePropCount === 0) {
      return new Error(`A ${componentName} requires at least one of these props: ${propList}`)
    }
    return propType(props, propName, componentName, ...rest)
  }

  // validator.isRequired = function mutuallyExclusivePropsRequired (
  //   props,
  //   propName,
  //   componentName,
  //   ...rest
  // ) {
  //   const exclusivePropCount = Object.keys(props)
  //     .filter(prop => prop === propName || props[prop] != null)
  //     .reduce(countProps, 0)
  //   if (exclusivePropCount > 1) {
  //     return new Error(`A ${componentName} cannot have more than one of these props: ${propList}`)
  //   }
  //   return propType(props, propName, componentName, ...rest)
  // }

  return wrapValidator(validator, `mutuallyExclusiveProps:${propList}`, exclusiveProps)
}

export { mutuallyExclusiveProps }
