import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cookie from 'react-cookies'
import { Message } from '@34fame/ui-component-lib'

import LoginPageMobile from './login-page-mobile'
import LoginPageAuthCode from './login-page-authcode'

import constants from '../../../constants'

const Login = ({ history }) => {
   const [activeStep, setActiveStep] = useState(0)
   const [values, setValues] = useState('')
   const [showMessage, setShowMessage] = useState(false)
   const { routes } = constants

   const propsLoginPageMobile = {
      mobile: values.mobile,
      handleChange: e => handleChange(e),
      handleNext: () => handleNext(),
   }

   const propsLoginPageAuthCode = {
      authCode: values.authCode,
      handleChange: e => handleChange(e),
      handlePrevious: () => handlePrevious(),
      handleLogin: () => handleLogin(),
   }

   const handleMessageClose = (e, reason) => {
      if (reason === 'clickaway') {
         return
      }

      setShowMessage(false)
   }

   const handleNext = () => {
      setActiveStep(activeStep + 1)
      setShowMessage(true)
   }

   const handlePrevious = () => {
      setActiveStep(activeStep - 1)
   }

   const handleChange = e => {
      let { name, value } = e.target
      setValues({
         ...values,
         [name]: value,
      })
   }

   const handleLogin = () => {
      cookie.save('authenticated', true)
      history.push(routes.home)
   }

   return (
      <React.Fragment>
         {activeStep === 0 && <LoginPageMobile {...propsLoginPageMobile} />}
         {activeStep === 1 && <LoginPageAuthCode {...propsLoginPageAuthCode} />}
         <Message
            anchorOriginString="hcvt"
            autoHideDuration="3000"
            message="Please check your phone for an authorization code."
            open={showMessage}
            severity="success"
            variant="filled"
            onClose={handleMessageClose}
         />
      </React.Fragment>
   )
}

Login.propTypes = {
   history: PropTypes.object,
}

export default Login
