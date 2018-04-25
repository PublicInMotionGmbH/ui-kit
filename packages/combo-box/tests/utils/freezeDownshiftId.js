/**
 * Downshift is automatically generating unique IDs,
 * but it makes snapshot tests impossible to be deterministic.
 * We need to set static ID instead.
 *
 * @param {React.Wrapper} wrapper
 */
function freezeDownshiftId (wrapper) {
  const downshift = wrapper.find('Downshift')
  const instance = downshift.instance()

  instance.id = 'downshift-0'
  instance.inputId = `${instance.id}-input`

  wrapper.update()
}

module.exports = freezeDownshiftId
