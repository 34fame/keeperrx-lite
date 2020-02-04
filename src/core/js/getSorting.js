import { sortDesc } from '../../core'

const getSorting = (order, orderBy) => {
   return order === 'desc'
      ? (a, b) => sortDesc(a, b, orderBy)
      : (a, b) => -sortDesc(a, b, orderBy)
}

export default getSorting
