import React from 'react'

const Modal = () => {
  return (
    <div className="modal-overlay modal-overlay_hidden">
      <div className="delete-modal">
        <h3 className="delete-modal__question">
          Do you really want to delete this task?
        </h3>
        <div className="delete-modal__buttons">
          <button className="delete-modal__button delete-modal__cancel-button">
            Cancel
          </button>
          <button className="delete-modal__button delete-modal__confirm-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
