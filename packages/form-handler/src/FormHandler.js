import React from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik'

import { FormField } from '@talixo/form-field'

/**
 * Checks if node is a FormField component
 *
 * @param node
 * @returns {boolean}
 */
export function isFormField (node) {
  if (!node || typeof node !== 'object' || typeof node.type !== 'function') {
    return false
  }

  if (node.type === FormField) {
    return true
  }

  const Component = node.type
  // This is required to work properly ith react-hot-loader
  const CallComponent = Component.__reactstandin__getCurrent
    ? Component.__reactstandin__getCurrent()
    : Component

  return CallComponent === FormField
}

const propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
  validationSchema: PropTypes.object,
  initialValues: PropTypes.object
}

const defaultProps = {
  errors: {}
}

/**
 * Component which represents Form Handler
 *
 * @class
 */
class FormHandler extends React.PureComponent {
  /**
   * Update errors and values if changed from props
   *
   * @param props
   */
  componentWillReceiveProps (props) {
    if (!this.formik) {
      return
    }

    // Check if any new errors are provided
    if (props.errors !== this.props.errors) {
      this.formik.getFormikBag().setErrors(props.errors)
    }

    // Check if any new value is provided
    if (props.values !== this.props.values && props.values != null) {
      const previous = this.props.values || {}
      const bag = this.formik.getFormikBag()

      for (const key in props.values) {
        // User has changed value manually, so do not fill it.
        if (previous[key] !== bag.values[key]) {
          continue
        }

        // Initial value is not changed or next value is empty
        if (props.values[key] === previous[key] || props.values[key] === undefined) {
          continue
        }

        // Update value
        bag.setFieldValue(key, props.values[key])
      }
    }
  }

  /**
   * Transform nodes so they can be recognized by Formik
   *
   * @param {*} node
   * @param {object} props
   * @param {function} props.setFieldValue
   * @param {function} props.handleBlur
   * @param {array} props.values
   * @param {array} props.touched
   * @param {array} props.errors
   *
   * @returns {*}
   */
  transformNode = (node, props) => {
    const { setFieldValue, handleBlur, values, touched, errors } = props

    // Return if node is empty or type of string
    if (!node || typeof node !== 'object') {
      return node
    }

    // Check if node is FormField component
    if (isFormField(node)) {
      const name = node.props.name

      // Omit adding node to Formik if it has no name property
      // but add it to children
      if (name == null) {
        return node
      }

      // Modify props of FormField
      return React.cloneElement(node, {
        ref: node.ref,
        value: values[name],
        error: touched[name] ? errors[name] : null,
        onChange: value => setFieldValue(name, value),
        onBlur: () => handleBlur({ persist: () => {}, target: { name: name } })
      })
    }

    // If node is not a FormField component and has no children return node
    if (!node.props.children) {
      return node
    }

    // Check recursively if any child of given node is a FormField component
    if (node.props.children) {
      let isModified = false

      const children = React.Children.map(node.props.children, node => {
        const nextNode = this.transformNode(node, props)

        if (nextNode !== node) {
          isModified = true
        }

        return nextNode
      })

      // if node was modified inside map return this node with modification
      if (isModified) {
        return React.cloneElement(node, {
          ...node.props,
          ref: node.ref
        }, children)
      }
    }

    return node
  }

  /**
   * Create form elements from children
   *
   * @param {object} props
   * @returns {React.Element}
   */
  renderForm = props => {
    const { handleSubmit } = props
    const { children, onSubmit, initialValues, values, validationSchema, ...passedProps } = this.props
    const elements = React.Children.map(children, node => this.transformNode(node, props))

    return (
      <form method='POST' onSubmit={handleSubmit} {...passedProps}>
        {elements}
      </form>
    )
  }

  /**
   * Handle form submitting
   *
   * @param args
   */
  submit = (...args) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(...args)
    }
  }

  /**
   * Save reference to formik
   *
   * @param ref
   */
  saveRef = (ref) => {
    this.formik = ref
  }

  render () {
    const { children, onSubmit, values, ...passedProps } = this.props

    return (
      <Formik
        {...passedProps}
        initialValues={values}
        ref={this.saveRef}
        render={this.renderForm}
        onSubmit={this.submit}
      />
    )
  }
}

FormHandler.propTypes = propTypes
FormHandler.defaultProps = defaultProps

export default FormHandler
