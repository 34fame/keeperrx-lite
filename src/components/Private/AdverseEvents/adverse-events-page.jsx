import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'

import AdverseEventsTemplate from './adverse-events-template'
import { EnhancedTable, LoadingPage } from '../../../core'

const AdverseEventsPage = ({ actions, state }) => {
   const { handleOnChange, handleSearch } = actions
   const { adverseEvents = {}, loading, values } = state
   const { startDate, endDate, rxcui } = values

   const StartDate = (
      <TextField
         fullWidth
         label="Start Date"
         name="startDate"
         variant="outlined"
         value={startDate}
         onChange={e => handleOnChange(e)}
      />
   )

   const EndDate = (
      <TextField
         fullWidth
         label="End Date"
         name="endDate"
         variant="outlined"
         value={endDate}
         onChange={e => handleOnChange(e)}
      />
   )

   const Drug = (
      <TextField
         fullWidth
         label="Drug"
         name="drug"
         variant="outlined"
         value={rxcui}
         onChange={e => handleOnChange(e)}
      />
   )

   const Empty = (
      <Box m={4}>
         <Container maxWidth="sm">
            <Paper>
               <Box p={4}>
                  <Typography variant="body1">No results found</Typography>
               </Box>
            </Paper>
         </Container>
      </Box>
   )

   const SearchButton = (
      <Button
         color="primary"
         endIcon={<SearchIcon />}
         size="large"
         variant="contained"
         onClick={() => handleSearch()}
      >
         Search
      </Button>
   )

   const propsEnhancedTable = {
      headCells: [
         {
            id: 'dateRecieved',
            numeric: false,
            disablePadding: true,
            label: 'Date Recieved',
         },
         {
            id: 'occurCountry',
            numeric: false,
            disablePadding: true,
            label: 'Origin Country',
         },
         {
            id: 'receivingOrg',
            numeric: false,
            disablePadding: true,
            label: 'Receiving Organization',
         },
         {
            id: 'reaction',
            numeric: false,
            disablePadding: true,
            label: 'Reactions',
         },
         {
            id: 'takenWith',
            numeric: false,
            disablePadding: true,
            label: 'Taken With',
         },
      ],
      rows: adverseEvents.events,
      Empty,
   }

   const AdverseEventsTable = <EnhancedTable {...propsEnhancedTable} />

   const propsAdverseEventsTemplate = {
      state: {
         loading,
         AdverseEventsTable,
         StartDate,
         EndDate,
         Drug,
         SearchButton,
         LoadingPage,
      },
   }

   return <AdverseEventsTemplate {...propsAdverseEventsTemplate} />
}

AdverseEventsPage.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default AdverseEventsPage
