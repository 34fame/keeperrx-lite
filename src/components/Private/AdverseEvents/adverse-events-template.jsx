import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const AdverseEventsTemplate = ({ state }) => {
   const {
      loading,
      AdverseEventsTable,
      StartDate,
      EndDate,
      Drug,
      SearchButton,
      LoadingPage,
   } = state

   const content = () => {
      if (loading) {
         return LoadingPage
      }

      return AdverseEventsTable
   }

   return (
      <Box>
         <Box
            p={4}
            display="flex"
            direction="column"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
         >
            <Container maxWidth="md">
               <Grid
                  container
                  justify="center"
                  alignItems="center"
                  alignContent="center"
                  spacing={4}
               >
                  <Grid item xs={12} sm={6} md={3}>
                     {StartDate}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                     {EndDate}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                     {Drug}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                     {SearchButton}
                  </Grid>
               </Grid>
            </Container>
         </Box>
         <Box p={2} display="flex" justifyContent="center">
            <Container maxWidth="lg">
               <Box>{content}</Box>
            </Container>
         </Box>
      </Box>
   )
}

AdverseEventsTemplate.propTypes = {
   state: PropTypes.object,
}

export default AdverseEventsTemplate
