import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import App from './components/App'
import * as serviceWorker from './serviceWorker'

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

ReactDOM.render(
   <React.Fragment>
      <MuiThemeProvider theme={theme}>
         <MuiPickersUtilsProvider utils={MomentUtils}>
            <CssBaseline />
            <BrowserRouter>
               <CookiesProvider>
                  <App />
               </CookiesProvider>
            </BrowserRouter>
         </MuiPickersUtilsProvider>
      </MuiThemeProvider>
   </React.Fragment>,
   document.getElementById('root')
)

serviceWorker.register()
