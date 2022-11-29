import React from 'react'
import NavLink from './navLink'

const MainNavigation = ({ navLinks, ...rest }) => {
  return (
    <div className="main-navigation">
      {navLinks.map((link) => (
        <NavLink key={link.id} {...link} {...rest} />
      ))}
    </div>
  )
}

export default MainNavigation
