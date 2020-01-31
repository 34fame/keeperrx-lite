import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Input } from '@34fame/ui-component-lib'

const AdverseEventsTemplate = ({ actions, state }) => {
   const { drugs, adverseEvents } = state

   console.log('adverse-events-template', 'adverseEvents', adverseEvents)
   return (
      <Box>
         <Grid container direction="column" alignContent="center" spacing={3}>
            <Grid item>
               <Box>
                  {adverseEvents
                     ? JSON.stringify(adverseEvents, null, 3)
                     : null}
               </Box>
            </Grid>
         </Grid>
      </Box>
   )
}

AdverseEventsTemplate.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default AdverseEventsTemplate
