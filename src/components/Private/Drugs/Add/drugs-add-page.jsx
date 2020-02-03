import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import DrugsAddTemplate from './drugs-add-template'

const DrugsAdd = ({ actions, state }) => {
   const {
      allowCustomDrug,
      drugConcept,
      drugConceptOptions,
      drugConceptSelected,
      fuzzySearch,
      fuzzySuggestions,
      loading,
      nameSelected,
   } = state

   const {
      handleAllowCustomCheckbox,
      handleClickFuzzySuggestion,
      handleDrugConceptChange,
      handleFuzzySearchChange,
      handleCancel,
      handleSave,
   } = actions

   const allowCustomDrugHelpText =
      'Unlisted drugs will not be included in Drug Interactions or Adverse Events.'

   const pageTitle = (
      <Typography variant="h5" paragraph>
         Adding a drug
      </Typography>
   )

   const pageInstructions = (
      <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" style={{ fontStyle: 'italic' }}>
               Click here for help...
            </Typography>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails>
            <Typography variant="body2" paragraph>
               <p>
                  Start typing the name of a drug (brand or generic) and a
                  search of the National Library of Medicine will return the
                  closest matching results.
               </p>
               <p>
                  If you don't find a match either check your spelling or, if it
                  isn't a prescribed drug, you can save it as an unlisted drug.
               </p>
               <p>
                  {' '}
                  If you find the drug you are looking for simply select it and
                  then choose the specific drug and strength (known as a drug
                  concept) from the drop down provided.
               </p>
            </Typography>
         </ExpansionPanelDetails>
      </ExpansionPanel>
   )

   const fuzzySearchField = (
      <Autocomplete
         freeSolo
         inputValue={fuzzySearch}
         options={fuzzySuggestions}
         loading={loading}
         loadingText="Searching..."
         onChange={handleClickFuzzySuggestion}
         onInputChange={handleFuzzySearchChange}
         renderInput={params => (
            <TextField
               {...params}
               autoFocus
               color="primary"
               fullWidth
               label="Drug Name"
               name="fuzzySearch"
               variant="outlined"
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                     <InputAdornment position="end">
                        {loading && <CircularProgress size={20} />}
                        {params.InputProps.endAdornment}
                     </InputAdornment>
                  ),
               }}
            />
         )}
      />
   )

   const drugConceptSelector = (
      <TextField
         disabled={!nameSelected || fuzzySearch.length === 0}
         fullWidth
         label="Drug Concept"
         name="drugConcept"
         select
         value={drugConcept}
         variant="outlined"
         onChange={handleDrugConceptChange}
      >
         {drugConceptOptions.map(concept => (
            <MenuItem value={concept.value}>{concept.name}</MenuItem>
         ))}
      </TextField>
   )

   const allowCustomDrugCheckbox = (
      <Tooltip title={allowCustomDrugHelpText}>
         <FormControlLabel
            control={
               <Checkbox
                  checked={allowCustomDrug}
                  disabled={
                     fuzzySearch.length <= 2 || drugConceptOptions.length > 0
                  }
                  onClick={handleAllowCustomCheckbox}
               />
            }
            label="Save unlisted drug?"
         />
      </Tooltip>
   )

   const cancelButton = (
      <Button color="default" variant="outlined" onClick={handleCancel}>
         Cancel
      </Button>
   )

   const saveButton = (
      <Button
         color="primary"
         disabled={!allowCustomDrug && !drugConceptSelected}
         variant="contained"
         onClick={handleSave}
      >
         Save
      </Button>
   )

   const propsDrugsAddTemplate = {
      state: {
         allowCustomDrugCheckbox,
         cancelButton,
         drugConceptSelector,
         fuzzySearchField,
         pageInstructions,
         pageTitle,
         saveButton,
      },
   }

   return <DrugsAddTemplate {...propsDrugsAddTemplate} />
}

DrugsAdd.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default DrugsAdd
