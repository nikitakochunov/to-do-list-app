import React from 'react'

const CreateTaskBlock = ({ onSubmit, inputValue, onChange }) => {
  return (
    <form className="create-task-block" onSubmit={onSubmit}>
      <input
        type="text"
        className="create-task-block__input default-text-input"
        name="taskName"
        placeholder="Create a new task"
        value={inputValue}
        onChange={onChange}
      />
      <button
        className="create-task-block__button default-button"
        type="submit"
      >
        Create
      </button>
    </form>
  )
}

export default CreateTaskBlock
