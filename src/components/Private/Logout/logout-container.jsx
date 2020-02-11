import { useCookies } from 'react-cookie'
import { firebaseAuth } from '../../../services/firebase'

import { logEvent } from '../../../core'
import constants from '../../../constants'

const Logout = ({ history }) => {
   const { routes } = constants
   const [cookies, setCookie, removeCookie] = useCookies(['session'])

   const userSession = cookies.session

   firebaseAuth()
      .signOut()
      .then(() => {
         removeCookie('session', { path: '/' })
         sessionStorage.clear()
         history.push(routes.root)
      })
      .catch(err => {
         logEvent({
            severity: 'error',
            eventType: 'logout',
            perpetratorId: userSession.uid,
            targetId: userSession.uid,
            success: false,
            details: err,
         })
      })

   return null
}

export default Logout
