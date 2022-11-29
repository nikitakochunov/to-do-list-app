import React from 'react'
import DateButton from './dateButton'

const TaskItem = ({
  id,
  name,
  done,
  onDelete,
  taskDate,
  areAllTasks,
  ...rest
}) => {
  const renderTaskDate = areAllTasks && taskDate.id !== 'no-date'

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
          <span className="task-item__text">
            {name}
            {renderTaskDate ? (
              <span className="task-item__date">{taskDate.text}</span>
            ) : (
              ''
            )}
          </span>
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
