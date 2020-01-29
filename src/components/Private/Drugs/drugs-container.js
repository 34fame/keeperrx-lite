import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'

import DrugsPage from './drugs-page'

const Drugs = ({ history }) => {
   const [cookies, setCookie, removeCookie] = useCookies(['drugs'])
   const [contentBarDisplayOption, setContentBarDisplayOption] = useState(
      'list'
   )
   const [contentBarSearchTerm, setContentBarSearchTerm] = useState('')
   const [drugs, setDrugs] = useState([])

   useEffect(() => {
      handleDrugsGet()
   }, [])

   const handleContentBarDisplayClick = name => {
      setContentBarDisplayOption(name)
   }

   const handleContentBarSearchChange = e => {
      const { value } = e.target
      setContentBarSearchTerm(value)
   }

   const handleClickAddDrug = () => {}

   const handleDrugsDelete = () => {}

   const handleDrugsDetail = () => {}

   const handleDrugsGet = () => {
      if (cookies.drugs && cookies.drugs.length > 0) {
         setDrugs(cookies.drugs)
      }
   }

   const propsDrugsPage = {
      actions: {
         handleContentBarDisplayClick,
         handleContentBarSearchChange,
         handleClickAddDrug,
         handleDrugsDelete,
         handleDrugsDetail,
      },
      state: {
         contentBarDisplayOption,
         contentBarSearchTerm,
         drugs,
      },
   }

   return <DrugsPage {...propsDrugsPage} />
}

Drugs.propTypes = {
   history: PropTypes.object,
}

export default Drugs
