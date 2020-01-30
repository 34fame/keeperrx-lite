import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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

   const [cookies] = useCookies(['drugs'])
   const [contentBarDisplayOption, setContentBarDisplayOption] = useState(
      'list'
   )
   const [contentBarSearchTerm, setContentBarSearchTerm] = useState('')
   const [drugs, setDrugs] = useState([])
   const [drugsFiltered, setDrugsFiltered] = useState([])

   useEffect(() => {
      handleDrugsGet()
   }, [])

   useEffect(() => {
      if (contentBarSearchTerm.length === 0) {
         setDrugsFiltered(drugs)
      } else {
         let filtered = drugs.filter(drug => {
            if (
               drug.textPrimary
                  .toLowerCase()
                  .includes(contentBarSearchTerm.toLowerCase()) ||
               drug.textSecondary
                  .toLowerCase()
                  .includes(contentBarSearchTerm.toLowerCase())
            ) {
               return true
            }
         })
         setDrugsFiltered(filtered)
      }
   }, [contentBarSearchTerm])

   const handleContentBarDisplayClick = name => {
      setContentBarDisplayOption(name)
   }

   const handleContentBarSearchChange = e => {
      const { value } = e.target
      setContentBarSearchTerm(value)
   }

   const handleDrugsDelete = () => {}

   const handleDrugsDetail = () => {}

   const handleDrugsGet = () => {
      let drugs = cookies.drugs
      if (drugs && Array.isArray(drugs)) {
         setDrugs(drugs)
         setDrugsFiltered(drugs)
      }
   }

   const propsDrugsPage = {
      actions: {
         handleAddClick,
         handleContentBarDisplayClick,
         handleContentBarSearchChange,
         handleDrugsDelete,
         handleDrugsDetail,
         setActiveState,
      },
      state: {
         contentBarDisplayOption,
         contentBarSearchTerm,
         drugs: drugsFiltered.length > 0 ? drugsFiltered : drugs,
      },
   }

   return <DrugsPage {...propsDrugsPage} />
}

Drugs.propTypes = {
   history: PropTypes.object,
}

export default Drugs
