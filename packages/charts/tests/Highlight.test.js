import React from 'react'
import { XYPlot, LineSeries } from 'react-vis'
import Highlight from '../src/Highlight'
import { mount } from 'enzyme'

const lineData = [{ x: new Date('May 23 2017').getTime(), y: 5 }, { x: new Date('May 29 2017').getTime(), y: 2 }, { x: new Date('May 31 2017').getTime(), y: 2 }, { x: new Date('June 13 2017').getTime(), y: 2 }]

const createProps = (props = {}) => ({
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => mount(
  <XYPlot height={300} width={300}>
    <LineSeries data={lineData} />
    <Highlight {...props} />
  </XYPlot>
)

describe('<Highlight>', () => {
  let wrapper, props
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = createWrapper()
    })
    afterEach(() => {
      wrapper.unmount()
    })
    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mouse events', () => {
    let highlight, plot

    beforeEach(() => {
      props = { onBrushEnd: jest.fn(), onBrush: jest.fn(), onBrushStart: jest.fn() }
      wrapper = createWrapper(props)
      highlight = wrapper.find('Highlight')
      plot = wrapper.find('.rv-xy-plot__inner')
      plot.simulate('mousedown', { nativeEvent: { offsetX: 100 } })
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should update drawing state', () => {
      expect(highlight.instance().state.drawing).toBe(true)
    })
    it('should change drawArea in state', () => {
      expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 60, bottom: 250, left: 60 })
    })
    it('should call onBrushStart', () => {
      expect(props.onBrushStart).toHaveBeenCalledTimes(1)
    })

    describe('when mouse move', () => {
      beforeEach(() => {
        plot.simulate('mousemove', { nativeEvent: { offsetX: 200 } })
      })
      it('should not change drawing state', () => {
        expect(highlight.instance().state.drawing).toBe(true)
      })
      it('should change drawArea in state', () => {
        expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 160, bottom: 250, left: 60 })
      })
      it('should call onBrush', () => {
        expect(props.onBrush).toHaveBeenCalledTimes(1)
      })

      describe('when mouseup event is fired', () => {
        beforeEach(() => {
          highlight.simulate('mouseup')
        })
        it('should change state.drawing to false', () => {
          expect(highlight.instance().state.drawing).toBe(false)
        })
        it('should reset drawing area', () => {
          expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 0, bottom: 0, left: 0 })
        })
        it('should call onBrushStart', () => {
          expect(props.onBrushEnd).toHaveBeenCalledTimes(1)
        })
      })

      describe('when mouseleave event is fired', () => {
        beforeEach(() => {
          highlight.simulate('mouseleave')
        })
        it('should change state.drawing to false', () => {
          expect(highlight.instance().state.drawing).toBe(false)
        })
        it('should reset drawing area', () => {
          expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 0, bottom: 0, left: 0 })
        })
        it('should call onBrushStart', () => {
          expect(props.onBrushEnd).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('touch events', () => {
    let highlight, plot

    beforeEach(() => {
      props = { onBrushEnd: jest.fn(), onBrush: jest.fn(), onBrushStart: jest.fn() }
      wrapper = createWrapper(props)
      highlight = wrapper.find('Highlight')
      plot = wrapper.find('.rv-xy-plot__inner')
      plot.simulate('mousedown', { nativeEvent: { pageX: 200, type: 'touchstart' } })
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should update drawing state', () => {
      expect(highlight.instance().state.drawing).toBe(true)
    })
    it('should change drawArea in state', () => {
      expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 160, bottom: 250, left: 160 })
    })
    it('should call onBrushStart', () => {
      expect(props.onBrushStart).toHaveBeenCalledTimes(1)
    })

    describe('when mouse move left', () => {
      beforeEach(() => {
        plot.simulate('mousemove', { nativeEvent: { pageX: 100, type: 'touchmove' } })
      })
      it('should not change drawing state', () => {
        expect(highlight.instance().state.drawing).toBe(true)
      })
      it('should change drawArea in state', () => {
        expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 160, bottom: 250, left: 60 })
      })
      it('should call onBrush', () => {
        expect(props.onBrush).toHaveBeenCalledTimes(1)
      })
    })

    describe('when mouse move right', () => {
      beforeEach(() => {
        plot.simulate('mousemove', { nativeEvent: { pageX: 300, type: 'touchmove' } })
      })
      it('should not change drawing state', () => {
        expect(highlight.instance().state.drawing).toBe(true)
      })
      it('should change drawArea in state', () => {
        expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 250, bottom: 250, left: 160 })
      })
      it('should call onBrush', () => {
        expect(props.onBrush).toHaveBeenCalledTimes(1)
      })

      describe('when mouseup event is fired', () => {
        beforeEach(() => {
          highlight.simulate('touchend')
        })
        it('should change state.drawing to false', () => {
          expect(highlight.instance().state.drawing).toBe(false)
        })
        it('should reset drawing area', () => {
          expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 0, bottom: 0, left: 0 })
        })
        it('should call onBrushStart', () => {
          expect(props.onBrushEnd).toHaveBeenCalledTimes(1)
        })
      })

      describe('when mouseleave event is fired', () => {
        beforeEach(() => {
          highlight.simulate('touchcancel')
        })
        it('should change state.drawing to false', () => {
          expect(highlight.instance().state.drawing).toBe(false)
        })
        it('should reset drawing area', () => {
          expect(highlight.instance().state.drawArea).toEqual({ top: 0, right: 0, bottom: 0, left: 0 })
        })
        it('should call onBrushStart', () => {
          expect(props.onBrushEnd).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('when selected area is to small', () => {
    let highlight, plot
    beforeEach(() => {
      props = { onBrushEnd: jest.fn() }
      wrapper = createWrapper(props)
      highlight = wrapper.find('Highlight')
      plot = wrapper.find('.rv-xy-plot__inner')
      plot.simulate('mousedown', { nativeEvent: { offsetX: 100 } })
      expect(highlight.instance().state.drawing).toBe(true)
      highlight.simulate('mouseup')
      expect(highlight.instance().state.drawing).toBe(false)
    })
    afterEach(() => {
      wrapper.unmount()
    })
    it('should invoke onBrushEnd with null', () => {
      expect(props.onBrushEnd).toHaveBeenCalledWith(null)
    })
  })
  describe('when selected area is to small', () => {
    let highlight
    beforeEach(() => {
      props = { onBrushEnd: jest.fn() }
      wrapper = createWrapper(props)
      highlight = wrapper.find('Highlight')
      highlight.simulate('mouseup')
    })
    afterEach(() => {
      wrapper.unmount()
    })
    it('should invoke onBrushEnd with null', () => {
      expect(props.onBrushEnd).not.toHaveBeenCalled()
    })
  })
})
