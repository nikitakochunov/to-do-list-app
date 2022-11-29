import React from 'react'

const DateButton = ({ dateMenu, onDateButtonClick, onDateMenuClick }) => {
  return (
    <div className="create-task-block__date">
      <div
        className={!dateMenu.hidden ? 'active' : ''}
        onClick={onDateMenuClick}
      >
        Date
      </div>
      <ul>
        {dateMenu.buttons.map((button) => (
          <li key={button.id}>
            <button
              type="button"
              className={
                'create-task-block__date-button' +
                (button.active ? ' active' : '')
              }
              onClick={() => onDateButtonClick(button.id)}
            >
              {button.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DateButton
