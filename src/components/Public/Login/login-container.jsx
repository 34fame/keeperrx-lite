import React from 'react'
import { useCookies } from 'react-cookie'

import LoginPage from './login-page'

import {
   firebaseAuth,
   facebookProvider,
   githubProvider,
   googleProvider,
} from '../../../services/firebase'

const Login = ({ history }) => {
   const [cookies, setCookie] = useCookies('authenticating')

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
