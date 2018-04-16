/*
  'grayscale' theme (VictoryTheme.grayscale)
  The grayscale is the default theme.
  Try changing it. You could start with `colors` or `fontSize`.
*/

// Colors
export const colors = [
  '#330f00',
  '#661d00',
  '#992c00',
  '#cc3a00',
  '#FF4900',
  '#ff6d33',
  '#ff9266',
  '#ffb699',
  '#ffdbcc'
]
const charcoal = '#252525'
const talixoRed = '#FF4900'

/**
 * Returns next color in loop manner
 * @param {number} index
 * @returns {string}
 */
export function getColorByIndex (index) {
  const colorsLength = colors.length
  return index < colorsLength
    ? colors[index]
    : colors[colorsLength % index]
}

// Typography
const sansSerif =
  '"Gill Sans", "Gill Sans MT", "Ser­avek", "Trebuchet MS", sans-serif'
const letterSpacing = 'normal'
const fontSize = 14

// Layout
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors
}

// Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: 'transparent'
}
const centeredLabelStyles = { ...baseLabelStyles, textAnchor: 'middle' }

// Strokes
const strokeLinecap = 'round'
const strokeLinejoin = 'round'

// Put it all together...
export const talixoTheme = {
  area: {
    ...baseProps,
    style: {
      data: {
        fill: talixoRed
      },
      labels: centeredLabelStyles
    }
  },
  axis: {
    ...baseProps,
    style: {
      axis: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: { centeredLabelStyles,
        padding: 25
      },
      grid: {
        fill: 'none',
        stroke: 'none',
        pointerEvents: 'visible'
      },
      ticks: {
        fill: 'transparent',
        size: 1,
        stroke: 'transparent'
      },
      tickLabels: baseLabelStyles
    }
  },
  bar: {
    ...baseProps,
    style: {
      data: {
        fill: talixoRed,
        padding: 8,
        strokeWidth: 0
      },
      labels: baseLabelStyles
    }
  },
  candlestick: {
    ...baseProps,
    style: {
      data: {
        stroke: talixoRed,
        strokeWidth: 1
      },
      labels: centeredLabelStyles
    },
    candleColors: {
      positive: '#ffffff',
      negative: talixoRed
    }
  },
  chart: baseProps,
  errorbar: {
    ...baseProps,
    borderWidth: 8,
    style: {
      data: {
        fill: 'transparent',
        stroke: talixoRed,
        strokeWidth: 2
      },
      labels: centeredLabelStyles
    }
  },
  group:
    {
      ...baseProps,
      colorScale: colors
    },
  line: {
    ...baseProps,
    style: {
      data: {
        fill: 'transparent',
        stroke: talixoRed,
        strokeWidth: 2
      },
      labels: centeredLabelStyles
    }
  },
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: 'transparent',
        strokeWidth: 1
      },
      labels: { ...baseLabelStyles, padding: 20 }
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 50
  },
  scatter: {
    ...baseProps,
    style: {
      data: {
        fill: talixoRed,
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: centeredLabelStyles
    }
  },
  stack: {
    ...baseProps,
    colorScale: colors
  },
  tooltip: {
    style: {
      ...centeredLabelStyles,
      padding: 5,
      pointerEvents: 'none'
    },
    flyoutStyle: {
      stroke: charcoal,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none'
    },
    cornerRadius: 5,
    pointerLength: 10
  },
  voronoi: {
    ...baseProps,
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: {
        ...centeredLabelStyles,
        padding: 5,
        pointerEvents: 'none'
      },
      flyout: {
        stroke: charcoal,
        strokeWidth: 1,
        fill: '#f0f0f0',
        pointerEvents: 'none'
      }
    }
  },
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle'
      },
      labels: baseLabelStyles,
      title: { ...baseLabelStyles, padding: 5 }
    }
  }
}

export const common = {

}

export const pieConfig = {
  // categories:
  // colorScale
  innerRadius: 0,
  padAngle: 0
  // padding
}

export const barConfig = {

}

export const lineConfig = {

}

export const theme = {

}
