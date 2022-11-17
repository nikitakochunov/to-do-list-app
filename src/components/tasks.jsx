import React from 'react'

const Tasks = () => {
  const taskId = Date.now()
  return (
    <div id="tasks">
      <div className="tasks__wrapper">
        <form className="create-task-block">
          <input
            type="text"
            className="create-task-block__input default-text-input"
            name="taskName"
            placeholder="Create a new task"
          />
          <button
            className="create-task-block__button default-button"
            type="submit"
          >
            Create
          </button>
        </form>
        <div className="tasks-list">
          <div className="task-item">
            <div className="task-item__main-container">
              <div className="task-item__main-content">
                <form className="checkbox-form">
                  <input
                    type="checkbox"
                    className="checkbox-form__checkbox"
                    id={taskId}
                  />
                  <label htmlFor={taskId}></label>
                </form>
                <span className="task-item__text">Create a new task</span>
              </div>
              <button
                className="task-item__delete-button default-button delete-button"
                id={taskId}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
