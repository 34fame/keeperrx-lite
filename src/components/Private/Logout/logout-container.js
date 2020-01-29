import React from 'react'
import { useCookies } from 'react-cookie'

import constants from '../../../constants'

const Logout = ({ history }) => {
   const { routes } = constants
   const [cookies, setCookie, removeCookie] = useCookies(['authenticated'])

   removeCookie('authenticated', { path: '/' })
   history.push(routes.root)

   return null
}

export default Logout
