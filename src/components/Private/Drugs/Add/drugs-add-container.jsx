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
      console.log('useEffect', 'fuzzySearch', fuzzySearch)
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
      console.log('callFuzzySearch', 'name', name)
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
      console.log('handleFuzzySearchChange', 'value', value)
      setFuzzySearch(value)
      setNameSelected(false)
      setDrugConceptSelected(false)
   }

   const handleClickFuzzySuggestion = (e, value) => {
      console.log('handleClickFuzzySuggestion', 'value', value)
      if (!value) {
         return
      }

      setFuzzySuggestions([])
      setFuzzySearch(value)
      setNameSelected(true)
   }

   // conceptSearch
   useEffect(() => {
      console.log('useEffect', 'nameSelected', nameSelected)
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
      console.log('callDrugConceptsSearch', 'name', name)
      if (!name || name.length === 1) {
         return null
      }

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
                     return property
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
      console.log('handleDrugConceptChange', 'value', value)
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

   const handleSave = () => {
      let drug = {}
      drug.rxcui = drugConcept.rxcui
      drug.textPrimary = fuzzySearch
      drug.textSecondary = drugConcept.name
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