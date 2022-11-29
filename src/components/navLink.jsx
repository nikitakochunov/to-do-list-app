import React from 'react'

const NavLink = (props) => {
  return (
    <a
      href={props.link}
      className={
        'main-navigation__button-item' + (props.selected ? ' selected' : '')
      }
      onClick={() => props.onNavLinkClick(props.id)}
    >
      {props.text}
    </a>
  )
}

export default NavLink
