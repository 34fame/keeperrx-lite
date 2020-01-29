import React from 'react'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Public from '../Public'
import Private from '../Private'

const App = ({ history }) => {
   const [cookies, setCookie, removeCookie] = useCookies([
      'authenticated',
      'drugs',
   ])
   const authenticated = cookies.authenticated ? true : false

   if (!cookies.drugs) {
      setCookie('drugs', [
         {
            textPrimary: 'Zoloft',
            textSecondary: 'Sertraline 100 MG Oral Tablet [Zoloft]',
            rxcui: '208149',
         },
         {
            textPrimary: 'Armour Thyroid',
            textSecondary: 'thyroid (USP) 30 MG Oral Tablet [Armour Thyroid]',
            rxcui: '208535',
         },
         {
            textPrimary: 'Phentermine',
            textSecondary:
               'Phentermine Hydrochloride 37.5 MG Oral Capsule [Adipex-P]',
            rxcui: '803350',
         },
      ])
   }

   const propsPublic = { history }
   const propsPrivate = { history }

   if (authenticated) {
      return <Private {...propsPrivate} />
   } else {
      return <Public {...propsPublic} />
   }
}

export default withRouter(App)
