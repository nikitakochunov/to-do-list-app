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

  const [state, setState] = useState(initialState)

  const toLocalStorageState = (objKey, value) => {
    console.group('objKey:', objKey)
    console.log('value', value)
    console.log('prevState', state)
    console.groupEnd()

    setState((prevState) => {
      const newState = {
        ...prevState,
        [objKey]: value,
      }

      toStorage(LOCAL_STORAGE_KEY, newState)

      return newState
    })
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    const newInputValue = {
      text: inputValue,
      isValidated: validate(inputValue),
    }

    toLocalStorageState('formInputValue', newInputValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { text: inputValue, isValidated } = state.formInputValue

    if (!isValidated) {
      console.log(isValidated)
      return
    }

    const taskId = Date.now()
    const newTaskItem = {
      name: deleteExtraSpaces(inputValue),
      id: taskId,
      done: false,
    }

    const newTaskItems = [...state.taskItems, newTaskItem]

    toLocalStorageState('taskItems', newTaskItems)

    const newInputValue = {
      text: '',
      isValidated: true,
    }

    toLocalStorageState('formInputValue', newInputValue)
  }

  const validate = (inputValue) => {
    inputValue = deleteExtraSpaces(inputValue)

    if (!inputValue.length) {
      return false
    }

    const isUniqueName = !state.taskItems.some(
      (item) => item.name.toLowerCase() === inputValue.toLowerCase()
    )

    if (!isUniqueName) {
      return false
    }

    return true
  }

  const handleTaskCheckboxChange = (taskId) => {
    const newTaskItems = state.taskItems.map((item) => {
      if (item.id === taskId) {
        item.done = !item.done
      }
      return item
    })

    console.log('newTaskItems after handleCheckboxChange', newTaskItems)

    toLocalStorageState('taskItems', newTaskItems)
  }

  const handleTaskDelete = (taskId) => {
    toLocalStorageState('currentTaskItemId', taskId)
    handleToggleModal()
  }

  const handleToggleModal = () => {
    toLocalStorageState('modalHidden', !state.modalHidden)
  }

  const handleConfirmClick = () => {
    const inputValue = state.formInputValue.text

    const isValidated = state.taskItems.some(
      (item) =>
        item.name === deleteExtraSpaces(inputValue) &&
        item.id === state.currentTaskItemId
    )

    const newTaskItems = state.taskItems.filter(
      (item) => item.id !== state.currentTaskItemId
    )

    toLocalStorageState('taskItems', newTaskItems)

    toLocalStorageState('currentTaskItemId', null)

    if (isValidated) {
      toLocalStorageState('formInputValue', {
        text: inputValue,
        isValidated,
      })
    }

    handleToggleModal()
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Tab') {
      toLocalStorageState('darkAppTheme', !state.darkAppTheme)
    }
  }

  return (
    <>
      <Tasks
        inputValue={state.formInputValue}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        taskItems={state.taskItems}
        onCheckboxChange={handleTaskCheckboxChange}
        onDelete={handleTaskDelete}
        onKeyUp={handleKeyUp}
      />
      <Modal
        isHidden={state.modalHidden}
        onConfirm={handleConfirmClick}
        onCancel={handleToggleModal}
      />
      {state.darkAppTheme && <DarkAppTheme />}
    </>
  )
}

export default App
