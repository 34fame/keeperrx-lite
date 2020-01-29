import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import Login from './Login'

import constants from '../../constants'

const PublicRoutes = ({ history }) => {
   const { routes } = constants
   const propsLogin = { history }

   return (
      <Switch>
         <Route path={routes.login} render={() => <Login {...propsLogin} />} />
         <Redirect to={routes.login} />
      </Switch>
   )
}

PublicRoutes.propTypes = {
   history: PropTypes.object,
}

export default PublicRoutes
