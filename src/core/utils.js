export function deleteExtraSpaces(str) {
  return str.replace(/\s+/g, ' ').trim()
}

export function toStorage(key, value) {
  console.log(key)
  localStorage.setItem(key, JSON.stringify(value))
}

export function fromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
