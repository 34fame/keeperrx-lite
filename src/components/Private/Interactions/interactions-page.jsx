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

   const Empty = (
      <Typography variant="body2">No interactions were found.</Typography>
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

   let nlmDisclaimer = ''
   if (!loading && nlmDisclaimer.length > 0) {
      nlmDisclaimer = (
         <Typography variant="caption" color="secondary">
            National Library of Medicine Disclaimer:{' '}
            {interactions.nlmDisclaimer}
         </Typography>
      )
   }

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
         drugToggles,
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
