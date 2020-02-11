import moment from 'moment'
import { saveFirestoreObject } from '../../services/firebase'

const logEvent = async props => {
   const {
      severity = 'info',
      eventType,
      perpetratorId,
      targetId,
      success = true,
      details = {},
   } = props

   const timestamp = moment().format('x')

   const document = {
      timestamp,
      severity,
      eventType,
      perpetratorId,
      targetId,
      success,
      details,
   }

   if (eventType !== 'login') {
      await saveFirestoreObject({
         collection: 'eventLogs',
         document,
         method: 'add',
      })
   }
}

export default logEvent
