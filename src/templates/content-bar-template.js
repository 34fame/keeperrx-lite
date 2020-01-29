import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon, Input } from '@34fame/ui-component-lib'

const ContentBarTemplate = ({ actions, state }) => {
   const {
      handleContentBarDisplayClick,
      handleContentBarSearchChange,
   } = actions
   const { contentBarDisplayOption, contentBarSearchTerm } = state
   return (
      <Grid container direction="row" alignItems="center" spacing={3}>
         <Grid item xs={2}>
            <Button
               color={
                  contentBarDisplayOption === 'grid' ? 'primary' : 'default'
               }
               icon={<Icon>view_module</Icon>}
               onClick={() => handleContentBarDisplayClick('grid')}
            />
         </Grid>
         <Grid item xs={2}>
            <Button
               color={
                  contentBarDisplayOption === 'list' ? 'primary' : 'default'
               }
               icon={<Icon>view_list</Icon>}
               onClick={() => handleContentBarDisplayClick('list')}
            />
         </Grid>
         <Grid item xs={6}>
            <Input
               name="search"
               startAdornment={<Icon>search</Icon>}
               value={contentBarSearchTerm}
               variant="outlined"
               onChange={handleContentBarSearchChange}
            />
         </Grid>
         <Grid item xs={2}>
            <Button icon={<Icon>filter_list</Icon>} />
         </Grid>
      </Grid>
   )
}

export default ContentBarTemplate
