import React from 'react'
import { shallow, mount } from 'enzyme'

import Collapse from '../src/Collapse'

jest.useFakeTimers()

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0)
}

// Mock cancelAnimationFrame
global.cancelAnimationFrame = id => {
  return global.clearTimeout(id)
}

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
  it('updates height when component mounts', () => {
    const wrapper = mount(
      <Collapse>
        There is some content inside
      </Collapse>
    )

    const instance = wrapper.instance()

    expect(instance.height).toBe(0)
    wrapper.unmount()
  })

  it('calls updateHeight when component updates', () => {
    const wrapper = mount(
      <Collapse collapsed={false}>
        <div style={{ height: '100px' }}>
          There is some content inside
        </div>
      </Collapse>
    )
    const spy = jest.spyOn(wrapper.instance(), 'updateHeight')
    wrapper.setProps({ collapsed: true })
    expect(spy).toHaveBeenCalledTimes(1)
    // expect(wrapper.instance().content.offsetHeight).toEqual(0)
    // expect(wrapper.instance().content.transitionDuration).toEqual(100)
    wrapper.unmount()
  })
})
// it('should get element height correctly', () => {
//   const wrapper = mount(
//     <Collapse collapsed>
//       There is some content inside
//     </Collapse>
//   )
//
//   // TODO: check this
//
//   expect(wrapper.instance().height).toBe(wrapper.find('.talixo-collapse__content').getDOMNode().offsetHeight)
//
//   wrapper.unmount()
// })
//
// it('should return no height when it\'s not mounted', () => {
//   const wrapper = mount(
//     <Collapse collapsed>
//       There is some content inside
//     </Collapse>
//   )
//
//   const instance = wrapper.instance()
//
//   wrapper.unmount()
//
//   expect(instance.height).toBe(null)
// })
//
// it('should not set max-height after first initialization', () => {
//   const wrapper = mount(
//     <Collapse collapsed>
//       There is some content inside
//     </Collapse>
//   )
//
//   const instance = wrapper.instance()
//
//   expect(instance.height).toBe(null)
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('')
//
//   wrapper.unmount()
// })
//
// it('should start transition with height', () => {
//   const wrapper = mount(
//     <Collapse collapsed>
//       There is some content inside
//     </Collapse>
//   )
//
//   const instance = wrapper.instance()
//
//   // Check after starting transition
//
//   wrapper.setProps({ collapsed: false })
//
//   const height = wrapper.find('.talixo-collapse__content').getDOMNode().offsetHeight
//
//   expect(instance.height).toBe(height)
//   expect(wrapper.getDOMNode().style.height).toBe('' + height)
//
//   wrapper.unmount()
// })
//
// it('should not start transition when it is not smooth', () => {
//   const wrapper = mount(
//     <Collapse collapsed smooth={false}>
//       There is some content inside
//     </Collapse>
//   )
//
//   const instance = wrapper.instance()
//
//   // Check after starting transition
//
//   wrapper.setProps({ collapsed: false })
//
//   expect(instance.height).toBe(null)
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('')
//
//   wrapper.unmount()
// })
//
// it('should finish transition with height', () => {
//   const wrapper = mount(
//     <Collapse collapsed>
//       There is some content inside
//     </Collapse>
//   )
//
//   const instance = wrapper.instance()
//
//   // Check after starting transition
//
//   wrapper.setProps({ collapsed: false })
//
//   const height = wrapper.find('.talixo-collapse__content').getDOMNode().offsetHeight
//
//   expect(instance.height).toBe(height)
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('' + height)
//
//   // Check after finishing transition
//
//   instance.finishTransition({ target: instance.node })
//
//   expect(instance.height).toBe(null)
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('')
//
//   wrapper.unmount()
// })
//
// it('should finish transition overriding maxHeight style', () => {
//   const wrapper = mount(
//     <Collapse collapsed style={{ maxHeight: 10, background: 'red' }}>
//       There is some content inside
//     </Collapse>
//   )
//
//   const instance = wrapper.instance()
//
//   // Check after starting transition
//
//   wrapper.setProps({ collapsed: false })
//
//   const height = wrapper.find('.talixo-collapse__content').getDOMNode().offsetHeight
//
//   expect(instance.height).toBe(height)
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('' + height)
//   expect(wrapper.getDOMNode().style.background).toBe('red')
//
//   // Check after finishing transition
//
//   instance.finishTransition({ target: instance.node })
//   instance.forceUpdate()
//
//   expect(instance.height).toBe(null)
//
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('10px')
//   expect(wrapper.getDOMNode().style.background).toBe('red')
//
//   wrapper.unmount()
// })
//
// it('should finish transition not overriding styles', () => {
//   const wrapper = mount(
//     <Collapse collapsed style={{ background: 'red' }}>
//       There is some content inside
//     </Collapse>
//   )
//
//   const instance = wrapper.instance()
//
//   // Check after starting transition
//
//   wrapper.setProps({ collapsed: false })
//
//   const height = wrapper.find('.talixo-collapse__content').getDOMNode().offsetHeight
//
//   expect(instance.height).toBe(height)
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('' + height)
//   expect(wrapper.getDOMNode().style.background).toBe('red')
//
//   // Check after finishing transition
//
//   instance.finishTransition({ target: instance.node })
//
//   expect(instance.height).toBe(null)
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('')
//   expect(wrapper.getDOMNode().style.background).toBe('red')
//
//   wrapper.unmount()
// })
//
// it('should not finish transition of different element', () => {
//   const wrapper = mount(
//     <Collapse collapsed>
//       There is some content inside
//     </Collapse>
//   )
//
//   const instance = wrapper.instance()
//
//   // Check after starting transition
//
//   wrapper.setProps({ collapsed: false })
//
//   const height = wrapper.find('.talixo-collapse__content').getDOMNode().offsetHeight
//
//   // Check after try to finishing transition
//
//   instance.finishTransition({ target: wrapper.find('.talixo-collapse__content').getDOMNode() })
//
//   expect(instance.height).toBe(height)
//   expect(wrapper.getDOMNode().style.maxHeight).toBe('' + height)
//
//   wrapper.unmount()
// })
//
// it('should allow changing transition animation speed', () => {
//   const wrapper = mount(
//     <Collapse collapsed animationSpeed={1000}>
//       There is some content inside
//     </Collapse>
//   )
//
//   expect(wrapper.getDOMNode().style.transitionDuration).toBe('1000ms')
//   expect(wrapper.getDOMNode().style.animationDuration).toBe('1000ms')
//
//   wrapper.unmount()
// })
// })
