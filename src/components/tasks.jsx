import React, { useState } from 'react'
import CreateTaskBlock from './createTaskBlock'
import TaskItem from './taskItem'

const Tasks = () => {
  const [taskItems, setTaskItems] = useState([
    { name: 'Create a new task', id: 12345, done: true },
  ])

  const [formInputValue, setformInputValue] = useState('Watch a JS lesson')

  const handleSubmit = (e) => {
    e.preventDefault()

    const inputValue = e.target.taskName.value.trim()
    const taskId = Date.now()
    const newTaskItem = { name: inputValue, id: taskId, done: false }

    const newTaskItems = [...taskItems, newTaskItem]

    console.log('newTaskItems after handleSubmit:', newTaskItems)
    setTaskItems(newTaskItems)
  }

  const handleTaskCheckboxChange = (taskId) => {
    const newTaskItems = taskItems.map((item) => ({
      ...item,
      done: item.id === taskId ? !item.done : item.done,
    }))

    console.log('newTaskItems after handleCheckboxChange', newTaskItems)
    setTaskItems(newTaskItems)
  }

  return (
    <div id="tasks">
      <div className="tasks__wrapper">
        <CreateTaskBlock inputValue={formInputValue} onSubmit={handleSubmit} />
        <div className="tasks-list">
          {taskItems.map((item) => (
            <TaskItem
              key={item.id}
              {...item}
              onChange={() => handleTaskCheckboxChange(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
