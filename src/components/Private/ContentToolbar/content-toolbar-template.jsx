import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const MenuBarTemplate = ({ state }) => {
   const { cardViewButton, listViewButton, searchField, filterButton } = state

   return (
      <Box display="flex" justifyContent="center">
         <Box>{cardViewButton}</Box>
         <Box>{listViewButton}</Box>
         <Box>{searchField}</Box>
         <Box>{filterButton}</Box>
      </Box>
   )
}

MenuBarTemplate.propTypes = {
   state: PropTypes.object,
}

export default MenuBarTemplate
