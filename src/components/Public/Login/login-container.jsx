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
   const [cookies, setCookie, removeCookie] = useCookies('authenticating')
   const { routes } = constants

   // useEffect(() => {
   //    firebaseAuth().onAuthStateChanged(session => {
   //       console.log(
   //          'login-container',
   //          'onAuthStateChanged',
   //          'session',
   //          session
   //       )
   //       if (session) {
   //          initSession(session)
   //       }
   //    })
   // }, [])

   const handleLoginWithFacebook = () => {
      setCookie('authenticating', true, { path: '/' })
      firebaseAuth().signInWithRedirect(facebookProvider)
   }

   const handleLoginWithGithub = () => {
      setCookie('authenticating', true, { path: '/' })
      firebaseAuth().signInWithRedirect(githubProvider)
   }

   const handleLoginWithGoogle = () => {
      setCookie('authenticating', true, { path: '/' })
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
