import React, { useState } from 'react'
import PropTypes from 'prop-types'

import HomePage from './home-page'

import constants from '../../../constants'

const Home = ({ history }) => {
   const [anchorElMainMenu, setAnchorElMainMenu] = useState(null)
   const [anchorElProfileMenu, setAnchorElProfileMenu] = useState(null)
   const [activeMenu, setActiveMenu] = useState('drugs')
   const [activeState, setActiveState] = useState('get')
   const { routes } = constants

   const handleAddClick = name => {
      setActiveState('add')
      history.push(routes[name] + routes.add)
   }

   const handleLogoutClick = () => {
      history.push(routes.logout)
   }

   const handleMenuOpen = (e, name) => {
      const { target } = e
      switch (name) {
         case 'main':
            setAnchorElMainMenu(target)
            break
         case 'profile':
            setAnchorElProfileMenu(target)
            break
         default:
      }
   }

   const handleMenuClose = name => {
      switch (name) {
         case 'main':
            setAnchorElMainMenu(null)
            break
         case 'profile':
            setAnchorElProfileMenu(null)
            break
         default:
      }
   }

   const handleMenuItemClick = name => {
      setActiveMenu(name)
      setActiveState('get')
      handleMenuClose('main')
      history.push(routes[name])
   }

   const actions = {
      handleAddClick,
      handleLogoutClick,
      handleMenuClose,
      handleMenuOpen,
      handleMenuItemClick,
      setActiveState,
   }

   const state = {
      activeMenu,
      activeState,
      anchorElMainMenu,
      anchorElProfileMenu,
   }

   const propsHomePage = {
      actions,
      history,
      state,
   }

   return <HomePage {...propsHomePage} />
}

Home.propTypes = {
   history: PropTypes.object,
}

export default Home
