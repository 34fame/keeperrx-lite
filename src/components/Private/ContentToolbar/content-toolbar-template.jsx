import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const MenuBarTemplate = ({ state }) => {
   const { cardViewButton, listViewButton, searchField, filterButton } = state

   return (
      <Grid container justify="space-evenly" alignItems="center" spacing={3}>
         <Grid item>{cardViewButton}</Grid>
         <Grid item>{listViewButton}</Grid>
         <Grid item>{searchField}</Grid>
         <Grid item>{filterButton}</Grid>
      </Grid>
   )
}

MenuBarTemplate.propTypes = {
   state: PropTypes.object,
}

export default MenuBarTemplate
