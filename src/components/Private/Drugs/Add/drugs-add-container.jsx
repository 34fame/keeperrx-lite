import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import DrugsAddPage from './drugs-add-page'

import {
   getFirestoreObjects,
   saveFirestoreObject,
} from '../../../../services/firebase'
import { logEvent } from '../../../../core'
import constants from '../../../../constants'

const DrugsAdd = ({ actions, history, state }) => {
   const { routes, services } = constants
   const { rxnav } = services

   const { setActiveState } = actions
   const { activeMenu, activeState } = state

   if (activeMenu !== 'drugs' || activeState !== 'add') {
      history.push(routes.root)
   }

   const [cookies] = useCookies('session')
   const [loading, setLoading] = useState(false)
   const [fuzzySearch, setFuzzySearch] = useState('')
   const [fuzzySuggestions, setFuzzySuggestions] = useState([])
   const [nameSelected, setNameSelected] = useState(true)
   const [drugConcept, setDrugConcept] = useState('')
   const [drugConceptOptions, setDrugConceptOptions] = useState([])
   const [drugConceptSelected, setDrugConceptSelected] = useState(false)
   const [allowCustomDrug, setAllowCustomDrug] = useState(false)

   // fuzzySearch
   useEffect(() => {
      if (fuzzySearch.length === 0) {
         setFuzzySuggestions([])
         setNameSelected(true)
      } else {
         callFuzzySearch(fuzzySearch).then(response => {
            if (!Array.isArray(response)) {
               return
            }

            setFuzzySuggestions(response)
         })
      }
   }, [fuzzySearch])

   const callFuzzySearch = async name => {
      setLoading(true)
      const endpoint = rxnav.fuzzySearch.endpoint.replace('%name%', name)
      let fuzzySearchResults = []
      await fetch(endpoint, rxnav.fuzzySearch.payload)
         .then(response => response.json())
         .then(response => {
            fuzzySearchResults =
               response.suggestionGroup.suggestionList.suggestion
         })
         .catch(err => {
            console.error('callFuzzySearch', 'error', err)
         })
         .finally(() => setLoading(false))
      return fuzzySearchResults
   }

   const handleFuzzySearchChange = e => {
      const { value } = e.target
      setFuzzySearch(value)
      setNameSelected(false)
      setDrugConceptSelected(false)
   }

   const handleClickFuzzySuggestion = (e, value) => {
      if (!value) {
         return
      }

      setFuzzySuggestions([])
      setFuzzySearch(value)
      setNameSelected(true)
   }

   // conceptSearch
   useEffect(() => {
      if (!nameSelected) {
         return
      }
      callDrugConceptsSearch(fuzzySearch).then(response => {
         if (!Array.isArray(response)) {
            return
         }

         let items = response.map((item, idx) => {
            item = {
               key: { idx },
               name: item.name,
               value: item,
            }
            return item
         })
         setDrugConceptOptions(items)
      })
   }, [nameSelected])

   const callDrugConceptsSearch = async name => {
      if (!name || name.length === 1) {
         return null
      }

      const endpoint = rxnav.drugConceptSearch.endpoint.replace('%name%', name)
      let drugConceptResults = []
      await fetch(endpoint, rxnav.drugConceptSearch.payload)
         .then(response => response.json())
         .then(response => {
            let conceptGroups = response.drugGroup.conceptGroup
            conceptGroups.map(group => {
               if (group.conceptProperties) {
                  group.conceptProperties.map(property => {
                     drugConceptResults.push(property)
                     return property
                  })
               }
            })
         })
         .catch(err => {
            console.error('callDrugConceptsSearch', 'error', err)
         })

      return drugConceptResults
   }

   const handleDrugConceptChange = e => {
      const { value } = e.target
      setDrugConcept(value)
      setDrugConceptSelected(true)
   }

   const handleAllowCustomCheckbox = () => {
      setAllowCustomDrug(!allowCustomDrug)
   }

   const handleCancel = () => {
      setActiveState('get')
      history.push(routes.drugs)
   }

   const saveToDatabase = async drug => {
      const userSession = cookies.session
      let document = {
         uid: userSession.uid,
         ['drugs.' + [drug.rxcui]]: drug,
      }

      // avoid duplicate entries
      let user = await getFirestoreObjects({
         collection: 'users',
         where: [['uid', '==', userSession.uid]],
      })
      if (user[0].drugs && user[0].drugs[drug.rxcui]) {
         return true
      }

      await saveFirestoreObject({
         collection: 'users',
         document,
         method: 'update',
      })
         .then(result => {
            logEvent({
               eventType: 'add-drug',
               perpetratorId: userSession.uid,
               targetId: userSession.uid,
               details: drug,
            })
            return result
         })
         .catch(err => {
            console.log('drugs-add-container', 'saveToDatabase', 'err', err)
            logEvent({
               severity: 'error',
               eventType: 'add-drug',
               perpetratorId: userSession.uid,
               targetId: userSession.uid,
               success: false,
               details: drug,
            })
            return false
         })
   }

   const handleSave = async () => {
      let newDrug = {
         rxcui: drugConcept.rxcui,
         textPrimary: fuzzySearch,
         textSecondary: drugConcept.name,
         include: true,
      }

      await saveToDatabase(newDrug).then(() => {
         setActiveState('get')
         history.push(routes.drugs)
      })
   }

   const propsDrugsAddPage = {
      actions: {
         handleAllowCustomCheckbox,
         handleFuzzySearchChange,
         handleDrugConceptChange,
         handleClickFuzzySuggestion,
         handleCancel,
         handleSave,
         setActiveState,
      },
      state: {
         allowCustomDrug,
         fuzzySearch,
         fuzzySuggestions,
         loading,
         nameSelected,
         drugConcept,
         drugConceptOptions,
         drugConceptSelected,
      },
   }

   return <DrugsAddPage {...propsDrugsAddPage} />
}

DrugsAdd.propTypes = {
   history: PropTypes.object,
}

export default DrugsAdd
