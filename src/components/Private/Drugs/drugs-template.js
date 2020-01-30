import React from 'react'
import PropTypes from 'prop-types'

import { Box, Button, Grid, Icon, Typography } from '@34fame/ui-component-lib'

import { ContentBarTemplate } from '../../../templates'

const DrugsTemplate = ({ actions, content, state }) => {
   const { handleAddClick, handleDrugsDetail, handleDrugsDelete } = actions

   const propsContentBarTemplate = { actions, state }

   return (
      <React.Fragment>
         <Grid container direction="column" alignContent="center" spacing={3}>
            <Grid item>
               <ContentBarTemplate {...propsContentBarTemplate} />
            </Grid>
            <Grid item>
               <Box style={{ paddingTop: '24px' }}>
                  <Grid
                     container
                     direction="row"
                     justify="flex-start"
                     spacing={2}
                  >
                     <Grid item>
                        <Icon size="large">save</Icon>
                     </Grid>
                     <Grid item>
                        <Typography variant="h5">Saved Drugs</Typography>
                     </Grid>
                     <Grid item>
                        <Button
                           color="default"
                           icon={<Icon color="primary">add_circle</Icon>}
                           iconStart
                           variant="outlined"
                           onClick={() => handleAddClick('drugs')}
                        >
                           Add a drug
                        </Button>
                     </Grid>
                  </Grid>
                  <Grid
                     container
                     direction="column"
                     alignContent="center"
                     spacing={3}
                  >
                     <Grid item>{content}</Grid>
                  </Grid>
               </Box>
            </Grid>
         </Grid>
      </React.Fragment>
   )
}

export default DrugsTemplate
