import React from 'react'
import PropTypes from 'prop-types'
import { CssBaseline, Box, Grid, Typography } from '@34fame/ui-component-lib'

const HomeTemplate = ({ actions, content, menus }) => {
   const { mainMenu, profileMenu } = menus

   console.log('home-template', 'mainMenu', mainMenu)
   return (
      <React.Fragment>
         <CssBaseline />
         <Box>
            <Grid
               container
               justify="space-between"
               alignContent="center"
               alignItems="center"
               style={{ backgroundColor: '#3F51B5' }}
            >
               <Grid item>{mainMenu.button}</Grid>
               <Grid item>
                  <Typography variant="subtitle1">
                     <span style={{ color: 'white' }}>KeeperRx Lite</span>
                  </Typography>
               </Grid>
               <Grid item>{profileMenu.button}</Grid>
            </Grid>
            <Grid container>
               <Grid item style={{ padding: '16px' }}>
                  {content}
               </Grid>
            </Grid>
         </Box>
      </React.Fragment>
   )
}

HomeTemplate.propTypes = {
   actions: PropTypes.shape({
      handleLogout: PropTypes.func.isRequired,
      handleMenuOpen: PropTypes.func.isRequired,
      handleMenuClose: PropTypes.func.isRequired,
   }).isRequired,
   content: PropTypes.node,
   menus: PropTypes.shape({
      mainMenu: PropTypes.shape({
         items: PropTypes.array,
         button: PropTypes.element,
      }).isRequired,
      profileMenu: PropTypes.shape({
         items: PropTypes.array,
         button: PropTypes.element,
      }).isRequired,
   }).isRequired,
}

export default HomeTemplate
