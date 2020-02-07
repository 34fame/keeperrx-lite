import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { firebaseAuth } from '../../services/firebase'
import { LoadingPage } from '../../core'
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
         console.log('app-container', 'onAuthStateChanged', 'session', session)
         if (session) {
            initSession(session)
         } else {
            removeCookie('authenticating', { path: '/' })
         }
      })

      if (authenticated) {
         setCookie('authenticating', true, { path: '/' })
      }
   }, [authenticated])

   const initSession = session => {
      setCookie('session', session, { path: routes.root })
      removeCookie('authenticating', { path: '/' })
   }

   const propsLoadingPage = {
      open: authenticating ? true : false,
      message: 'Logging in...',
   }
   if (cookies.authenticating) {
      return <LoadingPage {...propsLoadingPage} />
   }

   if (authenticated) {
      return <Private {...propsPrivate} />
   }

   return <Public {...propsPublic} />
}

export default withRouter(App)
