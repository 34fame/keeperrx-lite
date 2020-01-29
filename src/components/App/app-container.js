import React from 'react'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Public from '../Public'
import Private from '../Private'

const App = ({ history }) => {
   const [cookies] = useCookies(['authenticated'])
   const authenticated = cookies.authenticated ? true : false

   const propsPublic = { history }
   const propsPrivate = { history }

   if (authenticated) {
      return <Private {...propsPrivate} />
   } else {
      return <Public {...propsPublic} />
   }
}

export default withRouter(App)
