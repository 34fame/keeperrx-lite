import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Menu } from '@34fame/ui-component-lib'

import HomeTemplate from './home-template'
import Drugs from '../Drugs'

const HomePage = ({ actions, history, state }) => {
   const {
      handleLogout,
      handleMenuClose,
      handleMenuOpen,
      handleMenuItemClick,
   } = actions
   const { activeMenu, anchorElMainMenu, anchorElProfileMenu } = state

   const mainMenuItems = [
      {
         button: true,
         dense: true,
         icon: (
            <Icon size="large" color="primary">
               local_pharmacy
            </Icon>
         ),
         name: 'drugs',
         textPrimary: 'Prescription Drugs',
         textSecondary: 'Search the National Library of Medicine',
         onClick: () => handleMenuItemClick('drugs'),
         onClose: () => handleMenuClose('main'),
      },
      {
         button: true,
         dense: true,
         icon: (
            <Icon size="large" color="primary">
               warning
            </Icon>
         ),
         name: 'interactions',
         textPrimary: 'Drug Interactions',
         textSecondary: 'Discover drugs with negative interactions',
         onClick: () => handleMenuItemClick('interactions'),
         onClose: () => handleMenuClose('main'),
      },
      {
         button: true,
         dense: true,
         icon: (
            <Icon size="large" color="primary">
               notifications_active
            </Icon>
         ),
         name: 'alerts',
         textPrimary: 'Public Alerts',
         textSecondary: 'FDA Adverse Events alerts',
         onClick: () => handleMenuItemClick('alerts'),
         onClose: () => handleMenuClose('main'),
      },
   ]

   const mainMenu = (
      <Menu
         anchorEl={anchorElMainMenu}
         name="mainMenu"
         open={Boolean(anchorElMainMenu)}
         items={mainMenuItems}
         onClose={() => handleMenuClose('main')}
      />
   )

   const mainMenuButton = (
      <Button
         name="mainMenuButton"
         icon={<Icon style={{ color: 'white' }}>menu</Icon>}
         open={Boolean(anchorElMainMenu)}
         onClick={e => handleMenuOpen(e, 'main')}
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
         onClose: () => handleMenuClose('profile'),
      },
   ]

   const profileMenu = (
      <Menu
         anchorEl={anchorElProfileMenu}
         open={Boolean(anchorElProfileMenu)}
         items={profileMenuItems}
         onClose={() => handleMenuClose('profile')}
      />
   )

   const profileMenuButton = (
      <Button
         name="profileMenuButton"
         icon={<Icon style={{ color: 'white' }}>account_circle</Icon>}
         open={Boolean(anchorElProfileMenu)}
         onClick={e => handleMenuOpen(e, 'profile')}
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

   const propsDrugs = { history }

   const determineContent = () => {
      switch (activeMenu) {
         case 'drugs':
            return <Drugs {...propsDrugs} />
         default:
            return <Drugs {...propsDrugs} />
      }
   }

   const content = determineContent()

   const propsHomeTemplate = {
      content,
      menus,
   }

   return <HomeTemplate {...propsHomeTemplate} />
}

HomePage.propTypes = {
   actions: PropTypes.shape({
      handleLogout: PropTypes.func.isRequired,
      handleMenuOpen: PropTypes.func.isRequired,
      handleMenuClose: PropTypes.func.isRequired,
   }).isRequired,
   content: PropTypes.node,
   state: PropTypes.shape({
      anchorElMainMenu: PropTypes.node,
      anchorElProfileMenu: PropTypes.node,
   }),
}

export default HomePage
