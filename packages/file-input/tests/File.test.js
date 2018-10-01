import React from 'react'
import { shallow } from 'enzyme'

import { buildClassName } from '@talixo/shared'

import File, { moduleName } from '../src/File'

const testFile = {
  name: 'Test',
  size: 123321
}

const removeCls = buildClassName([moduleName, 'remove'])

describe('<File />', () => {
  const onRemove = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<File file={testFile} onRemove={onRemove} />)
  })

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should invoke onremove function', () => {
    const remove = wrapper.find(`.${removeCls}`)
    remove.simulate('click', {})
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
