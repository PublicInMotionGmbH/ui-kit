/**
* Returns the largest multiple of divisor less than or equal to provided number
*
* @param {number} number
* @param {number} divisor
* @returns {number}
*/
const calculateNearestMultiple = (number, divisor) => Math.floor(number / divisor) * divisor

export default calculateNearestMultiple
