import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const HomeTemplate = ({ content, menus }) => {
   const { mainMenu, profileMenu } = menus
   const theme = useTheme()
   const useStyles = makeStyles({
      appBarBrand: {
         marginLeft: 'auto',
         marginRight: 'auto',
      },
      appBarBrandSecondary: {
         color: theme.palette.secondary.main,
         fontWeight: '700',
      },
      appBarBrandLite: {
         fontStyle: 'italic',
         fontWeight: '200',
      },
   })
   const classes = useStyles()

   return (
      <React.Fragment>
         <CssBaseline />
         <AppBar position="sticky">
            <Toolbar>
               <Box>{mainMenu.button}</Box>
               <Typography className={classes.appBarBrand} variant="h5">
                  <span>
                     Keeper
                     <span className={classes.appBarBrandSecondary}>
                        Rx
                     </span>{' '}
                     <span className={classes.appBarBrandLite}>Lite</span>
                  </span>
               </Typography>
               <Box component="span">{profileMenu.button}</Box>
            </Toolbar>
         </AppBar>
         <Box pt={3}>{content}</Box>
         {mainMenu.menu}
         {profileMenu.menu}
      </React.Fragment>
   )
}

HomeTemplate.propTypes = {
   content: PropTypes.node,
   menus: PropTypes.shape({
      mainMenu: PropTypes.shape({
         menu: PropTypes.element,
         button: PropTypes.element,
      }).isRequired,
      profileMenu: PropTypes.shape({
         menu: PropTypes.element,
         button: PropTypes.element,
      }).isRequired,
   }).isRequired,
}

export default HomeTemplate
