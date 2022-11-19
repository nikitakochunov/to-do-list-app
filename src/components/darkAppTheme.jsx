import React from 'react'

const DarkAppTheme = () => {
  const styles = `
  body {
    background: #24292E;
  }
  .tasks-list .task-item {
    color: #ffffff;
  }
  button {
    border: 1px solid #ffffff;
  }
  .checkbox-form__checkbox+label:before {
    border-color: #ffffff;
  }
  `
  return <style>{styles}</style>
}

export default DarkAppTheme
