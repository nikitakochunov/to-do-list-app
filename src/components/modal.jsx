import React from 'react'

const Modal = ({ isHidden, onConfirm, onCancel }) => {
  const getClasses = () => {
    return isHidden ? 'modal-overlay_hidden' : ''
  }

  return (
    <div className={'modal-overlay ' + getClasses()}>
      <div className="delete-modal">
        <h3 className="delete-modal__question">
          Do you really want to delete this task?
        </h3>
        <div className="delete-modal__buttons">
          <button
            className="delete-modal__button delete-modal__cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="delete-modal__button delete-modal__confirm-button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
