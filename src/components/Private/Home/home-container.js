import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import HomePage from './home-page'

import constants from '../../../constants'

const Home = ({ history }) => {
   const [anchorElMainMenu, setAnchorElMainMenu] = useState(null)
   const [anchorElProfileMenu, setAnchorElProfileMenu] = useState(null)
   const [activeMenu, setActiveMenu] = useState('drugs')
   const { routes } = constants

   useEffect(() => {
      console.log('home-container', 'activeMenu', activeMenu)
   }, [activeMenu])

   const handleLogout = () => {
      console.log('handleLogout')
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
      handleMenuClose('main')
   }

   const actions = {
      handleLogout,
      handleMenuClose,
      handleMenuOpen,
      handleMenuItemClick,
   }

   const state = { activeMenu, anchorElMainMenu, anchorElProfileMenu }

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
