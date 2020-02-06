import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const DrugsAddTemplate = ({ state }) => {
   const {
      allowCustomDrugCheckbox,
      cancelButton,
      drugConceptSelector,
      fuzzySearchField,
      pageInstructions,
      pageTitle,
      saveButton,
   } = state

   return (
      <Box ml="auto" mr="auto">
         <Container maxWidth="sm">
            {/* Page Title */}
            <Grid container spacing={4}>
               <Grid item xs={12}>
                  {pageTitle}
               </Grid>
            </Grid>
            {/* Fuzzy Search & Drug Concept Selection */}
            <Grid
               container
               justify="center"
               alignContent="center"
               alignItems="center"
               spacing={4}
            >
               {/* Fuzzy Search */}
               <Grid item xs={12}>
                  {fuzzySearchField}
               </Grid>
               {/* Drug Concept Selection */}
               <Grid item xs={12}>
                  {drugConceptSelector}
               </Grid>
            </Grid>
            {/* Buttons */}
            <Grid container justify="flex-end" spacing={2}>
               {/* Allow Custom Drug Selector */}
               <Grid item>{allowCustomDrugCheckbox}</Grid>
               {/* Cancel Button */}
               <Grid item>{cancelButton}</Grid>
               {/* Save Button */}
               <Grid item>{saveButton}</Grid>
            </Grid>
            {/* <Grid container spacing={4}>
               <Grid item>{pageInstructions}</Grid>
            </Grid> */}
         </Container>
      </Box>
   )
}

DrugsAddTemplate.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default DrugsAddTemplate
