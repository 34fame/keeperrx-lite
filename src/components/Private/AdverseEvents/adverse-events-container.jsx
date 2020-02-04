import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'

import AdverseEventsPage from './adverse-events-page'

import constants from '../../../constants'

const AdverseEvents = ({ actions, history, state }) => {
   const { routes, services } = constants
   const { openfda } = services

   const { activeMenu, activeState } = state
   if (activeMenu !== 'adverseEvents' || activeState !== 'get') {
      history.push(routes.root)
   }

   const [cookies] = useCookies(['drugs'])
   const [drugs, setDrugs] = useState([])
   const [adverseEvents, setAdverseEvents] = useState({})

   useEffect(() => {
      handleDrugsGet()
   }, [])

   useEffect(() => {
      getAdverseEvents()
   }, [drugs])

   const handleDrugsGet = () => {
      let drugs = cookies.drugs
      setDrugs(drugs)
   }

   const callGetAdverseEvents = async rxcui => {
      const endpoint =
         openfda.adverseEventsByRxcuiInDateRange.endpoint
            .replace('%rxcui%', rxcui)
            .replace('%startYYYYMMDD%', '20190901')
            .replace('%endYYYYMMDD%', '20200101') + '&limit=99'
      let adverseEventsResult = {}
      await fetch(endpoint, openfda.adverseEventsByRxcui.payload)
         .then(response => response.json())
         .then(response => {
            adverseEventsResult.meta = response.meta
            if (!adverseEventsResult[rxcui]) {
               adverseEventsResult[rxcui] = []
            }
            response.results.map(event => {
               adverseEventsResult[rxcui].push(event)
            })
            return adverseEventsResult
         })
         .catch(err => {
            console.error('callGetAdverseEvents', 'error', err)
         })

      return adverseEventsResult
   }

   const getAdverseEvents = async () => {
      let adverseEventsResults = {}
      await Promise.all(
         drugs.map(async drug => {
            let adverseEventsResult = {}
            await callGetAdverseEvents(drug.rxcui).then(response => {
               adverseEventsResult.meta = response.meta
               adverseEventsResult[drug.rxcui] = response[drug.rxcui]
            })
            adverseEventsResults.meta = adverseEventsResult.meta
            adverseEventsResults[drug.rxcui] = adverseEventsResult[drug.rxcui]
            return
         })
      )
      setAdverseEvents(adverseEventsResults)
   }

   const propsAdverseEventsPage = {
      actions,
      history,
      state: {},
   }

   if (Object.keys(adverseEvents).length > 1) {
      propsAdverseEventsPage.state.adverseEvents = adverseEvents
   }

   return (
      <React.Fragment>
         <AdverseEventsPage {...propsAdverseEventsPage} />
      </React.Fragment>
   )
}

AdverseEvents.propTypes = {
   state: PropTypes.object,
}

export default AdverseEvents
