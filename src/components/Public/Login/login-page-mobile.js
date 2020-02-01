import React from 'react'
import { Button, Icon, Input, Typography } from '@34fame/ui-component-lib'

import LoginTemplate from './login-template'

const LoginPageMobile = ({
   firebase,
   firebaseUIConfig,
   mobile,
   handleChange,
   handleNext,
}) => {
   const propsLoginTemplate = {
      firebase,
      firebaseUIConfig,
      mobile,
      handleChange,
      handleNext,
      title: <Typography variant="h4">KeeperRx Lite</Typography>,
      input: (
         <Input
            color="primary"
            helperText="Please enter numbers only."
            label="Mobile Number"
            name="mobile"
            required
            value={mobile}
            variant="outlined"
            onChange={handleChange}
         />
      ),
      actions: [
         <Button
            id="next-button"
            color="primary"
            fullWidth
            icon={<Icon>keyboard_arrow_right</Icon>}
            iconEnd
            variant="contained"
            onClick={handleNext}
         >
            Next
         </Button>,
      ],
      message:
         'We did not recognize your device.  Please provide your mobile number and an authentication code will be sent immediately.',
   }

   return <LoginTemplate {...propsLoginTemplate} />
}

export default LoginPageMobile
