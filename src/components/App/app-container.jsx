import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { firebaseAuth, saveFirestoreObject } from '../../services/firebase'
import { LoadingPage } from '../../core'
import Public from '../Public'
import Private from '../Private'

import { logEvent } from '../../core'
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

   const saveUserToDatabase = async session => {
      await saveFirestoreObject({
         collection: 'users',
         document: session,
         method: 'update',
      })
         .then(result => {
            return result
         })
         .catch(err => {
            console.log('app-container', 'saveUserToDatabase', 'err', err)
            return false
         })
   }

   const initSession = async session => {
      let userSession = session.providerData[0]
      userSession.lastSignInTime = session.metadata.lastSignInTime
      await saveUserToDatabase(userSession)
      setCookie('session', userSession, { path: routes.root })
      removeCookie('authenticating', { path: '/' })
      logEvent({
         eventType: 'login',
         perpetratorId: userSession.uid,
         targetId: userSession.uid,
         details: userSession,
      })
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
