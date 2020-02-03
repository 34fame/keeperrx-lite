import React from 'react'
import PropTypes from 'prop-types'

import PrivateRoutes from './private-routes'

const Private = ({ history }) => {
   const propsPrivateRoutes = { history }

   return <PrivateRoutes {...propsPrivateRoutes} />
}

PrivateRoutes.propTypes = {
   history: PropTypes.object,
}

export default Private
