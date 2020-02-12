import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import DrugDetailsTemplate from './drug-details-template'

const DrugDetailsPage = ({ state }) => {
   const { detail, open, handleClose } = state

   const contentBlob = JSON.stringify(detail, null, 3)

   const content = (
      <Paper>
         <Box p={2}>
            <Typography variant="subheader1" paragraph>
               Disclaimer
            </Typography>
            <Typography variant="body2" paragraph>
               {detail.disclaimer}
            </Typography>
         </Box>
      </Paper>
   )

   const closeButton = (
      <Button color="primary" onClick={handleClose}>
         Close
      </Button>
   )
   const propsDrugDetailsTemplate = {
      state: {
         content,
         open,
         closeButton,
      },
   }

   return <DrugDetailsTemplate {...propsDrugDetailsTemplate} />
}

export default DrugDetailsPage
