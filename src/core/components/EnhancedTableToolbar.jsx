import React from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import { lighten, makeStyles } from '@material-ui/core/styles'

const useToolbarStyles = makeStyles(theme => ({
   title: {
      flex: '1 1 100%',
   },
}))

const EnhancedTableToolbar = props => {
   // const theme = useTheme()
   const classes = useToolbarStyles()

   return (
      <Toolbar>
         <Typography className={classes.title} variant="h6" id="tableTitle">
            Drug Interactions
         </Typography>

         <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
               <FilterListIcon />
            </IconButton>
         </Tooltip>
      </Toolbar>
   )
}

export default EnhancedTableToolbar
