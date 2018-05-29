// Test Data
export const data = [
  { name: 'Josh Smith I', value: 0, title: 'Title 1', subtitle: 'Subtitle 1' },
  { name: 'Josh Smith II', value: 11, title: 'Title 2', subtitle: 'Subtitle 2' },
  { name: 'Josh Smith III', value: 22, title: 'Title 3', subtitle: 'Subtitle 3' },
  { name: 'Josh Smith IV', value: 33, title: 'Title 4', subtitle: 'Subtitle 4' },
  { name: 'Josh Smith V', value: 44, title: 'Title 5', subtitle: 'Subtitle 5' }
]
export const dataItem = { name: 'Josh Smith I', value: 0, title: 'Title 1', subtitle: 'Subtitle 1' }

// Render functions
export function itemRender (item) {
  return (
    <span className='test-item'>{item.name}</span>
  )
}

export function detailsRender (item) {
  return (
    <div className='test-detail'>
      <div>Name: {item.name}</div>
      <div>Value: {item.value}</div>
      <div>Title: {item.title}</div>
      <div>Subtitle: {item.subtitle}</div>
    </div>
  )
}

export function ListHeader () {
  return (
    <div className='test-header'>
      Test Header
    </div>
  )
}
