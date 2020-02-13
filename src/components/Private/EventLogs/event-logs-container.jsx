import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useCookies } from 'react-cookie'

import EventLogsPage from './event-logs-page'
import { LoadingPage } from '../../../core'

import { getFirestoreObjects } from '../../../services/firebase'
import { groupByDay } from '../../../core'
import constants from '../../../constants'

const EventLogs = ({ history, state }) => {
   const { routes } = constants
   const [cookies] = useCookies('session')
   const userSession = cookies.session
   const { activeMenu, activeState } = state
   const [eventEntries, setEventEntries] = useState([])
   const [normalizedEntries, setNormalizedEntries] = useState([])
   const [startAt, setStartAt] = useState(null)
   const [limit, setLimit] = useState(5)
   const [loading, setLoading] = useState(true)

   if (activeMenu !== 'eventLogs' || activeState !== 'get') {
      history.push(routes.root)
   }

   useEffect(() => {
      handleSetUserPreferences()
      callGetEventEntries()
   }, [])

   useEffect(() => {
      scrubEventEntries(eventEntries).then(entries => {
         if (entries && entries.length > 0 && entries[0]) {
            setNormalizedEntries(entries)
         }
      })
   }, [eventEntries])

   useEffect(() => {
      setLoading(false)
      // sessionStorage.removeItem('cache')
   }, [normalizedEntries])

   const { days, eventsByDay } = groupByDay(normalizedEntries)

   const handleSetUserPreferences = async () => {
      const userSession = cookies.session
      await getFirestoreObjects({
         collection: 'users',
         where: [['uid', '==', userSession.uid]],
      }).then(users => {
         setLimit(users[0].preferences.maxLimit)
      })
   }

   const callGetEventEntries = async () => {
      setLoading(true)
      let events = await getFirestoreObjects({
         collection: 'eventLogs',
         where: [['targetId', '==', userSession.uid]],
         orderBy: [['timestamp', 'desc']],
         limit: limit,
         startAt,
      })
      if (events.length === limit) {
         setStartAt(events[events.length - 1])
      }
      if (startAt > 0 && eventEntries.length > 0) {
         events.concat(eventEntries)
      }
      setEventEntries(events)
   }

   const formatEventEntry = entry => {
      let relativeTime = moment(entry.item.timestamp, 'x').fromNow()
      switch (entry.item.eventType) {
         case 'login':
            entry.phrase = entry.item.success
               ? entry.perpetrator.displayName + ' logged in ' + relativeTime
               : entry.perpetrator.displayName +
                 ' attempted to login ' +
                 relativeTime
            break
         case 'add-drug':
            entry.phrase = entry.item.success
               ? entry.perpetrator.displayName +
                 ' added the drug ' +
                 entry.item.details.textPrimary +
                 ' ' +
                 relativeTime
               : entry.perpetrator.displayName +
                 ' attempted to add the drug ' +
                 entry.item.details.textPrimary +
                 ' ' +
                 relativeTime
            break
         case 'remove-drug':
            entry.phrase = entry.item.success
               ? entry.perpetrator.displayName +
                 ' removed the drug ' +
                 entry.item.details.textPrimary +
                 ' ' +
                 relativeTime
               : entry.perpetrator.displayName +
                 ' attempted to remove the drug ' +
                 ' ' +
                 entry.item.details.textPrimary +
                 relativeTime
            break
         default:
      }
      return entry
   }

   const getUserDetails = async entry => {
      entry = {
         item: entry,
      }
      let uid = entry.item.perpetratorId

      let cache = JSON.parse(sessionStorage.getItem('cache'))
      if (!cache) {
         cache = {}
      }

      if (cache[uid]) {
         entry.perpetrator = cache[uid]
      } else {
         let users = await getFirestoreObjects({
            collection: 'users',
            where: [['uid', '==', uid]],
         })
         let user = users[0]
         cache[uid] = user
         sessionStorage.setItem('cache', JSON.stringify(cache))
         entry.perpetrator = user
      }

      return formatEventEntry(entry)
   }

   const scrubEventEntries = async eventEntries => {
      return Promise.all(eventEntries.map(entry => getUserDetails(entry)))
   }

   const handleLoadMore = () => {
      callGetEventEntries()
   }

   const propsLoadingPage = {
      open: loading ? true : false,
      message: 'Loading events...',
   }

   const propsEventLogsPage = {
      state: {
         loading,
         days,
         eventsByDay,
         total: normalizedEntries.length,
         handleLoadMore,
      },
   }

   if (loading) {
      return <LoadingPage {...propsLoadingPage} />
   } else {
      return <EventLogsPage {...propsEventLogsPage} />
   }
}

export default EventLogs
