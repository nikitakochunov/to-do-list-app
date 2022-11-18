import React, { useState } from 'react'
import './App.css'
import Modal from './components/modal'
import Tasks from './components/tasks'
import { deleteExtraSpaces, fromStorage, toStorage } from './core/utils'

function App() {
  const initialTaskItems = fromStorage('taskItems') || []

  const [taskItems, setTaskItems] = useState(initialTaskItems)

  const [formInputValue, setFormInputValue] = useState({
    text: 'Watch a JS lesson',
    isValidated: true,
  })

  const [modalHidden, setModalHidden] = useState(true)

  const [currentTaskItemId, setCurrentTaskItemId] = useState(null)

  const handleInputChange = (e) => {
    const inputValue = e.target.value

    setFormInputValue({
      text: inputValue,
      isValidated: validate(inputValue),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { text: inputValue } = formInputValue

    const taskId = Date.now()
    const newTaskItem = {
      name: deleteExtraSpaces(inputValue),
      id: taskId,
      done: false,
    }

    const newTaskItems = [...taskItems, newTaskItem]
    toStorage('taskItems', newTaskItems)

    console.log('newTaskItems after handleSubmit:', newTaskItems)
    setTaskItems(newTaskItems)
    setFormInputValue({
      text: '',
      isValidated: true,
    })
  }

  const validate = (inputValue) => {
    inputValue = deleteExtraSpaces(inputValue)

    if (!inputValue.length) {
      return false
    }

    const isUniqueName = !taskItems.some(
      (item) => item.name.toLowerCase() === inputValue.toLowerCase()
    )

    if (!isUniqueName) {
      return false
    }

    return true
  }

  const handleTaskCheckboxChange = (taskId) => {
    const newTaskItems = taskItems.map((item) => {
      if (item.id === taskId) {
        item.done = !item.done
      }
      return item
    })

    toStorage('taskItems', newTaskItems)

    console.log('newTaskItems after handleCheckboxChange', newTaskItems)
    setTaskItems(newTaskItems)
  }

  const handleTaskDelete = (taskId) => {
    console.log('delete', taskId)
    setCurrentTaskItemId(taskId)
    handleToggleModal()
  }

  const handleToggleModal = () => {
    console.log('toggle modal')
    setModalHidden(!modalHidden)
  }

  const handleConfirmClick = () => {
    const newTaskItems = taskItems.filter(
      (item) => item.id !== currentTaskItemId
    )

    toStorage('taskItems', newTaskItems)

    setTaskItems(newTaskItems)
    setCurrentTaskItemId(null)
    handleToggleModal()
  }

  return (
    <>
      <Tasks
        inputValue={formInputValue}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        taskItems={taskItems}
        onCheckboxChange={handleTaskCheckboxChange}
        onDelete={handleTaskDelete}
      />
      <Modal
        isHidden={modalHidden}
        onConfirm={handleConfirmClick}
        onCancel={handleToggleModal}
      />
    </>
  )
}

export default App
