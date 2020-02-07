import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import { useCookies } from 'react-cookie'

import AdverseEventsPage from './adverse-events-page'

import constants from '../../../constants'

const AdverseEvents = ({ history, state }) => {
   const { routes, services } = constants
   const { openfda } = services

   const { activeMenu, activeState } = state
   if (activeMenu !== 'adverseEvents' || activeState !== 'get') {
      history.push(routes.root)
   }

   const [values, setValues] = useState({
      startDate: '20191001',
      endDate: moment().format('YYYYMMDD'),
      rxcui: '208149',
   })
   const [adverseEvents, setAdverseEvents] = useState([])
   const [normalizedAdverseEvents, setNormalizedAdverseEvents] = useState({})
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      setNormalizedAdverseEvents(scrubAdverseEvents())
      setLoading(false)
   }, [adverseEvents])

   const scrubAdverseEvents = () => {
      console.log(
         'adverse-events-container',
         'scrubAdverseEvents',
         'adverseEvents',
         adverseEvents
      )
      if (_.pull(Object.keys(adverseEvents), 'meta').length !== 1) {
         return
      }

      let rxcui = _.pull(Object.keys(adverseEvents), 'meta')[0]

      let scrubbedAdverseEvents = {
         meta: {
            disclaimer: adverseEvents.meta.disclaimer,
            results: adverseEvents.meta.results,
         },
         events: [],
      }

      adverseEvents[rxcui].map(event => {
         let scrubbedEvent = {
            dateRecieved: event.receivedate,
            occurCountry: event.occurcountry,
            receivingOrg: event.receiver.receiverorganization,
            reaction: [],
            takenWith: [],
         }
         event.patient.reaction.map(reaction => {
            scrubbedEvent.reaction.push(reaction.reactionmeddrapt + ', ')
         })
         event.patient.drug.map(drug => {
            scrubbedEvent.takenWith.push(drug.medicinalproduct + ', ')
         })
         scrubbedAdverseEvents.events.push(scrubbedEvent)
      })
      console.log(
         'adverse-events-container',
         'scrubAdverseEvents',
         'scrubbedAdverseEvents',
         scrubbedAdverseEvents
      )
      return scrubbedAdverseEvents
   }

   const callGetAdverseEvents = async () => {
      setLoading(true)
      const { startDate, endDate, rxcui } = values
      const endpoint =
         openfda.adverseEventsByRxcuiInDateRange.endpoint
            .replace('%rxcui%', rxcui)
            .replace('%startYYYYMMDD%', startDate)
            .replace('%endYYYYMMDD%', endDate) + '&limit=99'
      let adverseEventsResult = {}
      await fetch(endpoint, openfda.adverseEventsByRxcui.payload)
         .then(response => response.json())
         .then(response => {
            console.log('response', response)
            if (response.error) {
               return []
            }
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
      console.log(
         'adverse-events-container',
         'callGetAdverseEvents',
         'adverseEventsResult',
         adverseEventsResult
      )
      setAdverseEvents(adverseEventsResult)
   }

   const handleOnChange = e => {
      const { name, value } = e.target

      setValues({
         ...values,
         [name]: value,
      })
   }

   const handleSearch = () => {
      callGetAdverseEvents()
   }

   const propsAdverseEventsPage = {
      actions: {
         handleOnChange,
         handleSearch,
      },
      history,
      state: {
         loading,
         adverseEvents: normalizedAdverseEvents,
         values,
      },
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
