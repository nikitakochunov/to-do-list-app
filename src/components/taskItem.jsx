import React from 'react'

const TaskItem = ({ id, name, done, onDelete, ...rest }) => {
  console.log()
  return (
    <div className="task-item">
      <div className="task-item__main-container">
        <div className="task-item__main-content">
          <form className="checkbox-form">
            <input
              type="checkbox"
              className="checkbox-form__checkbox"
              id={id}
              checked={done}
              {...rest}
            />
            <label htmlFor={id}></label>
          </form>
          <span className="task-item__text">{name}</span>
        </div>
        <button
          className="task-item__delete-button default-button delete-button"
          id={id}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
