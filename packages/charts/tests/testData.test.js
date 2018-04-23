export const pieTestData = {
  className: 'className',
  title: 'Pie Data',
  dataItems: [
    { label: 'Cats', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds', value: 55, color: ' ', className: '', disabled: true },
    { label: 'Cats1', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs1', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds1', value: 55, color: ' ', className: '', disabled: false },
    { label: 'Cats2', value: 35, color: ' ', className: '', disabled: false },
    { label: 'Dogs2', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds2', value: 55, color: ' ', className: '', disabled: false },
    { label: 'Lions2', value: 35, color: ' ', className: '', disabled: true }
  ]
}

export const pieTestDataWithDisabledItems = {
  className: 'className',
  title: 'Pie Data',
  dataItems: [
    { label: 'Cats', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds', value: 55, color: ' ', className: '', disabled: true },
    { label: 'Cats1', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs1', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds1', value: 55, color: ' ', className: '', disabled: false },
    { label: 'Cats2', value: 35, color: ' ', className: '', disabled: false },
    { label: 'Dogs2', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds2', value: 55, color: ' ', className: '', disabled: false },
    { label: 'Lions2', value: 35, color: ' ', className: '', disabled: true }
  ]
}

export const lineTestData = [{
  className: 'className',
  color: null,
  title: 'Line 1',
  id: 0,
  disabled: false,
  dataItems: [{ x: new Date('May 23 2017').getTime(), y: 5 }, { x: new Date('May 29 2017').getTime(), y: 2 }, { x: new Date('May 31 2017').getTime(), y: 2 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
}]

export const lineTestDataWithDisabledItems = [{
  className: 'className',
  color: null,
  title: 'Line 1',
  id: 0,
  disabled: true,
  dataItems: [{ x: new Date('May 23 2017').getTime(), y: 5 }, { x: new Date('May 29 2017').getTime(), y: 2 }, { x: new Date('May 31 2017').getTime(), y: 2 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
}]
