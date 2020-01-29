import React from 'react'
import PropTypes from 'prop-types'
import { CssBaseline, Box, Grid, Typography } from '@34fame/ui-component-lib'

const HomeTemplate = ({ content, menus }) => {
   const { mainMenu, profileMenu } = menus

   return (
      <React.Fragment>
         <CssBaseline />
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
                  <span style={{ color: 'white' }}>
                     KeeperRx <span style={{ fontStyle: 'italic' }}>Lite</span>
                  </span>
               </Typography>
            </Grid>
            <Grid item>{profileMenu.button}</Grid>
         </Grid>
         <Box style={{ paddingTop: '24px' }}>{content}</Box>
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
