import React from 'react'
import ErrorMessage from './errorMessage'

const CreateTaskBlock = ({ inputValue, onSubmit, onInputChange }) => {
  const isValidatedInputValue = inputValue.isValidated

  return (
    <form className="create-task-block" onSubmit={onSubmit}>
      <input
        type="text"
        className="create-task-block__input default-text-input"
        name="taskName"
        placeholder="Create a new task"
        value={inputValue.text}
        onChange={onInputChange}
      />
      <button
        className="create-task-block__button default-button"
        type="submit"
        disabled={!isValidatedInputValue || inputValue.text === ''}
      >
        Create
      </button>
      {!isValidatedInputValue && <ErrorMessage />}
    </form>
  )
}

export default CreateTaskBlock
