const click = jest.fn()
const elemLvl3 = [
  {
    disabled: false,
    id: 30,
    label: 'Element 1 lvl 3',
    subtitle: 'Subtitile of element 1 lvl 3',
    onClick: click
  }
]

const elemLvl2 = [
  {
    disabled: false,
    id: 20,
    label: 'Element 1 lvl 2',
    panel: true,
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 1 lvl 2',
    onClick: click
  },
  {
    disabled: false,
    id: 21,
    label: 'Element 2 lvl 2',
    subtitle: 'Subtitile of element 2 lvl 2',
    onClick: click
  },
  {
    disabled: false,
    id: 22,
    label: 'Element 3 lvl 2',
    subtitle: 'Subtitile of element 3 lvl 2',
    onClick: click
  }
]

const elemLvl1 = [
  {
    disabled: false,
    id: 10,
    label: 'Element 1 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 1 lvl 1',
    onClick: click
  },
  {
    disabled: false,
    id: 11,
    label: 'Element 2 lvl 1',
    subtitle: 'Subtitile of element 2 lvl 1',
    onClick: click
  },
  {
    disabled: false,
    id: 12,
    label: 'Element 3 lvl 1',
    subtitle: 'Subtitile of element 3 lvl 1',
    onClick: click
  },
  {
    disabled: false,
    id: 13,
    label: 'Element 4 lvl 1',
    subtitle: 'Subtitile of element 4 lvl 1',
    onClick: click
  }
]

export const withSubelements = [
  {
    disabled: false,
    id: 0,
    label: 'Element 1',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 1',
    onClick: click
  },
  {
    disabled: false,
    id: 1,
    label: 'Element 2',
    subtitle: 'Subtitile of element 2',
    onClick: click
  },
  {
    disabled: false,
    id: 2,
    label: 'Element 3',
    subtitle: 'Subtitile of element 3',
    onClick: click
  },
  {
    disabled: true,
    id: 3,
    label: 'Element 4',
    subtitle: 'Subtitile of element 4',
    panel: true,
    onClick: click
  }
]

export const withoutSubelements = [
  {
    id: 0,
    label: 'Element 1',
    subtitle: 'Subtitile of element 1',
    onClick: click
  },
  {
    id: 1,
    label: 'Element 2',
    subtitle: 'Subtitile of element 2',
    onClick: click
  },
  {
    id: 2,
    label: 'Element 3',
    subtitle: 'Subtitile of element 3',
    onClick: click
  },
  {
    id: 3,
    label: 'Element 4',
    subtitle: 'Subtitile of element 3',
    onClick: click
  }
]
