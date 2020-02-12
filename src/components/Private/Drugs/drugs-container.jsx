import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import { useCookies } from 'react-cookie'

import DrugsPage from './drugs-page'

import {
   getFirestoreObjects,
   saveFirestoreObject,
} from '../../../services/firebase'
import { logEvent } from '../../../core'

const Drugs = ({ actions }) => {
   const { handleAddClick, setActiveState } = actions
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
      handleSetUserPreferences()
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

   const handleSetUserPreferences = async () => {
      const userSession = cookies.session
      await getFirestoreObjects({
         collection: 'users',
         where: [['uid', '==', userSession.uid]],
      }).then(users => {
         setContentToolbarDisplaySetting(users[0].preferences.contentToolbar)
      })
   }

   const handleContentToolbarDisplayClick = async name => {
      const userSession = cookies.session
      const document = {
         uid: userSession.uid,
         'preferences.contentToolbar': name,
      }
      await saveFirestoreObject({
         collection: 'users',
         document,
         method: 'update',
      })
      setContentToolbarDisplaySetting(name)
   }

   const handleContentToolbarSearchChange = e => {
      const { value } = e.target
      setContentToolbarSearchTerm(value)
   }

   const removeFromDatabase = async (uid, drugs, removedDrug) => {
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
            logEvent({
               eventType: 'remove-drug',
               perpetratorId: uid,
               targetId: uid,
               details: removedDrug,
            })
            return result
         })
         .catch(err => {
            console.log('drugs-add-container', 'saveToDatabase', 'err', err)
            logEvent({
               severity: 'error',
               eventType: 'remove-drug',
               perpetratorId: uid,
               targetId: uid,
               success: false,
               details: removedDrug,
            })
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
         let removedDrug = currentDrugs[rxcui]
         delete currentDrugs[rxcui]
         await removeFromDatabase(userSession.uid, currentDrugs, removedDrug)
      }

      handleDrugsGet()
   }

   const handleDrugsGet = async () => {
      if (!cookies.session) {
         return
      }

      let drugs = []
      let userSession = cookies.session
      let user = await getFirestoreObjects({
         collection: 'users',
         where: [['uid', '==', userSession.uid]],
      })

      if (user[0].drugs) {
         let userDrugs = user[0].drugs

         Object.keys(userDrugs).map(key => {
            drugs.push(userDrugs[key])
         })
      }
      setDrugs(drugs)
      setDrugsFiltered(drugs)
   }

   const propsDrugsPage = {
      actions: {
         handleAddClick,
         handleContentToolbarDisplayClick,
         handleContentToolbarSearchChange,
         handleDrugsDelete,
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
