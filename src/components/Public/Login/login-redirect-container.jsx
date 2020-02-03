import React from 'react'
import { useCookies } from 'react-cookie'

import constants from '../../../constants'

const LoginRedirect = ({ history }) => {
   const { routes } = constants
   const [cookies, setCookie] = useCookies(['session'])

   setCookie('session', true, { path: routes.root })

   history.push(routes.root)
}

export default LoginRedirect
