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
      <Box m={4}>
         <Typography variant="body1" paragraph>
            Start typing the name of a drug (brand or generic) in the "Drug
            Name" field. A list of possible matches will be returned from the
            National Library of Medicine. Be sure to select a drug name and not
            an ingredient.
         </Typography>
         <Typography variant="body1" paragraph>
            After you select the drug from the search results, click on the
            "Drug Concept" field. This should contain a list of all applicable
            drug forms for the drug you chose. If this list is empty please try
            your search again. At this time there is not an option to save an
            unlisted drug.
         </Typography>
      </Box>
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
         {drugConceptOptions.map((concept, idx) => (
            <MenuItem key={idx} value={concept.value}>
               {concept.name}
            </MenuItem>
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
