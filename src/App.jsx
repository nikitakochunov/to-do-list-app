import React, { useState } from 'react'
import './App.css'
import DarkAppTheme from './components/darkAppTheme'
import MainNavigation from './components/mainNav'
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
    navLinks: [
      { id: 'all', text: 'All', link: '#tasks-all', selected: true },
      { id: 'today', text: 'Today', link: '#tasks-today', selected: false },
      { id: 'week', text: 'Week', link: '#tasks-week', selected: false },
      { id: 'later', text: 'Later', link: '#tasks-later', selected: false },
    ],
    dateMenu: {
      hidden: true,
      buttons: [
        { id: 'today', text: 'Today', active: false },
        { id: 'week', text: 'Week', active: false },
        { id: 'later', text: 'Later', active: false },
      ],
    },
  }

  const [state, setState] = useState(initialState)

  const selectedNavLinkId = state.navLinks.find((link) => link.selected).id

  const handleNavLinkClick = (linkId) => {
    const newLinks = state.navLinks.map((link) => ({
      ...link,
      selected: link.id === linkId,
    }))

    toLocalStorageState('navLinks', newLinks)
  }

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
    // const taskDate = state.navLinks.find((link) => link.selected).id
    const activeDateButton = state.dateMenu.buttons.find((date) => date.active)

    const taskDate = {
      text: activeDateButton?.text || 'No date',
      id: activeDateButton?.id || 'no-date',
    }

    const newTaskItem = {
      name: deleteExtraSpaces(inputValue),
      id: taskId,
      done: false,
      taskDate,
    }

    const newTaskItems = [...state.taskItems, newTaskItem]

    toLocalStorageState('taskItems', newTaskItems)

    const newInputValue = {
      text: '',
      isValidated: true,
    }

    toLocalStorageState('formInputValue', newInputValue)

    const newDateMenu = {
      hidden: true,
      buttons: state.dateMenu.buttons.map((date) => ({
        ...date,
        active: false,
      })),
    }

    toLocalStorageState('dateMenu', newDateMenu)
  }

  const handleDateButtonClick = (dateId) => {
    const newDateMenu = {
      hidden: state.dateMenu.hidden,
      buttons: state.dateMenu.buttons.map((btn) => {
        if (btn.id === dateId) {
          return {
            ...btn,
            active: !btn.active,
          }
        }
        return {
          ...btn,
          active: false,
        }
      }),
    }

    toLocalStorageState('dateMenu', newDateMenu)
  }

  const handleToggleDateMenu = () => {
    const newDateMenu = {
      ...state.dateMenu,
      hidden: !state.dateMenu.hidden,
    }

    toLocalStorageState('dateMenu', newDateMenu)
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
      <MainNavigation
        navLinks={state.navLinks}
        onNavLinkClick={handleNavLinkClick}
      />
      <Tasks
        dateMenu={state.dateMenu}
        onDateMenuClick={handleToggleDateMenu}
        onDateButtonClick={handleDateButtonClick}
        tasksDateId={selectedNavLinkId}
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
