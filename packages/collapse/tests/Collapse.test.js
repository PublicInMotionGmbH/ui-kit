import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import createStub, { replaceRaf } from 'raf-stub'
import Collapse from '../src/Collapse'

jest.useFakeTimers()
replaceRaf([window, global])

afterAll(() => {
  global.requestAnimationFrame.reset()
  jest.useRealTimers()
})

describe('<Collapse />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Collapse>
        There is some content inside
      </Collapse>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should be hidden by default', () => {
    const wrapper = shallow(
      <Collapse>
        There is some content inside
      </Collapse>
    )

    expect(wrapper.hasClass('talixo-collapse--collapsed')).toBeTruthy()
  })

  it('should be hidden', () => {
    const wrapper = shallow(
      <Collapse collapsed>
        There is some content inside
      </Collapse>
    )

    expect(wrapper.hasClass('talixo-collapse--collapsed')).toBeTruthy()
  })

  it('should be visible', () => {
    const wrapper = shallow(
      <Collapse collapsed={false}>
        There is some content inside
      </Collapse>
    )

    expect(wrapper.hasClass('talixo-collapse--collapsed')).toBeFalsy()
  })

  it('should be smooth by default', () => {
    const wrapper = shallow(
      <Collapse>
        There is some content inside
      </Collapse>
    )

    expect(wrapper.hasClass('talixo-collapse--smooth')).toBeTruthy()
  })

  it('should be not smooth', () => {
    const wrapper = shallow(
      <Collapse smooth={false}>
        There is some content inside
      </Collapse>
    )

    expect(wrapper.hasClass('talixo-collapse--smooth')).toBeFalsy()
  })
})

describe('updateHeight', () => {
  let stub

  beforeEach(() => {
    stub = createStub()
    sinon.stub(global, 'requestAnimationFrame').callsFake(stub.add)
  })

  afterEach(() => {
    global.requestAnimationFrame.restore()
  })

  it('calls \'updateHeight\' when component mounts', () => {
    const spy = jest.spyOn(Collapse.prototype, 'updateHeight')
    const wrapper = mount(
      <Collapse>
        There is some content inside
      </Collapse>
    )

    expect(spy).toHaveBeenCalled()
    wrapper.unmount()
    spy.mockClear()
  })

  it('changes this.height to content.offsetHeight when collapsed', () => {
    const wrapper = mount(
      <Collapse>
        <div style={{ height: '100px' }}>
          There is some content inside
        </div>
      </Collapse>
    )
    // Mock content offsetHeight
    Object.defineProperty(wrapper.instance().content, 'offsetHeight', { value: 100 })

    expect(wrapper.instance().height).toEqual(0)
    stub.step()
    expect(wrapper.instance().height).toEqual(0)
    wrapper.unmount()
  })

  it('changes this.height to content.offsetHeight when not collapsed', () => {
    const wrapper = mount(
      <Collapse collapsed={false}>
        <div style={{ height: '100px' }}>
          There is some content inside
        </div>
      </Collapse>
    )
    const height = 100

    // Mock content offsetHeight
    Object.defineProperty(wrapper.instance().content, 'offsetHeight', { value: height })

    expect(wrapper.instance().height).toEqual(0)

    // Simulate height change
    wrapper.instance().updateHeight()

    expect(wrapper.instance().height).toEqual(100)

    wrapper.unmount()
  })
})

describe('transition', () => {
  let stub

  beforeEach(() => {
    stub = createStub()
    sinon.stub(global, 'requestAnimationFrame').callsFake(stub.add)
  })

  afterEach(() => {
    global.requestAnimationFrame.restore()
  })

  it('changes transition time correctly', () => {
    const wrapper = mount(
      <Collapse collapsed={false}>
        <div style={{ height: '100px' }}>
          There is some content inside
        </div>
      </Collapse>
    )
    const height = 100
    const animationSpeed = wrapper.props().animationSpeed
    const transitionTime = height * 1000 / animationSpeed

    // Mock content offsetHeight
    Object.defineProperty(wrapper.instance().content, 'offsetHeight', { value: height })
    // Simulate height change
    wrapper.instance().updateHeight()

    expect(wrapper.instance().node.style.transitionDuration).toEqual(`${transitionTime}ms`)
    wrapper.unmount()
  })

  it('changes transition time with different animationSpeed correctly', () => {
    const wrapper = mount(
      <Collapse collapsed={false} animationSpeed={500}>
        <div style={{ height: '100px' }}>
          There is some content inside
        </div>
      </Collapse>
    )
    const height = 100
    const animationSpeed = wrapper.props().animationSpeed
    const transitionTime = height * 1000 / animationSpeed

    // Mock content offsetHeight
    Object.defineProperty(wrapper.instance().content, 'offsetHeight', { value: height })
    // Simulate height change
    wrapper.instance().updateHeight()

    expect(wrapper.instance().node.style.transitionDuration).toEqual(`${transitionTime}ms`)
    wrapper.unmount()
  })

  it('should not change tansition time when props.smooth is set it false', () => {
    const wrapper = mount(
      <Collapse collapsed={false} smooth={false}>
        <div style={{ height: '100px' }}>
          There is some content inside
        </div>
      </Collapse>
    )

    const height = 100
    // Mock content offsetHeight
    Object.defineProperty(wrapper.instance().content, 'offsetHeight', { value: height })
    // Simulate height change
    wrapper.instance().updateHeight()

    expect(wrapper.instance().node.style.transitionDuration).toEqual(undefined)
    wrapper.unmount()
  })

  it('should not change tansition time when props.smooth is changed to false', () => {
    const wrapper = mount(
      <Collapse collapsed={false}>
        <div style={{ height: '100px' }}>
          There is some content inside
        </div>
      </Collapse>
    )

    const height = 100
    // Mock content offsetHeight
    Object.defineProperty(wrapper.instance().content, 'offsetHeight', { value: height })
    // Simulate height change
    wrapper.setProps({ smooth: false })

    expect(wrapper.instance().node.style.transitionDuration).toEqual('0ms')
    wrapper.unmount()
  })
})

describe('ref', () => {
  it('saves node ref correctly', () => {
    const wrapper = mount(
      <Collapse>
        There is some content inside
      </Collapse>
    )

    expect(wrapper.instance().node).toEqual(wrapper.getDOMNode())
    wrapper.unmount()
  })

  it('saves content ref correctly', () => {
    const wrapper = mount(
      <Collapse>
        There is some content inside
      </Collapse>
    )
    const content = wrapper.childAt(0).childAt(0).getDOMNode()

    expect(wrapper.instance().content).toEqual(content)
    wrapper.unmount()
  })
})
