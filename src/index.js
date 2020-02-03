import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from './components/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
   <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
         <CookiesProvider>
            <App />
         </CookiesProvider>
      </BrowserRouter>
   </React.Fragment>,
   document.getElementById('root')
)

serviceWorker.register()
