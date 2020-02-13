import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import { useCookies } from 'react-cookie'

import AdverseEventsPage from './adverse-events-page'

import { getFirestoreObjects } from '../../../services/firebase'
import constants from '../../../constants'

const AdverseEvents = ({ history, state }) => {
   const { routes, services } = constants
   const { openfda } = services
   const [cookies] = useCookies('session')

   // const { activeMenu, activeState } = state
   // if (activeMenu !== 'adverseEvents' || activeState !== 'get') {
   //    history.push(routes.root)
   // }

   const [values, setValues] = useState({
      startDate: moment()
         .subtract(1, 'month')
         .format('YYYYMMDD'),
      endDate: moment().format('YYYYMMDD'),
      rxcui: '208149',
   })
   const [drugs, setDrugs] = useState([])
   const [adverseEvents, setAdverseEvents] = useState([])
   const [normalizedAdverseEvents, setNormalizedAdverseEvents] = useState({})
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      handleDrugsGet()
   }, [])

   useEffect(() => {
      setNormalizedAdverseEvents(scrubAdverseEvents())
      setLoading(false)
   }, [adverseEvents])

   const handleDrugsGet = async () => {
      if (!cookies.session) {
         return
      }

      let drugs = []
      let userSession = cookies.session
      let user = await getFirestoreObjects({
         collection: 'users',
         where: [['uid', '==', userSession.uid]],
      })

      if (user[0].drugs) {
         let userDrugs = user[0].drugs

         Object.keys(userDrugs).map(key => {
            drugs.push(userDrugs[key])
         })
      }
      setDrugs(drugs)
   }

   const scrubAdverseEvents = () => {
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
      return scrubbedAdverseEvents
   }

   const callGetAdverseEvents = async () => {
      setLoading(true)
      const { startDate, endDate, drug } = values
      const endpoint =
         openfda.adverseEventsByRxcuiInDateRange.endpoint
            .replace('%rxcui%', drug)
            .replace('%startYYYYMMDD%', startDate)
            .replace('%endYYYYMMDD%', endDate) + '&limit=99'
      let adverseEventsResult = {}
      await fetch(endpoint, openfda.adverseEventsByRxcui.payload)
         .then(response => response.json())
         .then(response => {
            if (response.error) {
               return []
            }
            adverseEventsResult.meta = response.meta
            if (!adverseEventsResult[drug]) {
               adverseEventsResult[drug] = []
            }
            response.results.map(event => {
               adverseEventsResult[drug].push(event)
            })
            return adverseEventsResult
         })
         .catch(err => {
            console.error('callGetAdverseEvents', 'error', err)
         })
      setAdverseEvents(adverseEventsResult)
   }

   const handleSearch = () => {
      callGetAdverseEvents()
   }

   const handleOnChange = (e, name) => {
      if (name) {
         if (name === 'startDate' || name === 'endDate') {
            setValues({
               ...values,
               [name]: moment(e).format('YYYYMMDD'),
            })
         }
      } else {
         const { name, value } = e.target
         console.log('e.target', e.target)
         setValues({
            ...values,
            [name]: value,
         })
      }
   }

   const propsAdverseEventsPage = {
      actions: {
         handleOnChange,
         handleSearch,
      },
      history,
      state: {
         drugs,
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
