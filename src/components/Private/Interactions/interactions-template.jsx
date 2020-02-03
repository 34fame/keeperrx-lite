import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'

const InteractionsTemplate = ({ actions, state }) => {
   const { handleDrugsToggle } = actions
   const { drugs, interactions } = state

   console.log('interactions-template', 'drugs', drugs)
   return (
      <Box>
         <Grid container direction="column" alignContent="center" spacing={3}>
            <Grid item>
               <Grid container justify="flex-start" spacing={2}>
                  {Object.keys(drugs).map(rxcui => (
                     <Grid key={rxcui} item xs={6}>
                        <FormControlLabel
                           control={
                              <Switch
                                 color="primary"
                                 checked={drugs[rxcui].include}
                                 onChange={() => handleDrugsToggle(rxcui)}
                              />
                           }
                           label={drugs[rxcui].name}
                        />
                     </Grid>
                  ))}
               </Grid>
            </Grid>
         </Grid>
         <Grid container justify="space-around" spacing={2}>
            <Grid item xs={6}>
               NLM Disclaimer
            </Grid>
            <Grid item xs={6}>
               {interactions.nlmDisclaimer}
            </Grid>
         </Grid>
         <Box>{JSON.stringify(interactions, null, 3)}</Box>
      </Box>
   )
}

InteractionsTemplate.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default InteractionsTemplate
