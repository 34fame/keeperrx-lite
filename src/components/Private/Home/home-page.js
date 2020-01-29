import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Menu } from '@34fame/ui-component-lib'

import HomeTemplate from './home-template'

const HomePage = ({ actions, content, state }) => {
   const {
      handleLogout,
      handleMainMenuClose,
      handleMainMenuOpen,
      handleProfileMenuClose,
      handleProfileMenuOpen,
   } = actions
   const { anchorElMainMenu, anchorElProfileMenu } = state

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
         onClose: handleMainMenuClose,
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
         onClose: handleMainMenuClose,
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
         onClose: handleMainMenuClose,
      },
   ]

   const mainMenu = (
      <Menu
         anchorEl={anchorElMainMenu}
         open={Boolean(anchorElMainMenu)}
         items={mainMenuItems}
         onClose={handleMainMenuClose}
      />
   )

   const mainMenuButton = (
      <Button
         name="mainMenuButton"
         icon={<Icon style={{ color: 'white' }}>menu</Icon>}
         open={Boolean(anchorElMainMenu)}
         onClick={handleMainMenuOpen}
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
         onClick: handleLogout,
         onClose: handleProfileMenuClose,
      },
   ]

   const profileMenu = (
      <Menu
         anchorEl={anchorElProfileMenu}
         open={Boolean(anchorElProfileMenu)}
         items={profileMenuItems}
         onClose={handleProfileMenuClose}
      />
   )

   const profileMenuButton = (
      <Button
         name="profileMenuButton"
         icon={<Icon style={{ color: 'white' }}>account_circle</Icon>}
         open={Boolean(anchorElProfileMenu)}
         onClick={handleProfileMenuOpen}
      />
   )

   const menus = {
      mainMenu: {
         menu: mainMenu,
         button: mainMenuButton,
      },
      profileMenu: {
         menu: profileMenu,
         button: profileMenuButton,
      },
   }

   const propsHomeTemplate = {
      actions,
      content,
      menus,
      state,
   }

   return <HomeTemplate {...propsHomeTemplate} />
}

HomePage.propTypes = {
   actions: PropTypes.shape({
      handleLogout: PropTypes.func.isRequired,
      handleMainMenuOpen: PropTypes.func.isRequired,
      handleProfileMenuOpen: PropTypes.func.isRequired,
      handleMainMenuClose: PropTypes.func.isRequired,
      handleProfileMenuClose: PropTypes.func.isRequired,
   }).isRequired,
   content: PropTypes.node,
   state: PropTypes.shape({
      anchorElMainMenu: PropTypes.element,
      anchorElProfileMenu: PropTypes.element,
   }),
}

export default HomePage
