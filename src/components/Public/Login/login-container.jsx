import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import LoginPage from './login-page'

import {
   firebaseAuth,
   facebookProvider,
   githubProvider,
   googleProvider,
} from '../../../services/firebase'

import constants from '../../../constants'

const Login = ({ history }) => {
   const [cookies, setCookie, removeCookie] = useCookies()
   const { routes } = constants

   useEffect(() => {
      firebaseAuth().onAuthStateChanged(session => {
         if (session) {
            initSession(session)
         }
      })
   }, [])

   const initSession = session => {
      setCookie('session', session, { path: routes.root })
   }

   const handleLoginWithFacebook = () => {
      firebaseAuth().signInWithRedirect(facebookProvider)
   }

   const handleLoginWithGithub = () => {
      firebaseAuth().signInWithRedirect(githubProvider)
   }

   const handleLoginWithGoogle = () => {
      firebaseAuth().signInWithRedirect(googleProvider)
   }

   const propsLoginPage = {
      providers: {
         handleLoginWithFacebook,
         handleLoginWithGithub,
         handleLoginWithGoogle,
      },
   }

   return <LoginPage {...propsLoginPage} />
}
export default Login
