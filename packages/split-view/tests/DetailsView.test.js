import React from 'react'
import { shallow } from 'enzyme'
import { buildClassName } from '@talixo/shared'

import DetailsView from '../src/DetailsView'
import { moduleName } from '../src/config'
import { dataItem, renderDetails } from './fixtures/mocks'

const detailsCls = buildClassName([moduleName, 'details'])

const createProps = (props = {}) => ({
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<DetailsView {...props} />)

describe('<DetailsView>', () => {
  describe('when rendered', () => {
    const props = createProps({ openedItem: dataItem })
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper(props)
    })
    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render details', () => {
      expect(wrapper.find(`.${detailsCls}`).exists()).toBe(true)
    })
  })

  describe('when renderDetails is passed', () => {
    const props = createProps({ openedItem: dataItem, renderDetails })
    let wrapper
    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    it('should render children properly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render children iside provided wrapper', () => {
      expect(wrapper.find('.test-detail').exists()).toBe(true)
    })
  })

  describe('when no item is passed', () => {
    let wrapper
    beforeEach(() => {
      wrapper = createWrapper()
    })
    it('should not render anything', () => {
      expect(wrapper.find(`.${detailsCls}`).exists()).toBe(false)
    })
  })
})
