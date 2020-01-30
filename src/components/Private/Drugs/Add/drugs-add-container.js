import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import DrugsAddPage from './drugs-add-page'

import constants from '../../../../constants'
import { sortObjectArray } from '../../../../core'

const DrugsAdd = ({ actions, history, state }) => {
   const { routes, services } = constants
   const { rxnav } = services

   const { setActiveState } = actions
   const { activeMenu, activeState } = state

   if (activeMenu !== 'drugs' || activeState !== 'add') {
      history.push(routes.root)
   }

   const [cookies, setCookie] = useCookies()
   const [fuzzySearch, setFuzzySearch] = useState('')
   const [fuzzySuggestions, setFuzzySuggestions] = useState([])
   const [nameSelected, setNameSelected] = useState(true)
   const [drugConcept, setDrugConcept] = useState(null)
   const [drugConceptOptions, setDrugConceptOptions] = useState([])
   const [drugConceptSelected, setDrugConceptSelected] = useState(false)

   // fuzzySearch
   useEffect(() => {
      if (fuzzySearch.length === 0) {
         setFuzzySuggestions([])
         setNameSelected(true)
         return
      }
      callFuzzySearch(fuzzySearch).then(response => {
         if (!Array.isArray(response)) {
            return
         }

         let items = response.map(item => {
            item = {
               button: true,
               textPrimary: item,
               onClick: () => handleClickFuzzySuggestion(item),
            }
            return item
         })
         setFuzzySuggestions(items)
      })
   }, [fuzzySearch])

   const callFuzzySearch = async name => {
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
      return fuzzySearchResults
   }

   const handleFuzzySearchChange = e => {
      const { value } = e.target
      setFuzzySearch(value)
      setNameSelected(false)
      setDrugConceptSelected(false)
   }

   const handleClickFuzzySuggestion = item => {
      setFuzzySuggestions([])
      setFuzzySearch(item.textPrimary)
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

         let items = response.map(item => {
            item = {
               name: item.synonym ? item.synonym : item.name,
               value: item,
            }
            return item
         })
         setDrugConceptOptions(items)
      })
   }, [nameSelected])

   const callDrugConceptsSearch = async name => {
      const endpoint = rxnav.drugConceptSearch.endpoint.replace('%name%', name)
      let drugConceptResults = []
      await fetch(endpoint, rxnav.drugConceptSearch.payload)
         .then(response => response.json())
         .then(response => {
            console.log(
               'drugs-add-container',
               'callDrugConceptsSearch',
               'response',
               response
            )
            let conceptGroups = response.drugGroup.conceptGroup
            conceptGroups.map(group => {
               console.log('group', group)
               let properties = []
               if (group.conceptProperties) {
                  properties = group.conceptProperties.map(property => {
                     console.log('property', property)
                     drugConceptResults.push(property)
                  })
               }
               console.log('properties', properties)
            })
         })
         .catch(err => {
            console.error('callDrugConceptsSearch', 'error', err)
         })

      console.log(
         'drugs-add-container',
         'callDrugConceptsSearch',
         'drugConceptResults',
         drugConceptResults
      )
      return drugConceptResults
   }

   const handleDrugConceptChange = e => {
      const { value } = e.target
      setDrugConcept(value)
      setDrugConceptSelected(true)
   }

   // save
   const handleSave = () => {
      let drug = {}
      drug.rxcui = drugConcept.rxcui
      drug.textPrimary = fuzzySearch
      drug.textSecondary =
         drugConcept.synonym.length > 0 ? drugConcept.synonym : drugConcept.name
      drug.include = true

      let drugs = cookies.drugs ? cookies.drugs : []
      drugs.push(drug)
      drugs = sortObjectArray(drugs, 'drugs')

      setCookie('drugs', drugs, { path: '/' })

      setActiveState('get')

      history.push(routes.drugs)
   }

   const propsDrugsAddPage = {
      actions: {
         handleFuzzySearchChange,
         handleDrugConceptChange,
         handleSave,
         setActiveState,
      },
      state: {
         fuzzySearch,
         fuzzySuggestions,
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
