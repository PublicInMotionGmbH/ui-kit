import React from 'react'
import { mount } from 'enzyme'

import { buildClassName } from '@talixo/shared'

import ImageInput, { moduleName } from '../src/ImageInput'
import { events } from '../src/helpers'

// Helpers
const url1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJUlEQVR42n2SS08TURiGT0zkN/gfXFSCsRcQOkM7F6ZTZqptakfpjIMWTCBuXJioP4FwcWFcIrEhceUCEhIuP8ALiWBwgQoICCJGujEh4eN7RydphHKSN/nO+z3vucwZcSmuTkZiiizqxrZ5+zxLZvVCqOHVM8ggK5oT2pacdajlqlG91mrYS+nSq0U5/+e9nKd6wUMPDFhkkBXNrfpSPJUjveBTm5qnZx0WAqcKPTBgkUEWJ3gomQ4pOZcks0STSbvhAuiBAYsMsrhLUyHZXYt32nSv3QR4psCARQZZ8VUvR99KeZqTrtM7QGcrYOaDukDIis96z+he9x06sPuIvzR9TN1oGF5RSrSb7aVarp/2rbv0Re8ZEd8M7zWMlYxHG9bf5nfTp0+KE+yyyEK98y8IBixqZMV2xp/BZCpdpMeDGr2purTW7wOoFzz0wIANPGQF7zaByZ5VIa0jStPPi+TYbfS0PRuGUcNDDwxY+Hwq/wVfwb0fgrt8rxmFv4FRPnECeOiBCb1NwxsUa13lC3y/GoxlvtsY77Zv951Y4KddoRF+wg+GG8x/cAZZgcFfc/g3hw648SihUvTiZXqS0GhcykGBd4W9B7E0GLwYnnBIhGM5VTy33lWeRwOrL2gODUQ7SYvESY3EgnpWLaEXLLBhuHPIhPnwFE28yMQvq3IE8DShx+FxsKLRWNVuJTczXpVfZ51/mkNoh+utjPdyVbuZ/J8/BmrHDJ7OS2ZbAAAAAElFTkSuQmCC\n'
const url2 = 'data:image/png;base64,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\n'
const img1 = new window.Blob([url1], { type: 'image/png' })
const img2 = new window.Blob([url2], { type: 'image/png' })
const buffer = new ArrayBuffer(8)
const file = new window.File(['test2'], 'test2.txt', { type: 'text/plain' })

// Mocks
const fakeUrl = 'blob:https://localhost/5fa26891-ae04-4937-a062-26ecf7337321'
const createObjectUrl = jest.fn(() => fakeUrl)
const revokeObjectUrl = jest.fn()

const buttonCls = `.${buildClassName([moduleName, 'button'])}`
const inputCls = `.${buildClassName([moduleName, 'input'])}`
const removeIconCls = `.${buildClassName([moduleName, 'remove'])}`

const createWrapper = (props = {}) => mount(<ImageInput {...props} />)

