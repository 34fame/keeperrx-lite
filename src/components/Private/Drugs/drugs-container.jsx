import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import { useCookies } from 'react-cookie'

import DrugsPage from './drugs-page'

import constants from '../../../constants'

const Drugs = ({ actions, history, state }) => {
   const { routes } = constants

   const { activeMenu, activeState } = state
   const { handleAddClick, setActiveState } = actions

   if (activeMenu !== 'drugs' || activeState !== 'get') {
      history.push(routes.root)
   }

   const [cookies, setCookie] = useCookies(['drugs'])
   const [
      contentToolbarDisplaySetting,
      setContentToolbarDisplaySetting,
   ] = useState('list')
   const [contentToolbarSearchTerm, setContentToolbarSearchTerm] = useState('')
   const [drugs, setDrugs] = useState([])
   const [drugsFiltered, setDrugsFiltered] = useState([])

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

   const handleDrugsDelete = rxcui => {
      let drugs = cookies.drugs
      let result = _.filter(drugs, drug => {
         return drug.rxcui !== rxcui
      })

      setCookie('drugs', result, { path: '/' })

      handleDrugsGet(result)
   }

   const handleDrugsDetail = () => {}

   const handleDrugsGet = drugs => {
      if (!drugs) {
         drugs = cookies.drugs
      }
      console.log('drugs-container', 'handleDrugsGet', 'drugs', drugs)
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
      },
   }

   return <DrugsPage {...propsDrugsPage} />
}

Drugs.propTypes = {
   history: PropTypes.object,
}

export default Drugs
