import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import ContentToolbar from '../ContentToolbar'

const DrugsTemplate = ({ actions, content, state }) => {
   const { addButton, contentToolbarDisplaySetting, pageTitle } = state

   const propsContentBar = { actions, state }

   return (
      <Box ml="auto" mr="auto">
         <Container maxWidth="sm" fixed>
            {/* Content Toolbar */}
            <ContentToolbar {...propsContentBar} />
            {/* Page Title */}
         </Container>
         <Container maxWidth="md">
            <Box mt={4} display="flex" justifyContent="space-between">
               {pageTitle}
               {addButton}
            </Box>
         </Container>
         <Container
            maxWidth={contentToolbarDisplaySetting === 'list' ? 'md' : 'xl'}
         >
            {/* Drug List */}
            <Box>{content}</Box>
         </Container>
      </Box>
   )
}

DrugsTemplate.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default DrugsTemplate
