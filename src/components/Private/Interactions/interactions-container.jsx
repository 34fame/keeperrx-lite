import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'

import InteractionsPage from './interactions-page'

import constants from '../../../constants'

const Interactions = ({ actions, history, state }) => {
   const { routes, services } = constants
   const { rxnav } = services

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
      let endpoint = ''
      let payload = ''

      if (drugs.length === 0) {
         return
      }

      if (drugs.length === 1) {
         endpoint = rxnav.interaction.endpoint.replace(
            '%rxcui%',
            drugs[0].rxcui
         )
         payload = rxnav.interaction.payload
      } else {
         let drugList = ''
         Object.keys(drugs).map(rxcui => {
            if (drugs[rxcui].include) {
               drugList =
                  drugList.length === 0
                     ? drugList + rxcui
                     : drugList + '+' + rxcui
            }
         })
         endpoint = rxnav.interactionsList.endpoint.replace('%list%', drugList)
         payload = rxnav.interactionsList.payload
      }

      let interactionsResult = {}
      await fetch(endpoint, payload)
         .then(response => response.json())
         .then(response => {
            interactionsResult = response
         })
         .catch(err => {
            console.error('callGetInteractions', 'error', err)
         })

      setInteractions(interactionsResult)
   }

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

   return <InteractionsPage {...propsInteractionsPage} />
}

export default Interactions
