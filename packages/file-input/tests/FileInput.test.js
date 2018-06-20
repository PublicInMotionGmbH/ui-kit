import React from 'react'
import { mount } from 'enzyme'

import FileInput from '../src/FileInput'

const createWrapper = (props = {}) => mount(<FileInput {...props} />)

describe('<FileInput />', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
      console.log(document.addEventListener)
    })

    it('renders children correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('document event listeners', () => {
    let wrapper
    const add = jest.fn()
    const remove = jest.fn()
    const _document = { ...global.document }

    beforeEach(() => {
      add.mockReset()
      remove.mockReset()
      global.document.addEventListener = add
      global.document.removeEventListener = remove
      wrapper = createWrapper()
    })

    afterEach(() => {
      global.document = { ..._document }
      console.log(global.document.addEventListener)
    })

    it('should add event listeners to document after mounting', () => {
      expect(add).toHaveBeenCalledTimes(2)
      expect(add).toHaveBeenCalledWith('drop', expect.anything())
      expect(add).toHaveBeenCalledWith('dragover', expect.anything())
    })

    it('should remove event listeners from document before unmounting', () => {
      wrapper.unmount()
      expect(remove).toHaveBeenCalledTimes(2)
      expect(remove).toHaveBeenCalledWith('drop', expect.anything())
      expect(remove).toHaveBeenCalledWith('dragover', expect.anything())
    })
  })
})
