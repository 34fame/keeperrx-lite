import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Input } from '@34fame/ui-component-lib'

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
                        <Input
                           type="switch"
                           color="primary"
                           label={drugs[rxcui].name}
                           checked={drugs[rxcui].include}
                           onChange={() => handleDrugsToggle(rxcui)}
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
         <Box>
            <pre>{JSON.stringify(interactions, null, 3)}</pre>
         </Box>
      </Box>
   )
}

export default InteractionsTemplate
