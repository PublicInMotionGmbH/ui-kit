import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'how-it-works'

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** An array of steps containing the explanation of how it works. */
  steps: PropTypes.shape({
    /** Description of a step. */
    description: PropTypes.string,

    /** Image element which will be displayed above step. */
    image: PropTypes.element,

    /** Title of a step. */
    title: PropTypes.string
  })
}

const defaultProps = {
  steps: []
}

/**
 * Component which represents HowItWorks.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function HowItWorks (props) {
  const { className, steps, ...passedProps } = props

  const wrapperCls = buildClassName(moduleName)
  const containerCls = buildClassName([moduleName, 'container'], className)
  const descriptionCls = buildClassName([moduleName, 'description'])
  const dividerCls = buildClassName([moduleName, 'divider'])
  const imageCls = buildClassName([moduleName, 'image'])
  const tileCls = buildClassName([moduleName, 'tile'])
  const titleCls = buildClassName([moduleName, 'title'])

  return (
    <div className={containerCls} {...passedProps}>
      <div className={wrapperCls}>
        {
          steps.map((step, index) => (
            <React.Fragment key={index}>
              <section>
                <div className={tileCls}>
                  <div className={imageCls}>
                    { step.image }
                  </div>
                  <div className={titleCls}>
                    <strong>{ step.title }</strong>
                  </div>
                  <div className={descriptionCls}>
                    { step.description }
                  </div>
                </div>
                <div className={dividerCls} />
              </section>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}

HowItWorks.displayName = 'HowItWorks'

HowItWorks.propTypes = propTypes
HowItWorks.defaultProps = defaultProps

export default HowItWorks
