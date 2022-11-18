import React, { useState } from 'react'
import CreateTaskBlock from './createTaskBlock'
import TaskItem from './taskItem'

const Tasks = () => {
  const [taskItems, setTaskItems] = useState([
    { name: 'Create a new task', id: 12345, done: true },
  ])

  const [formInputValue, setFormInputValue] = useState('Watch a JS lesson')

  const handleSubmit = (e) => {
    e.preventDefault()

    const inputValue = formInputValue
    const taskId = Date.now()
    const newTaskItem = { name: inputValue, id: taskId, done: false }

    const newTaskItems = [...taskItems, newTaskItem]

    console.log('newTaskItems after handleSubmit:', newTaskItems)
    setTaskItems(newTaskItems)
    setFormInputValue('')
  }

  const handleTaskCheckboxChange = (taskId) => {
    const newTaskItems = taskItems.map((item) => {
      if (item.id === taskId) {
        item.done = !item.done
      }
      return item
    })

    console.log('newTaskItems after handleCheckboxChange', newTaskItems)
    setTaskItems(newTaskItems)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value

    setFormInputValue(inputValue)
  }

  return (
    <div id="tasks">
      <div className="tasks__wrapper">
        <CreateTaskBlock
          inputValue={formInputValue}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        />
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
