import React, { useState } from 'react'
import { Button, Icon } from '@34fame/ui-component-lib'

import HomePage from './home-page'
import Logout from '../Logout'

const Home = ({ history }) => {
   const [anchorEl, setAnchorEl] = useState(null)

   const handleLogout = () => <Logout />

   const handleMenuClose = e => {
      const { target } = e
      const { name } = target
      setAnchorEl(delete anchorEl[name])
   }

   const handleMenuOpen = e => {
      const { target } = e
      const { name } = target

      setAnchorEl({
         ...anchorEl,
         [name]: target,
      })
   }

   const mainMenuItems = [
      {
         button: true,
         dense: true,
         icon: (
            <Icon size="large" color="primary">
               local_pharmacy
            </Icon>
         ),
         textPrimary: 'Prescription Drugs',
         textSecondary: 'Search the National Library of Medicine',
         onClick: () => alert('drugs'),
      },
      {
         button: true,
         dense: true,
         icon: (
            <Icon size="large" color="primary">
               warning
            </Icon>
         ),
         textPrimary: 'Drug Interactions',
         textSecondary: 'Discover drugs with negative interactions',
         onClick: () => alert('interactions'),
      },
      {
         button: true,
         dense: true,
         icon: (
            <Icon size="large" color="primary">
               notifications_active
            </Icon>
         ),
         textPrimary: 'Public Alerts',
         textSecondary: 'FDA Adverse Events alerts',
         onClick: () => alert('alerts'),
      },
   ]

   const mainMenuButton = (
      <Button
         name="mainMenuButton"
         icon={<Icon style={{ color: 'white' }}>menu</Icon>}
         onClick={e => handleMenuOpen(e)}
      />
   )

   const profileMenuItems = [
      {
         button: true,
         dense: true,
         icon: (
            <Icon size="large" color="primary">
               power_settings_new
            </Icon>
         ),
         textPrimary: 'Logout',
         textSecondary: 'Force authentication on next use',
         onClick: () => handleLogout(),
      },
   ]

   const profileMenuButton = (
      <Button
         name="profileMenuButton"
         icon={<Icon style={{ color: 'white' }}>account_circle</Icon>}
         onClick={e => handleMenuOpen(e)}
      />
   )

   const menus = {
      mainMenu: {
         items: mainMenuItems,
         button: mainMenuButton,
      },
      profileMenu: {
         items: profileMenuItems,
         button: profileMenuButton,
      },
   }

   const actions = {
      handleLogout: handleLogout,
      handleMenuClose: handleMenuClose,
      handleMenuOpen: handleMenuOpen,
   }

   const content = (
      <React.Fragment>
         <p>Some content...</p>
      </React.Fragment>
   )

   const propsHomePage = {
      actions,
      content,
      menus,
   }

   return <HomePage {...propsHomePage} />
}

export default Home
