import React from 'react'
import { mount } from 'enzyme'

import { buildClassName } from '@talixo/shared'

import FileInput, { moduleName, registerElements } from '../src/FileInput'

// Helpers

const file1 = new File(['test'], 'test.txt', { type: 'text/plain' }) // eslint-disable-line
const file2 = new File(['test2'], 'test2.txt', { type: 'text/plain' }) // eslint-disable-line

const buttonCls = `.${buildClassName([moduleName, 'button'])}`
const coverCls = `.${buildClassName([moduleName, 'cover'])}`

const filesRender = ({ file }) => (
  <div className='test-wrapper'>
    <span className='test-name'>{file.name}</span>
    <span className='test-size'>{file.size}</span>
  </div>
)

const createWrapper = (props = {}) => mount(<FileInput {...props} />)

// Tests
describe('<FileInput />', () => {
  // Rendering
  describe('rendering', () => {
    let wrapper

    it('renders correctly', () => {
      wrapper = createWrapper()
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })

    it('renders children correctly', () => {
      wrapper = createWrapper({ children: <div>Test div</div> })
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  // File dropping / input changes
  describe('file uploading', () => {
    const change = jest.fn()
    let wrapper, input, button

    beforeEach(() => {
      wrapper = createWrapper({ onChange: change })
      input = wrapper.find('input')
      button = wrapper.find(buttonCls)
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should open input[type="file"] dialog when button is clicked', () => {
      const mockClick = jest.fn()
      wrapper.instance().input.click = mockClick
      button.find('button').simulate('click', {})
      expect(mockClick).toHaveBeenCalledTimes(1)
    })

    it('should add files to state when input has changed', () => {
      input.simulate('change', { target: { files: [file1] } })
      expect(wrapper.state().files).toEqual([file1])
    })

    it('should add files onDrop', () => {
      wrapper.simulate('drop', { dataTransfer: { files: [file1] } })
      expect(wrapper.state().files).toEqual([file1])
    })

    it('should invoke props.onChange if provided', () => {
      change.mockReset()
      wrapper.simulate('drop', { dataTransfer: { files: [file1] } })
      expect(change).toHaveBeenCalledTimes(1)
      expect(change).toHaveBeenCalledWith([file1], expect.anything())
    })

    it('should change dragging over to false when no file is dropped', () => {
      wrapper.simulate('dragEnter')
      expect(wrapper.state().draggingOver).toBe(true)
      wrapper.simulate('drop', {})
      expect(wrapper.state().files).toEqual([])
    })

    it('should remove files when clicking on remove button', () => {
      wrapper.simulate('drop', { dataTransfer: { files: [file1] } })
      const remove = wrapper.find(`.${buildClassName(['file', 'remove'])}`)
      remove.first().simulate('click')
      expect(wrapper.state().files).toEqual([])
    })
  })

  // Dragging events
  describe('dragging events handling', () => {
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should set state.draggingOver to true on dragEnter', () => {
      wrapper.simulate('dragEnter')
      expect(wrapper.state().draggingOver).toBe(true)
    })

    it('should not change state.draggingOver on dragStart', () => {
      wrapper.simulate('dragStart')
      expect(wrapper.state().draggingOver).toBe(false)
    })

    it('should set state.draggingOver to false on dragLeave', () => {
      wrapper.simulate('dragEnter')
      const cover = wrapper.find(coverCls)
      expect(wrapper.state().draggingOver).toBe(true)
      cover.simulate('dragLeave')
      expect(wrapper.state().draggingOver).toBe(false)
    })

    it('should set state.draggingOver to false on dragEnd', () => {
      wrapper.simulate('dragEnter')
      const cover = wrapper.find(coverCls)
      expect(wrapper.state().draggingOver).toBe(true)
      cover.simulate('dragEnd')
      expect(wrapper.state().draggingOver).toBe(false)
    })
  })

  // Document event listeners
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

  // Props
  describe('props handling', () => {
    let wrapper

    describe('labels handling', () => {
      const props = {
        buttonLabel: 'Test-button',
        uploadLabel: 'Test-label'
      }

      beforeEach(() => {
        wrapper = createWrapper(props)
      })

      afterEach(() => {
        wrapper.unmount()
      })

      it('should add label to button', () => {
        const button = wrapper.find('Button')
        expect(button.text()).toBe(props.buttonLabel)
      })

      it('should add upload label', () => {
        const button = wrapper.find(buttonCls)
        expect(button.text()).toContain(props.uploadLabel)
      })
    })

    describe('file handling', () => {
      const props = {
        files: [file1]
      }

      beforeEach(() => {
        wrapper = createWrapper(props)
      })

      afterEach(() => {
        wrapper.unmount()
      })

      it('should pass files to state when mounted', () => {
        expect(wrapper.state().files).toEqual([file1])
      })

      it('should create map when files are passed via props', () => {
        const newMap = registerElements([file1])
        expect(wrapper.state().idStorage).toEqual(newMap)
      })

      it('should add file to state.files', () => {
        wrapper.setProps({ files: [file1, file2] })
        expect(wrapper.state().files).toEqual([file1, file2])
      })

      it('should create new idStorage when new files are passed', () => {
        wrapper.setProps({ files: [file1, file2] })
        const newMap = registerElements([file1, file2])
        expect(wrapper.state().idStorage).toEqual(newMap)
      })
    })

    describe('events handling', () => {
      const props = {
        files: [file1],
        onDragEnter: jest.fn()
      }
      beforeEach(() => {
        wrapper = createWrapper(props)
      })

      afterEach(() => {
        wrapper.unmount()
      })

      it('should invoke onDragEnter passed from props', () => {
        wrapper.simulate('dragEnter', {})
        expect(props.onDragEnter).toHaveBeenCalledTimes(1)
        expect(props.onDragEnter).toHaveBeenCalledWith(null, expect.anything())
      })
    })

    describe('multiple disabled', () => {
      let input

      const props = {
        multiple: false
      }

      beforeEach(() => {
        wrapper = createWrapper(props)
        input = wrapper.find('input')
      })

      afterEach(() => {
        wrapper.unmount()
      })

      it('should allow to drop one file', () => {
        input.simulate('change', { target: { files: [file1] } })
        expect(wrapper.state().files).toEqual([file1])
      })

      it('should not allow to drop more than one file', () => {
        input.simulate('change', { target: { files: [file1, file2] } })
        expect(wrapper.state().files).toEqual([])
      })

      it('should allow to pass one file', () => {
        wrapper.simulate('drop', { dataTransfer: { files: [file1] } })
        expect(wrapper.state().files).toEqual([file1])
      })

      it('should not allow to pass more than one file', () => {
        wrapper.simulate('drop', { dataTransfer: { files: [file1, file2] } })
        expect(wrapper.state().files).toEqual([])
      })
    })

    describe('drop disabled', () => {
      let input
      const props = {
        dropDisabled: true
      }

      beforeEach(() => {
        wrapper = createWrapper(props)
        input = wrapper.find('input')
      })

      afterEach(() => {
        wrapper.unmount()
      })

      it('should allow to drop one file', () => {
        input.simulate('change', { target: { files: [file1] } })
        expect(wrapper.state().files).toEqual([file1])
      })

      it('should not allow to drop more than one file', () => {
        input.simulate('change', { target: { files: [file1, file2] } })
        expect(wrapper.state().files).toEqual([file1, file2])
      })

      it('should not allow to pass one file', () => {
        wrapper.simulate('drop', { dataTransfer: { files: [file1] } })
        expect(wrapper.state().files).toEqual([])
      })

      it('should not allow to pass more than one file', () => {
        wrapper.simulate('drop', { dataTransfer: { files: [file1, file2] } })
        expect(wrapper.state().files).toEqual([])
      })
    })

    describe('filesRender', () => {
      const props = {
        files: [file1],
        filesRender
      }

      beforeEach(() => {
        wrapper = createWrapper(props)
      })

      afterEach(() => {
        wrapper.unmount()
      })

      it('should render .test-wrapper', () => {
        expect(wrapper.find('.test-wrapper').exists()).toBe(true)
      })

      it('should render file name', () => {
        const name = wrapper.find('.test-name')
        expect(name.exists()).toBe(true)
        expect(name.text()).toBe(file1.name)
      })

      it('should render file size', () => {
        const size = wrapper.find('.test-size')
        expect(size.exists()).toBe(true)
        expect(size.text()).toBe(`${file1.size}`)
      })
    })
  })
})
