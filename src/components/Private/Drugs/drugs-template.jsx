import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AddCircle from '@material-ui/icons/AddCircle'
import SaveIcon from '@material-ui/icons/Save'

import ContentToolbar from '../ContentToolbar'

const DrugsTemplate = ({ actions, content, state }) => {
   const { addButton, pageTitle } = state

   const propsContentBar = { actions, state }

   return (
      <Box ml="auto" mr="auto">
         <Container maxWidth="sm">
            {/* Content Toolbar */}
            <ContentToolbar {...propsContentBar} />

            {/* Page Title */}
            <Box mt={4}>
               <Grid container justify="space-between" spacing={4}>
                  <Grid item>{pageTitle}</Grid>
                  {/* Add Button */}
                  <Grid item>{addButton}</Grid>
               </Grid>
            </Box>
            {/* Drug List */}
            <Grid
               container
               justify="center"
               alignContent="center"
               alignItems="center"
               spacing={4}
            >
               <Grid item>{content()}</Grid>
            </Grid>
         </Container>
      </Box>
   )
}

DrugsTemplate.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default DrugsTemplate
