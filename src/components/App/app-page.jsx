import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const AppPage = open => {
   return (
      <Backdrop open={open ? true : false}>
         <CircularProgress color="inherit" />
      </Backdrop>
   )
}

export default AppPage
