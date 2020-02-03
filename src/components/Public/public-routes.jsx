import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import Login from './Login'
import LoginRedirect from './Login/login-redirect-container'

import constants from '../../constants'

const PublicRoutes = ({ history }) => {
   const { routes } = constants

   const propsLogin = { history }
   const propsLoginRedirect = { history }

   return (
      <Switch>
         <Route
            exact
            path={routes.login}
            render={() => <Login {...propsLogin} />}
         />
         <Route
            exact
            path={routes.loginRedirect}
            render={() => <LoginRedirect {...propsLoginRedirect} />}
         />
         <Redirect to={routes.login} />
      </Switch>
   )
}

PublicRoutes.propTypes = {
   history: PropTypes.object,
}

export default PublicRoutes
