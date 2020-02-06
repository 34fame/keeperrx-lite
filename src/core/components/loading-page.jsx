import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const LoadingPage = ({ open, message }) => {
   const Message = () => (
      <Box display="flex" justifyContent="center">
         <Typography variant="h5">{message}</Typography>
      </Box>
   )

   return (
      <Backdrop open={open ? true : false}>
         <Message />
         <CircularProgress color="inherit" />
      </Backdrop>
   )
}

export default LoadingPage
