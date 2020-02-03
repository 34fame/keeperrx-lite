import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { firebaseAuth } from '../../services/firebase'
import AppPage from './app-page'
import Public from '../Public'
import Private from '../Private'

import constants from '../../constants'

library.add(fab)

const App = ({ history }) => {
   const [cookies, setCookie, removeCookie] = useCookies(['session', 'drugs'])
   const authenticating = cookies.authenticating ? true : false
   const authenticated = cookies.session ? true : false
   const { routes } = constants

   const propsPublic = { history }
   const propsPrivate = { history }

   useEffect(() => {
      firebaseAuth().onAuthStateChanged(session => {
         console.log(
            'login-container',
            'onAuthStateChanged',
            'session',
            session
         )
         if (session) {
            initSession(session)
         }
      })

      if (authenticated) {
         setCookie('authenticating', true, { path: '/' })
      }
   }, [authenticated])

   useEffect(() => {
      console.log('App', 'authenticating', authenticating)
   }, [authenticating])

   const initSession = session => {
      setCookie('session', session, { path: routes.root })
      removeCookie('authenticating', { path: '/' })
   }

   if (cookies.authenticating) {
      return <AppPage open={authenticating} />
   }

   if (authenticated) {
      return <Private {...propsPrivate} />
   }

   return <Public {...propsPublic} />
}

export default withRouter(App)
