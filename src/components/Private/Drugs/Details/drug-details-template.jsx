import React from 'react'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const DrugDetailsTemplate = ({ state }) => {
   const { open, content, closeButton } = state

   return (
      <Box p={4}>
         <Dialog open={open} maxWidth="md" fullWidth>
            <DialogContent>{content}</DialogContent>
            <DialogActions>{closeButton}</DialogActions>
         </Dialog>
      </Box>
   )
}

export default DrugDetailsTemplate
