import React from 'react'
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import InteractionsTemplate from './interactions-template'

import { EnhancedTable } from '../../../core'

const InteractionsPage = ({ actions, state }) => {
   const { handleDrugsToggle } = actions
   const { drugs, interactions, loading } = state

   const pageTitle = (
      <Typography variant="h5" paragraph>
         Drug Interactions
      </Typography>
   )

   const pageInstructions = (
      <Box m={4}>
         <Typography variant="body1" paragraph>
            This page queries the NLM for any drug interactions between any of
            the drugs you have defined and selected above. You can toggle which
            drugs to include by simply clicking on the toggle switch. To add
            additional drugs to this list go back to the Prescription Drugs
            page.
         </Typography>
         <Typography variant="body1" paragraph>
            If you turn off all toggles but one, the report will show all drug
            interactions for that remaining drug. In other words, all
            interactions that include this drug will be shown.
         </Typography>
      </Box>
   )

   const Empty = (
      <Box m={4}>
         <Typography variant="body1">
            No interactions were found. Either add a drug under Prescription
            Drugs or enable additional drugs above.
         </Typography>
      </Box>
   )

   const drugToggles = (
      <Grid container justify="center">
         {Object.keys(drugs).map(rxcui => (
            <Grid key={rxcui} item>
               <FormControlLabel
                  control={
                     <Switch
                        color="primary"
                        checked={drugs[rxcui].include}
                        onChange={() => handleDrugsToggle(rxcui)}
                     />
                  }
                  label={drugs[rxcui].textPrimary}
               />
            </Grid>
         ))}
      </Grid>
   )

   const nlmDisclaimer = (
      <Box m={4}>
         <Typography variant="caption" color="secondary">
            National Library of Medicine Disclaimer:{' '}
            {interactions.nlmDisclaimer && interactions.nlmDisclaimer.length > 0
               ? interactions.nlmDisclaimer
               : ''}
         </Typography>
      </Box>
   )

   const propsEnhancedTable = {
      headCells: [
         {
            id: 'source',
            numeric: false,
            disablePadding: true,
            label: 'Information Source',
         },
         { id: 'drug1', numeric: false, disablePadding: true, label: 'Drug1' },
         { id: 'drug2', numeric: false, disablePadding: true, label: 'Drug2' },
         {
            id: 'severity',
            numeric: false,
            disablePadding: true,
            label: 'Severity',
         },
         {
            id: 'description',
            numeric: false,
            disablePadding: true,
            label: 'Description',
         },
      ],
      title: 'As Reported by the National Library of Medicine ',
      rows: interactions.interactions,
      loading,
      Empty,
   }

   const interactionsTable = <EnhancedTable {...propsEnhancedTable} />

   const propsInteractionsTemplate = {
      state: {
         pageTitle,
         pageInstructions,
         drugToggles,
         loading,
         nlmDisclaimer,
         interactionsTable,
      },
   }

   return <InteractionsTemplate {...propsInteractionsTemplate} />
}

InteractionsPage.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default InteractionsPage
