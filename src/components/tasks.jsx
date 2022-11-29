import React from 'react'
import CreateTaskBlock from './createTaskBlock'
import TaskItem from './taskItem'

const Tasks = ({
  dateMenu,
  tasksDateId,
  taskItems,
  onCheckboxChange,
  onDelete,
  onKeyUp,
  ...rest
  // inputValue,
  // onSubmit,
  // onInputChange,
}) => {
  const areAllTasks = tasksDateId === 'all'
  return (
    <div id="tasks" onKeyUp={onKeyUp}>
      <div className="tasks__wrapper">
        <CreateTaskBlock
          // inputValue={formInputValue}
          // onSubmit={handleSubmit}
          // onChange={handleInputChange}
          dateMenu={dateMenu}
          {...rest}
        />
        <div className="tasks-list">
          {taskItems.map((item) => {
            if (item.taskDate.id === tasksDateId || areAllTasks) {
              return (
                <TaskItem
                  key={item.id}
                  {...item}
                  areAllTasks={areAllTasks}
                  onChange={() => onCheckboxChange(item.id)}
                  onDelete={() => onDelete(item.id)}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Tasks
