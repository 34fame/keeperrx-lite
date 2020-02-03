import React from 'react'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import Public from '../Public'
import Private from '../Private'

const App = ({ history }) => {
   const [cookies] = useCookies(['session', 'drugs'])
   const authenticated = cookies.session ? true : false
   const theme = createMuiTheme({
      palette: {
         type: 'light',
         primary: {
            main: '#418FDE',
         },
         secondary: {
            main: '#C8102E',
         },
      },
   })
   const propsPublic = { history }
   const propsPrivate = { history }

   return (
      <React.Fragment>
         <MuiThemeProvider theme={theme}>
            {authenticated ? (
               <Private {...propsPrivate} />
            ) : (
               <Public {...propsPublic} />
            )}
         </MuiThemeProvider>
      </React.Fragment>
   )
}

export default withRouter(App)
