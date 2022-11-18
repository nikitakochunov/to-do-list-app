export function validate() {}

export function validate(inputValue) {
  const doesTaskExist = this.#checkIfTaskAlreadyExists(inputValue)
  // const forbiddenSymbol = '6'
  if (!inputValue || doesTaskExist) {
    return false
  }

  return true
}

export function checkIfTaskAlreadyExists(inputValue) {
  if (!this.tasks.length) {
    return false
  }

  const foundTask = this.tasks.find(
    (task) => task.text.toLowerCase() === inputValue.toLowerCase()
  )
  return Boolean(foundTask)
}
