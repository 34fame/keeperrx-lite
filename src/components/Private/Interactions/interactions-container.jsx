import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'

import InteractionsPage from './interactions-page'

import constants from '../../../constants'

const Interactions = ({ actions, history, state }) => {
   const { routes, services } = constants
   const { rxnav } = services

   const { setActiveState } = actions
   const { activeMenu, activeState } = state
   if (activeMenu !== 'interactions' || activeState !== 'get') {
      history.push(routes.root)
   }

   const [cookies, setCookie] = useCookies(['drugs'])
   const [drugs, setDrugs] = useState([])
   const [interactions, setInteractions] = useState({})

   useEffect(() => {
      handleDrugsGet()
   }, [])

   useEffect(() => {
      callGetInteractions()
   }, [drugs])

   const handleDrugsGet = () => {
      let drugs = cookies.drugs
      let drugsObject = {}
      if (drugs && Array.isArray(drugs)) {
         drugs.map(drug => {
            drugsObject[drug.rxcui] = {}
            drugsObject[drug.rxcui].name = drug.textPrimary
            drugsObject[drug.rxcui].include = drug.include
         })
         console.log(
            'interactions-container',
            'handleDrugsGet',
            'drugsObject',
            drugsObject
         )
         setDrugs(drugsObject)
      }
   }

   const callGetInteractions = async () => {
      let drugList = ''
      Object.keys(drugs).map(rxcui => {
         if (drugs[rxcui].include) {
            drugList =
               drugList.length === 0 ? drugList + rxcui : drugList + '+' + rxcui
         }
      })
      console.log(
         'interactions-container',
         'callGetInteractions',
         'drugList',
         drugList
      )

      const endpoint = rxnav.interactionsList.endpoint.replace(
         '%list%',
         drugList
      )
      console.log(
         'interactions-container',
         'callGetInteractions',
         'endpoint',
         endpoint
      )
      let interactionsResult = {}
      await fetch(endpoint, rxnav.interactionsList.payload)
         .then(response => response.json())
         .then(response => {
            interactionsResult = response
         })
         .catch(err => {
            console.error('callGetInteractions', 'error', err)
         })
      console.log(
         'interactions-container',
         'callGetInteractions',
         'interactionsResult',
         interactionsResult
      )
      setInteractions(interactionsResult)
   }

   //
   // We can set it so that when only one drug is included we can do the single drug interaction instead
   //
   const handleDrugsToggle = rxcui => {
      let drugsUpdated = drugs
      console.log(
         'interactions-container',
         'handleDrugsToggle',
         'drugsUpdated[rxcui] -- before',
         drugsUpdated[rxcui]
      )
      drugsUpdated[rxcui].include = !drugsUpdated[rxcui].include
      console.log(
         'interactions-container',
         'handleDrugsToggle',
         'drugsUpdated[rxcui] -- after',
         drugsUpdated[rxcui]
      )
      setDrugs(drugsUpdated)

      drugsUpdated = cookies.drugs
      drugsUpdated.map(drug => {
         if (drug.rxcui === rxcui) {
            drug.include = !drug.include
            return drug
         }
      })
      setCookie('drugs', drugsUpdated, { path: '/' })

      console.log(
         'interactions-container',
         'handleDrugsToggle',
         'cookie-drugs',
         cookies.drugs
      )

      callGetInteractions()
   }

   const propsInteractionsPage = {
      actions: { handleDrugsToggle },
      state: {
         drugs,
         interactions,
      },
   }

   return (
      <React.Fragment>
         <InteractionsPage {...propsInteractionsPage} />
      </React.Fragment>
   )
}

export default Interactions
