import moment from 'moment'

const sortByDate = (a, b) => moment(a, 'x') - moment(b, 'x')

const getDayForEvent = event => {
   return moment(event.item.timestamp, 'x')
      .startOf('day')
      .format(moment.defaultFormat)
}

const groupByDay = events => {
   const groups = events.reduce((days, event) => {
      const day = getDayForEvent(event)
      if (!days[day]) {
         days[day] = []
      }
      days[day] = days[day].concat(event)
      return days
   }, {})
   return {
      days: Object.keys(groups).sort(sortByDate),
      eventsByDay: groups,
   }
}

export default groupByDay
