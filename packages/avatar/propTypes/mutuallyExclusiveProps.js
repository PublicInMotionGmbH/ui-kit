/**
 * Source: https://github.com/airbnb/prop-types/blob/master/src/mutuallyExclusiveProps.js
 *
 * Copyright (c) 2016 Airbnb
 *
 * This source code is licensed under the MIT license
 */

function wrapValidator (validator, typeName, typeChecker = null) {
  return Object.assign(validator.bind(), {
    typeName,
    typeChecker
  })
}

// Additional required field
function mutuallyExclusiveOfType (propType, required, ...exclusiveProps) {
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

  return wrapValidator(validator, `mutuallyExclusiveProps:${propList}`, exclusiveProps)
}

export { mutuallyExclusiveOfType }
