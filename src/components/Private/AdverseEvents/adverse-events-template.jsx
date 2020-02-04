import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const AdverseEventsTemplate = ({ actions, state }) => {
   const { drugs, adverseEvents } = state

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
