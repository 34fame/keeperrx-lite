import React from 'react'
import { Button, Icon, Input, Typography } from '@34fame/ui-component-lib'

import LoginTemplate from './login-template'

const LoginPageAuthCode = ({
   authCode,
   handleChange,
   handlePrevious,
   handleLogin,
}) => {
   const propsLoginTemplate = {
      authCode,
      handleChange,
      handlePrevious,
      handleLogin,
      title: <Typography variant="h4">KeeperRx Lite</Typography>,
      input: (
         <Input
            color="primary"
            helperText="Enter the number sent to your phone."
            label="Authorization Code"
            name="authCode"
            required
            value={authCode}
            variant="outlined"
            onChange={handleChange}
         />
      ),
      actions: [
         <Button
            color="default"
            fullWidth
            icon={<Icon>keyboard_arrow_left</Icon>}
            iconStart
            variant="text"
            onClick={handlePrevious}
         >
            Previous
         </Button>,
         <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={handleLogin}
         >
            Go!
         </Button>,
      ],
      message:
         'You should not be asked to authenticate from this browser on this device.',
   }

   return <LoginTemplate {...propsLoginTemplate} />
}

export default LoginPageAuthCode
