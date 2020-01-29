import React from 'react'
import { useCookies } from 'react-cookie'

import constants from '../../../constants'

const Logout = ({ history }) => {
   const { routes } = constants
   const [removeCookie] = useCookies()

   removeCookie('authenticated')
   history.push(routes.root)

   return null
}

export default Logout
