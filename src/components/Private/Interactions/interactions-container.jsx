import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import InteractionsPage from './interactions-page'

import {
   getFirestoreObjects,
   saveFirestoreObject,
} from '../../../services/firebase'
import { LoadingPage } from '../../../core'
import constants from '../../../constants'

const Interactions = ({ history, state }) => {
   const { routes, services } = constants
   const { rxnav } = services

   const { activeMenu, activeState } = state
   if (activeMenu !== 'interactions' || activeState !== 'get') {
      history.push(routes.root)
   }

   const [cookies, setCookie] = useCookies(['session'])
   const [drugs, setDrugs] = useState([])
   const [interactions, setInteractions] = useState({})
   const [normalizedInteractions, setNormalizedInteractions] = useState({
      nlmDisclaimer: '',
      interactions: [],
   })
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      handleDrugsGet()
   }, [])

   useEffect(() => {
      setLoading(true)
      callGetInteractions()
   }, [drugs])

   useEffect(() => {
      if (Object.keys(interactions) === 0) {
         return
      }
      let scrubbingInteractions = {}
      if (Object.keys(interactions).includes('fullInteractionTypeGroup')) {
         scrubbingInteractions = scrubInteractions(
            'fullInteractionTypeGroup',
            interactions
         )
      } else if (Object.keys(interactions).includes('interactionTypeGroup')) {
         scrubbingInteractions = scrubInteractions(
            'interactionTypeGroup',
            interactions
         )
      }

      setNormalizedInteractions(scrubbingInteractions)
      setLoading(false)
   }, [interactions])

   const scrubInteractions = (groupType, interactions) => {
      if (
         groupType !== 'fullInteractionTypeGroup' &&
         groupType !== 'interactionTypeGroup'
      ) {
         return []
      }

      let groupInteractionType = 'interactionType'
      if (groupType === 'fullInteractionTypeGroup') {
         groupInteractionType = 'fullInteractionType'
      }

      let scrubbedInteractions = {
         nlmDisclaimer: interactions.nlmDisclaimer,
         interactions: [],
      }
      interactions[groupType].map(group => {
         let source = group.sourceName
         group[groupInteractionType].map(type => {
            type.interactionPair.map(pair => {
               let drug1 = pair.interactionConcept[0].minConceptItem.name
               let drug2 = pair.interactionConcept[1].minConceptItem.name
               let severity = pair.severity
               let description = pair.description
               let scrubPair = {
                  source,
                  drug1,
                  drug2,
                  severity,
                  description,
               }
               scrubbedInteractions.interactions.push(scrubPair)
            })
         })
      })
      return scrubbedInteractions
   }

   const handleDrugsGet = async () => {
      let userSession = cookies.session
      let user = await getFirestoreObjects({
         collection: 'users',
         where: [['uid', '==', userSession.uid]],
      })
      let userDrugs = user[0].drugs

      setDrugs(userDrugs)
   }

   const callGetInteractions = async () => {
      let endpoint = ''
      let payload = ''

      let includedDrugs = {}
      Object.keys(drugs).map(drug => {
         if (drugs[drug].include === true) {
            includedDrugs[drug] = drugs[drug]
         }
      })

      if (Object.keys(includedDrugs).length === 0) {
         return
      }

      if (Object.keys(includedDrugs).length === 1) {
         endpoint = rxnav.interaction.endpoint.replace(
            '%rxcui%',
            Object.keys(includedDrugs)[0]
         )
         payload = rxnav.interaction.payload
      } else {
         let drugList = ''
         Object.keys(includedDrugs).map(rxcui => {
            if (includedDrugs[rxcui].include) {
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

   const handleDrugsToggle = async rxcui => {
      setLoading(true)
      let drugsUpdated = drugs
      drugsUpdated[rxcui].include = !drugsUpdated[rxcui].include
      setDrugs(drugsUpdated)

      let userSession = cookies.session
      let document = {
         uid: userSession.uid,
         drugs: drugsUpdated,
      }
      await saveFirestoreObject({ collection: 'users', document })

      callGetInteractions()
   }

   const propsLoadingPage = {
      open: loading,
      message: 'Loading drug interactions...',
   }

   const propsInteractionsPage = {
      actions: { handleDrugsToggle },
      state: {
         drugs,
         interactions: normalizedInteractions,
         loading,
      },
   }

   if (loading) {
      return <LoadingPage {...propsLoadingPage} />
   } else {
      return <InteractionsPage {...propsInteractionsPage} />
   }
}

export default Interactions
