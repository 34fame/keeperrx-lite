import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Icon, Input, Typography } from '@34fame/ui-component-lib'

import LoginTemplate from './login-template'

const LoginPageMobile = ({ mobile, handleChange, handleNext }) => {
   const { register, handleSubmit, watch, error } = useForm()
   return (
      <LoginTemplate
         title={<Typography variant="h4">KeeperRx Lite</Typography>}
         input={
            <Input
               inputRef={register({ required: true })}
               color="primary"
               helperText="Please enter numbers only."
               label="Mobile Number"
               name="mobile"
               required
               value={mobile}
               variant="outlined"
               onChange={handleChange}
            />
         }
         actions={[
            <Button
               color="primary"
               fullWidth
               icon={<Icon>keyboard_arrow_right</Icon>}
               iconEnd
               variant="contained"
               onClick={handleSubmit(handleNext)}
            >
               Next
            </Button>,
         ]}
         message="We did not recognize your device.  Please provide your mobile number and an authentication code will be sent immediately."
      />
   )
}

export default LoginPageMobile
