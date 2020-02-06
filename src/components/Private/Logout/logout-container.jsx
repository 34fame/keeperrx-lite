import { useCookies } from 'react-cookie'
import { firebaseAuth } from '../../../services/firebase'

import constants from '../../../constants'

const Logout = ({ history }) => {
   const { routes } = constants
   const [cookies, setCookie, removeCookie] = useCookies(['authenticated'])

   firebaseAuth()
      .signOut()
      .then(() => {
         removeCookie('session', { path: '/' })
         history.push(routes.root)
      })

   return null
}

export default Logout
