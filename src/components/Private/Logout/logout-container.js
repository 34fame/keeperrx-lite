import React from 'react'
import cookie from 'react-cookies'
import { Message } from '@34fame/ui-component-lib'

import constants from '../../../constants'

const Logout = ({ history }) => {
   const { routes } = constants

   cookie.remove('authenticated')
   history.push(routes.root)

   return (
      <Message
         severity="success"
         message="Logging out..."
         open
         autoHideDuration={3000}
      />
   )
}

export default Logout
