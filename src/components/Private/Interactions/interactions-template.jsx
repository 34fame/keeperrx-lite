import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

const InteractionsTemplate = ({ state }) => {
   const {
      pageTitle,
      pageInstructions,
      drugToggles,
      loading,
      nlmDisclaimer,
      sourceDisclaimer,
      interactionsTable,
   } = state

   return (
      <Box>
         {!loading && (
            <Box>
               <Container maxWidth="md">{pageTitle}</Container>
               <Container maxWidth="lg">
                  <Box m={4}>{drugToggles}</Box>
                  <Box m={4}>{sourceDisclaimer}</Box>
                  <Box m={4}>{interactionsTable}</Box>
                  <Box m={4}>{nlmDisclaimer}</Box>
                  <Box m={4}>{pageInstructions}</Box>
               </Container>
            </Box>
         )}
      </Box>
   )
}

InteractionsTemplate.propTypes = {
   state: PropTypes.object,
}

export default InteractionsTemplate
