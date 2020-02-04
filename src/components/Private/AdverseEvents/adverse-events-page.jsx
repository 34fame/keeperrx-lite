import React from 'react'
import PropTypes from 'prop-types'

import AdverseEventsTemplate from './adverse-events-template'

const AdverseEventsPage = ({ actions, state }) => {
   const propsAdverseEventsTemplate = { actions, state }

   return <AdverseEventsTemplate {...propsAdverseEventsTemplate} />
}

AdverseEventsPage.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default AdverseEventsPage
