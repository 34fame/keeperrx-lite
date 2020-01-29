import React, { useState } from 'react'

import HomePage from './home-page'

import constants from '../../../constants'

const Home = ({ history }) => {
   const [anchorElMainMenu, setAnchorElMainMenu] = useState(null)
   const [anchorElProfileMenu, setAnchorElProfileMenu] = useState(null)
   const { routes } = constants

   const handleLogout = () => {
      console.log('handleLogout')
      history.push(routes.logout)
   }

   const handleMainMenuOpen = e => {
      const { target } = e
      setAnchorElMainMenu(target)
   }

   const handleMainMenuClose = () => {
      setAnchorElMainMenu(null)
   }

   const handleProfileMenuOpen = e => {
      const { target } = e
      setAnchorElProfileMenu(target)
   }

   const handleProfileMenuClose = () => {
      setAnchorElProfileMenu(null)
   }

   const actions = {
      handleLogout,
      handleMainMenuClose,
      handleProfileMenuClose,
      handleMainMenuOpen,
      handleProfileMenuOpen,
   }

   const content = (
      <React.Fragment>
         <p>Some content...</p>
      </React.Fragment>
   )

   const state = { anchorElMainMenu, anchorElProfileMenu }

   const propsHomePage = {
      actions,
      content,
      state,
   }

   return <HomePage {...propsHomePage} />
}

export default Home
