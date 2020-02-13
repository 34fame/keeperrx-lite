import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Image from 'material-ui-image'

import DrugDetailsTemplate from './drug-details-template'

const DrugDetailsPage = ({ state }) => {
   const { detail, open, handleClose } = state

   const content = (
      <Container maxWidth="md">
         {/* Meta Content */}
         {detail.disclaimer && (
            <Box p={4}>
               {Object.keys(detail).map(idx => (
                  <Box key={idx}>
                     {detail[idx].type &&
                        detail[idx].type === 'meta' &&
                        detail[idx].value.length > 0 && (
                           <Box mb={1}>
                              <Grid container>
                                 <Grid item xs>
                                    <Typography variant="subtitle1">
                                       {detail[idx].label}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs>
                                    <Typography variant="body2">
                                       {detail[idx].value}
                                    </Typography>
                                 </Grid>
                              </Grid>
                              <Divider />
                           </Box>
                        )}
                  </Box>
               ))}
            </Box>
         )}
         {/* Image Content */}
         {detail.image && detail.image.value && (
            <Box>
               <Image src={detail.image.value} />
            </Box>
         )}
         {/* Detailed Content */}
         {Object.keys(detail).map(idx => (
            <Box key={idx}>
               {!detail[idx].type && detail[idx].value.length > 0 && (
                  <Box key={detail[idx].label} p={2} mb={1}>
                     <ExpansionPanel>
                        <ExpansionPanelSummary
                           variant="subheader1"
                           expandIcon={<ExpandMoreIcon />}
                        >
                           <Typography>{detail[idx].label}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                           <Typography variant="body2">
                              {detail[idx].value}
                           </Typography>
                        </ExpansionPanelDetails>
                     </ExpansionPanel>
                  </Box>
               )}
            </Box>
         ))}
      </Container>
   )

   const closeButton = (
      <Box m={2}>
         <Button color="primary" variant="outlined" onClick={handleClose}>
            Close
         </Button>
      </Box>
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
