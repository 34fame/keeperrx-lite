import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

const EventLogsTemplate = ({ state }) => {
   const { Title, EventList, LoadMoreButton } = state
   return (
      <Box>
         <Container maxWidth="md">
            <Box m={4}>{Title}</Box>
            <Box m={4}>{EventList}</Box>
            <Box m={4} display="flex" justifyContent="center">
               {LoadMoreButton}
            </Box>
         </Container>
      </Box>
   )
}

export default EventLogsTemplate
