import React, { useState } from 'react'
import './App.css'
import DarkAppTheme from './components/darkAppTheme'
import Modal from './components/modal'
import Tasks from './components/tasks'
import { deleteExtraSpaces, fromStorage, toStorage } from './core/utils'

function App() {
  const LOCAL_STORAGE_KEY = 'todolist-state'

  const initialState = fromStorage(LOCAL_STORAGE_KEY) || {
    taskItems: [],
    formInputValue: {
      text: 'Watch a JS lesson',
      isValidated: true,
    },
    modalHidden: true,
    currentTaskItemId: null,
    darkAppTheme: false,
  }

  const [taskItems, setTaskItems] = useState(initialState.taskItems)

  const [formInputValue, setFormInputValue] = useState(
    initialState.formInputValue
  )

  const [modalHidden, setModalHidden] = useState(initialState.modalHidden)

  const [currentTaskItemId, setCurrentTaskItemId] = useState(
    initialState.currentTaskItemId
  )

  const [darkAppTheme, setDarkAppTheme] = useState(initialState.darkAppTheme)

  const toLocalStorageState = (objKey, value) => {
    const newStorageState = initialState
    newStorageState[objKey] = value

    toStorage(LOCAL_STORAGE_KEY, newStorageState)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    const newInputValue = {
      text: inputValue,
      isValidated: validate(inputValue),
    }

    setFormInputValue(newInputValue)
    toLocalStorageState('formInputValue', newInputValue)
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

    setTaskItems(newTaskItems)
    toLocalStorageState('taskItems', newTaskItems)

    const newInputValue = {
      text: '',
      isValidated: true,
    }
    setFormInputValue(newInputValue)
    toLocalStorageState('formInputValue', newInputValue)
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

    console.log('newTaskItems after handleCheckboxChange', newTaskItems)

    setTaskItems(newTaskItems)
    toLocalStorageState('taskItems', newTaskItems)
  }

  const handleTaskDelete = (taskId) => {
    setCurrentTaskItemId(taskId)
    toLocalStorageState('currentTaskItemId', taskId)
    handleToggleModal()
  }

  const handleToggleModal = () => {
    setModalHidden(!modalHidden)
    toLocalStorageState('modalHidden', !modalHidden)
  }

  const handleConfirmClick = () => {
    const newTaskItems = taskItems.filter(
      (item) => item.id !== currentTaskItemId
    )

    setTaskItems(newTaskItems)
    toLocalStorageState('taskItems', newTaskItems)

    setCurrentTaskItemId(null)
    toLocalStorageState('currentTaskItemId', null)
    handleToggleModal()
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Tab') {
      setDarkAppTheme(!darkAppTheme)
      toLocalStorageState('darkAppTheme', !darkAppTheme)
    }
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
        onKeyUp={handleKeyUp}
      />
      <Modal
        isHidden={modalHidden}
        onConfirm={handleConfirmClick}
        onCancel={handleToggleModal}
      />
      {darkAppTheme && <DarkAppTheme />}
    </>
  )
}

export default App
