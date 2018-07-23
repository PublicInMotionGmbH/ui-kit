// Array containing number KeyCodes
const NUMBERS_CODES = Array(10).fill(0).map((item, index) => index + 48)
const NUMBPAD_CODES = Array(10).fill(0).map((item, index) => index + 96)

// Keys: Backspace, Tab, Enter, arrows (left, up, right, down)
const CONTROL_CODES = [8, 9, 13, 37, 38, 39, 40, 46]

export const ALLOWED_KEYS = [...NUMBERS_CODES, ...NUMBPAD_CODES, ...CONTROL_CODES]
