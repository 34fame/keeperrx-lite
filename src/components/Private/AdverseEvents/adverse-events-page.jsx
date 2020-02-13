import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import EventIcon from '@material-ui/icons/Event'
import SearchIcon from '@material-ui/icons/Search'
import TodayIcon from '@material-ui/icons/Today'
import { DatePicker } from '@material-ui/pickers'

import AdverseEventsTemplate from './adverse-events-template'
import { EnhancedTable, LoadingPage } from '../../../core'

const AdverseEventsPage = ({ actions, state }) => {
   const { handleOnChange, handleSearch } = actions
   const { adverseEvents = {}, drugs, loading, values } = state
   const { startDate, endDate, drug } = values

   const pageTitle = (
      <Typography variant="h5" paragraph>
         Adverse Events
      </Typography>
   )

   const pageInstructions = (
      <Box m={4}>
         <Typography variant="body1" paragraph>
            This page queries the FDA for adverse events within the date range
            and drug you've selected. Adverse events tend to be updated
            infrequently so if you aren't finding any events try setting the
            Starting On date back as far as one year.
         </Typography>
         <Typography variant="body1" paragraph>
            A maximum of 99 events can be returned at a time. If you see the
            total number of results are at 99 then you may want to reduce the
            time period specified.
         </Typography>
      </Box>
   )

   const StartDate = (
      <DatePicker
         autoOk
         format="MM-DD-YYYY"
         fullWidth
         inputVariant="outlined"
         label="Starting On"
         name="startDate"
         value={startDate}
         variant="inline"
         onChange={e => handleOnChange(e, 'startDate')}
         InputProps={{
            startAdornment: (
               <InputAdornment position="start">
                  <TodayIcon />
               </InputAdornment>
            ),
         }}
      />
   )

   const EndDate = (
      <DatePicker
         autoOk
         format="MM-DD-YYYY"
         fullWidth
         inputVariant="outlined"
         label="Ending On"
         name="endDate"
         value={endDate}
         variant="inline"
         onChange={e => handleOnChange(e, 'endDate')}
         InputProps={{
            startAdornment: (
               <InputAdornment position="start">
                  <EventIcon />
               </InputAdornment>
            ),
         }}
      />
   )

   const Drug = (
      <TextField
         fullWidth
         label="Drug"
         name="drug"
         select
         variant="outlined"
         value={drug}
         onChange={e => handleOnChange(e)}
      >
         {drugs.map(drug => (
            <MenuItem key={drug.rxcui} value={drug.rxcui}>
               {drug.textPrimary}
            </MenuItem>
         ))}
      </TextField>
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
      title: 'As Reported to the Federal Drug Administration',
      rows: adverseEvents.events,
      Empty,
   }

   const AdverseEventsTable = <EnhancedTable {...propsEnhancedTable} />

   const propsAdverseEventsTemplate = {
      state: {
         pageTitle,
         pageInstructions,
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
