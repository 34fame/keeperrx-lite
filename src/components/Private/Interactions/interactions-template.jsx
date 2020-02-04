import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

const InteractionsTemplate = ({ state }) => {
   const {
      drugToggles,
      nlmDisclaimer,
      sourceDisclaimer,
      interactionsTable,
   } = state

   return (
      <Box>
         <Box m={4}>
            <Container maxWidth="lg">{drugToggles}</Container>
         </Box>
         <Box m={4}>{sourceDisclaimer}</Box>
         <Box m={4}>
            <Container maxWidth="xl">{interactionsTable}</Container>
         </Box>
         <Box m={4}>
            <Container maxWidth="md">{nlmDisclaimer}</Container>
         </Box>
      </Box>
   )
}

InteractionsTemplate.propTypes = {
   state: PropTypes.object,
}

export default InteractionsTemplate
