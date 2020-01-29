import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@34fame/ui-component-lib'

import App from './components/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
   <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </React.Fragment>,
   document.getElementById('root')
)

serviceWorker.register()
