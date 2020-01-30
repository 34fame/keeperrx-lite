import React from 'react'
import PropTypes from 'prop-types'
import {
   Box,
   Button,
   Grid,
   Icon,
   Input,
   Search,
} from '@34fame/ui-component-lib'

const DrugsAddTemplate = ({ actions, state }) => {
   const {
      drugConcept,
      drugConceptOptions,
      drugConceptSelected,
      fuzzySearch,
      fuzzySuggestions,
      nameSelected,
   } = state
   const {
      handleDrugConceptChange,
      handleFuzzySearchChange,
      handleSave,
   } = actions

   return (
      <Box style={{ marginLeft: 'auto', marginRight: 'auto', width: '40%' }}>
         <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center"
            spacing={2}
         >
            <Grid item xs="auto" xl="auto">
               <Search
                  fullWidth
                  divider
                  endAdornment={<Icon>search</Icon>}
                  helperText="Searching National Library of Medicine..."
                  items={fuzzySuggestions}
                  label="Type name of drug here"
                  margin="normal"
                  name="fuzzySearch"
                  selectionMade={nameSelected}
                  value={fuzzySearch}
                  variant="outlined"
                  onChange={handleFuzzySearchChange}
               />
            </Grid>
            <Grid
               item
               style={{
                  display:
                     nameSelected && fuzzySearch.length > 0 ? 'flex' : 'none',
               }}
            >
               <Input
                  type="select"
                  autoWidth
                  divider
                  fullWidth
                  helperText="Select the appropriate drug option"
                  label="Click here to see options"
                  margin="normal"
                  name="drugConcept"
                  selectOptions={drugConceptOptions}
                  value={drugConcept}
                  variant="outlined"
                  onChange={handleDrugConceptChange}
               />
            </Grid>
            <Grid
               item
               style={{ display: drugConceptSelected ? 'flex' : 'none' }}
            >
               <Button color="primary" variant="contained" onClick={handleSave}>
                  Save
               </Button>
            </Grid>
         </Grid>
      </Box>
   )
}

export default DrugsAddTemplate
