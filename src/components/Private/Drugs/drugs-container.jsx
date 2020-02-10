import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import { useCookies } from 'react-cookie'

import DrugsPage from './drugs-page'

import {
   getFirestoreObjects,
   saveFirestoreObject,
} from '../../../services/firebase'
import constants from '../../../constants'

const Drugs = ({ actions, history, state }) => {
   const { routes } = constants

   const { activeMenu, activeState } = state
   const { handleAddClick, setActiveState } = actions

   if (activeMenu !== 'drugs' || activeState !== 'get') {
      history.push(routes.root)
   }

   const [cookies] = useCookies(['session'])
   const [
      contentToolbarDisplaySetting,
      setContentToolbarDisplaySetting,
   ] = useState('grid')
   const [contentToolbarSearchTerm, setContentToolbarSearchTerm] = useState('')
   const [drugs, setDrugs] = useState([])
   const [drugsFiltered, setDrugsFiltered] = useState([])
   const [expanded] = useState(false)

   useEffect(() => {
      handleDrugsGet()
   }, [])

   useEffect(() => {
      if (contentToolbarSearchTerm.length === 0) {
         setDrugsFiltered(drugs)
      } else {
         let filtered = drugs.filter(drug => {
            if (
               drug.textPrimary
                  .toLowerCase()
                  .includes(contentToolbarSearchTerm.toLowerCase()) ||
               drug.textSecondary
                  .toLowerCase()
                  .includes(contentToolbarSearchTerm.toLowerCase())
            ) {
               return true
            }
         })
         setDrugsFiltered(filtered)
      }
   }, [contentToolbarSearchTerm])

   const handleContentToolbarDisplayClick = name => {
      setContentToolbarDisplaySetting(name)
   }

   const handleContentToolbarSearchChange = e => {
      const { value } = e.target
      setContentToolbarSearchTerm(value)
   }

   const removeFromDatabase = async (uid, drugs) => {
      let document = {
         uid,
         drugs,
      }

      await saveFirestoreObject({
         collection: 'users',
         document,
         method: 'update',
      })
         .then(result => {
            return result
         })
         .catch(err => {
            console.log('drugs-add-container', 'saveToDatabase', 'err', err)
            return false
         })
   }

   const handleDrugsDelete = async rxcui => {
      let userSession = cookies.session
      let user = await getFirestoreObjects({
         collection: 'users',
         where: [['uid', '==', userSession.uid]],
      })

      if (user[0] && user[0].drugs) {
         let currentDrugs = user[0].drugs
         delete currentDrugs[rxcui]
         await removeFromDatabase(userSession.uid, currentDrugs)
      }

      handleDrugsGet()
   }

   const handleDrugsDetail = () => {}

   const handleDrugsGet = async () => {
      let userSession = cookies.session
      let user = await getFirestoreObjects({
         collection: 'users',
         where: [['uid', '==', userSession.uid]],
      })
      let userDrugs = user[0].drugs

      let drugs = []
      Object.keys(userDrugs).map(key => {
         drugs.push(userDrugs[key])
      })

      if (drugs && _.isArray(drugs)) {
         setDrugs(drugs)
         setDrugsFiltered(drugs)
      }
   }

   const propsDrugsPage = {
      actions: {
         handleAddClick,
         handleContentToolbarDisplayClick,
         handleContentToolbarSearchChange,
         handleDrugsDelete,
         handleDrugsDetail,
         setActiveState,
      },
      state: {
         contentToolbarDisplaySetting,
         contentToolbarSearchTerm,
         drugs: drugsFiltered.length > 0 ? drugsFiltered : drugs,
         expanded,
      },
   }

   return <DrugsPage {...propsDrugsPage} />
}

Drugs.propTypes = {
   history: PropTypes.object,
}

export default Drugs
