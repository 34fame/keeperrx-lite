import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LocalPharmacy from '@material-ui/icons/LocalPharmacy'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsActive from '@material-ui/icons/NotificationsActive'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie'

import HomeTemplate from './home-template'
import Drugs from '../Drugs'
import DrugsAdd from '../Drugs/Add'
import Interactions from '../Interactions'
import AdverseEvents from '../AdverseEvents'

const HomePage = ({ actions, history, state }) => {
   const {
      handleLogoutClick,
      handleMenuClose,
      handleMenuOpen,
      handleMenuItemClick,
   } = actions
   const {
      activeMenu,
      activeState,
      anchorElMainMenu,
      anchorElProfileMenu,
   } = state
   const theme = useTheme()
   const useStyles = makeStyles({
      appBarProfileMenuButton: {
         color: theme.palette.primary.contrastText,
         marginLeft: 'auto',
      },
      appBarMainMenuButton: {
         color: theme.palette.primary.contrastText,
      },
   })
   const classes = useStyles()
   const [cookies] = useCookies(['session'])

   const mainMenuItems = [
      {
         icon: <LocalPharmacy size="large" color="primary" />,
         name: 'drugs',
         textPrimary: 'Prescription Drugs',
         textSecondary: 'Search the National Library of Medicine',
         onClick: () => handleMenuItemClick('drugs'),
         onClose: () => handleMenuClose('main'),
      },
      {
         icon: <WarningIcon size="large" color="primary" />,
         name: 'interactions',
         textPrimary: 'Drug Interactions',
         textSecondary: 'Discover drugs with negative interactions',
         onClick: () => handleMenuItemClick('interactions'),
         onClose: () => handleMenuClose('main'),
      },
      {
         icon: <NotificationsActive size="large" color="primary" />,
         name: 'adverseEvents',
         textPrimary: 'Adverse Events',
         textSecondary: 'Data collected from FDA Averse Event Reporting System',
         onClick: () => handleMenuItemClick('adverseEvents'),
         onClose: () => handleMenuClose('main'),
      },
   ]

   const mainMenu = (
      <Menu
         anchorEl={anchorElMainMenu}
         keepMounted
         name="mainMenu"
         open={Boolean(anchorElMainMenu)}
         onClose={() => handleMenuClose('main')}
      >
         <List>
            {mainMenuItems.map((item, idx) => (
               <ListItem
                  key={idx}
                  button
                  dense
                  selected={activeMenu === item.name ? true : false}
                  onClick={item.onClick}
               >
                  {item.avatar && <Avatar>{item.avatar}</Avatar>}
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText
                     primary={item.textPrimary}
                     secondary={item.textSecondary}
                  />
               </ListItem>
            ))}
         </List>
      </Menu>
   )

   const mainMenuButton = (
      <IconButton
         className={classes.appBarMainMenuButton}
         name="mainMenuButton"
         open={Boolean(anchorElMainMenu)}
         onClick={e => handleMenuOpen(e, 'main')}
      >
         <MenuIcon />
      </IconButton>
   )

   const profileMenuItems = [
      {
         icon: <PowerSettingsNew />,
         textPrimary: 'Logout',
         textSecondary: 'Force authentication on next use',
         onClick: handleLogoutClick,
         onClose: () => handleMenuClose('profile'),
      },
   ]

   const profileMenu = (
      <Menu
         anchorEl={anchorElProfileMenu}
         keepMounted
         name="profileMenu"
         open={Boolean(anchorElProfileMenu)}
         onClose={() => handleMenuClose('profile')}
      >
         <List>
            {profileMenuItems.map((item, idx) => (
               <ListItem key={idx} button dense onClick={item.onClick}>
                  {item.avatar && <Avatar>{item.avatar}</Avatar>}
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText
                     primary={item.textPrimary}
                     secondary={item.textSecondary}
                  />
               </ListItem>
            ))}
         </List>
      </Menu>
   )

   const profileMenuButton = () => {
      const session = cookies.session
      if (session.photoURL) {
         return (
            <IconButton onClick={e => handleMenuOpen(e, 'profile')}>
               <Avatar alt={session.displayName} src={session.photoURL} />
            </IconButton>
         )
      } else {
         return (
            <IconButton
               className={classes.appBarProfileMenuButton}
               name="profileMenuButton"
               open={Boolean(anchorElProfileMenu)}
               onClick={e => handleMenuOpen(e, 'profile')}
            >
               <AccountCircle />
            </IconButton>
         )
      }
   }

   const menus = {
      mainMenu: {
         menu: mainMenu,
         button: mainMenuButton,
      },
      profileMenu: {
         menu: profileMenu,
         button: profileMenuButton(),
      },
   }

   const propsDrugs = { actions, history, state }

   const propsDrugsAdd = { actions, history, state }

   const propsInteractions = { actions, history, state }

   const propsAdverseEvents = { actions, history, state }

   const determineContent = () => {
      switch (activeMenu) {
         case 'drugs':
            if (activeState === 'add') {
               return <DrugsAdd {...propsDrugsAdd} />
            }
            return <Drugs {...propsDrugs} />
         case 'interactions':
            return <Interactions {...propsInteractions} />
         case 'adverseEvents':
            return <AdverseEvents {...propsAdverseEvents} />
         default:
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
      handleLogoutClick: PropTypes.func.isRequired,
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
