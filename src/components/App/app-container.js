import React from 'react'
import { withRouter } from 'react-router-dom'
import cookie from 'react-cookies'

import Public from '../Public'
import Private from '../Private'

const App = ({ history }) => {
   const session = cookie.loadAll()
   const authenticated = session.authenticated ? true : false

   const propsPublic = { history }
   const propsPrivate = { history }

   if (authenticated) {
      return <Private {...propsPrivate} />
   } else {
      return <Public {...propsPublic} />
   }
}

export default withRouter(App)