describe('<ImageInput />', () => {
  // Storing URL functions
  const _createObjectUrl = window.URL.createObjectURL
  const _revokeObjectUrl = window.URL.revokeObjectURL

  beforeAll(() => {
    // Faking URL functions
    window.URL.createObjectURL = createObjectUrl
    window.URL.revokeObjectURL = revokeObjectUrl
  })

  afterAll(() => {
    // Restorin URL functions
    window.URL.createObjectURL = _createObjectUrl
    window.URL.revokeObjectURL = _revokeObjectUrl
  })

  describe('rendering', () => {
    it('renders children correctly', () => {
      const wrapper = createWrapper()
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  // Uploading using button
  describe('button uploading', () => {
    const props = { onChange: jest.fn(), onRemove: jest.fn() }
    let wrapper
    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should set defualt type, state.url, state.value properly', () => {
      expect(wrapper.state().url).toBe(null)
      expect(wrapper.state().value).toBe(null)
      expect(wrapper.props().type).toBe('url')
    })

    it('should open dialog when clicking on button', () => {
      const button = wrapper.find(buttonCls).at(1)
      const click = jest.fn()
      wrapper.instance().input.click = click
      button.simulate('click')

      expect(click).toHaveBeenCalledTimes(1)
    })

    it('should not upload when no file is dropped inside wrapper', () => {
      const input = wrapper.find(inputCls)
      input.simulate('change', { target: { files: [] } })

      expect(wrapper.state().value).toBe(null)
    })

    it('should update state when image as url is passed', () => {
      const input = wrapper.find(inputCls)
      input.simulate('change', { target: { files: [img1] } })

      expect(wrapper.state().url).toBe(fakeUrl)
      expect(wrapper.state().value).toBe(img1)
    })

    it('should update state when image as ArrayBuffer is passed', () => {
      wrapper.setProps({ type: 'binary' })
      const input = wrapper.find(inputCls)
      input.simulate('change', { target: { files: [img1] } })

      expect(wrapper.state().url).toBe(fakeUrl)
      expect(wrapper.state().value).toBe(img1)
    })

    it('should update state when image as File is passed', () => {
      wrapper.setProps({ type: 'file' })
      props.onChange.mockReset()
      const input = wrapper.find(inputCls)
      input.simulate('change', { target: { files: [img1] } })

      expect(wrapper.state().url).toBe(fakeUrl)
      expect(wrapper.state().value).toBe(img1)
      expect(props.onChange).toHaveBeenCalledTimes(1)
      expect(props.onChange).toHaveBeenCalledWith(img1)
    })

    it('should not update state when file is not image', () => {
      const input = wrapper.find(inputCls)
      input.simulate('change', { target: { files: [file] } })

      expect(wrapper.state().url).toBe(null)
      expect(wrapper.state().value).toBe(null)
    })

    it('should revoke object URL when new file is passed', () => {
      revokeObjectUrl.mockReset()
      const input = wrapper.find(inputCls)
      input.simulate('change', { target: { files: [img1] } })
      input.simulate('change', { target: { files: [img2] } })

      expect(revokeObjectUrl).toHaveBeenCalledTimes(1)
    })

    it('should clear state.value and state.url after clicking remove icon', () => {
      props.onRemove.mockReset()
      const input = wrapper.find(inputCls)
      input.simulate('change', { target: { files: [img1] } })

      const removeIcon = wrapper.find(removeIconCls).at(0)
      removeIcon.simulate('click')
      expect(wrapper.state().value).toBe(null)
      expect(wrapper.state().url).toBe(null)
    })
  })

  // Drag & drop behaviour
  describe('uploading using drag&drop', () => {
    let wrapper
    beforeEach(() => {
      wrapper = createWrapper()
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should upload files when dropped inside wrapper', () => {
      const input = wrapper.find(inputCls)
      input.simulate('drop', { dataTransfer: { files: [img1] } })

      expect(wrapper.state().url).toBe(fakeUrl)
      expect(wrapper.state().value).toBe(img1)
    })

    it('should not upload when no file is dropped inside wrapper', () => {
      const input = wrapper.find(inputCls)
      input.simulate('drop', { dataTransfer: { files: [] } })

      expect(wrapper.state().value).toBe(null)
    })
  })

  // Props handling
  describe('Props handling', () => {
    const props = {
      value: url1
    }
    let wrapper
    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should set state.value and state.url properly', () => {
      expect(wrapper.state().value).toBe(url1)
      expect(wrapper.state().url).toBe(url1)
    })

    it('should update state when props.value has changed', () => {
      wrapper.setProps({ value: url2 })

      expect(wrapper.state().value).toBe(url2)
      expect(wrapper.state().url).toBe(url2)
    })

    it('should handle file', () => {
      wrapper.setProps({ type: 'binary', value: buffer })

      expect(wrapper.state().value).toBe(buffer)
      expect(wrapper.state().url).toBe(fakeUrl)
    })

    it('should handle binary data', () => {
      wrapper.setProps({ type: 'file', value: img1 })

      expect(wrapper.state().value).toBe(img1)
      expect(wrapper.state().url).toBe(fakeUrl)
    })

    it('should handle invalid type', () => {
      wrapper.setProps({ type: 'invalidtype', value: img1 })

      expect(wrapper.state().value).toBe(img1)
      expect(wrapper.state().url).toBe(null)
    })

    it('should clear state.value and state.url after clicking remove icon', () => {
      const input = wrapper.find(inputCls)
      input.simulate('change', { target: { files: [img1] } })

      const removeIcon = wrapper.find(removeIconCls).at(0)
      removeIcon.simulate('click')
      expect(wrapper.state().value).toBe(props.value)
      expect(wrapper.state().url).toBe(props.value)
    })
  })

  // Event listeners
  describe('document event listeners', () => {
    let wrapper, add, remove
    const prevAdd = global.document.addEventListener
    const prevRemove = global.document.removeEventListener

    beforeEach(() => {
      add = jest.fn(global.document.addEventListener)
      remove = jest.fn(global.document.removeEventListener)
      global.document.addEventListener = add
      global.document.removeEventListener = remove
      wrapper = createWrapper()
    })

    afterEach(() => {
      global.document.addEventListener = prevAdd
      global.document.removeEventListener = prevRemove
      wrapper.unmount()
    })

    it('should add event listeners to document after mounting', () => {
      expect(add).toHaveBeenCalledWith('drop', expect.anything())
      expect(add).toHaveBeenCalledWith('dragover', expect.anything())
    })

    it('should remove event listeners from document before unmounting', () => {
      wrapper.unmount()

      expect(remove).toHaveBeenCalledWith('drop', expect.anything())
      expect(remove).toHaveBeenCalledWith('dragover', expect.anything())
    })

    it('should call event', () => {
      const event = new window.Event('drop')
      event.preventDefault = jest.fn()
      global.document.dispatchEvent(event)

      expect(event.preventDefault).toHaveBeenCalled()
    })
  })

  // Dragging events
  describe('dragging events handling', () => {
    const props = {}
    for (let event in events) {
      props[events[event]] = jest.fn()
    }
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should set state.draggingOver to true on dragEnter', () => {
      props[events.enter].mockReset()
      wrapper.simulate('dragEnter')

      expect(wrapper.state().draggingOver).toBe(true)
      expect(props[events.enter]).toHaveBeenCalledTimes(1)
    })

    it('should not change state.draggingOver on dragStart', () => {
      props[events.start].mockReset()
      wrapper.simulate('dragStart')

      expect(wrapper.state().draggingOver).toBe(false)
      expect(props[events.start]).toHaveBeenCalledTimes(1)
    })

    it('should set state.draggingOver to false on dragLeave', () => {
      props[events.enter].mockReset()
      props[events.leave].mockReset()

      wrapper.simulate('dragEnter')
      expect(wrapper.state().draggingOver).toBe(true)
      expect(props[events.enter]).toHaveBeenCalledTimes(1)

      wrapper.simulate('dragLeave')
      expect(wrapper.state().draggingOver).toBe(false)
      expect(props[events.enter]).toHaveBeenCalledTimes(1)
    })

    it('should set state.draggingOver to false on dragEnd', () => {
      props[events.enter].mockReset()
      props[events.end].mockReset()
      wrapper.simulate('dragEnter')
      expect(wrapper.state().draggingOver).toBe(true)
      expect(props[events.enter]).toHaveBeenCalledTimes(1)

      wrapper.simulate('dragEnd')
      expect(wrapper.state().draggingOver).toBe(false)
      expect(props[events.enter]).toHaveBeenCalledTimes(1)
    })
  })
})
