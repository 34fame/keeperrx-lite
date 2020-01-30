import React from 'react'
import PropTypes from 'prop-types'

import InteractionsTemplate from './interactions-template'

const InteractionsPage = ({ actions, state }) => {
   const propsInteractionsTemplate = { actions, state }

   console.log(
      'interactions.page',
      'drugs',
      state.drugs,
      'interactions',
      state.interactions
   )
   return <InteractionsTemplate {...propsInteractionsTemplate} />
}

export default InteractionsPage
