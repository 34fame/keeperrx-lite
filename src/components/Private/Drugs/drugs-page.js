import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Empty, Icon, List } from '@34fame/ui-component-lib'

import DrugsTemplate from './drugs-template'

import constants from '../../../constants'

const DrugsPage = ({ actions, state }) => {
   const { drugs } = state
   const { baseUrl } = constants.services.aws.s3
   const { images } = constants

   let content = null

   if (drugs.length > 0) {
      let drugItems = drugs.map(item => {
         let drugItem = {}
         let avatar = <Avatar>{item.textPrimary}</Avatar>
         if (images[item.rxcui]) {
            avatar = (
               <Avatar
                  alt={item.textPrimary}
                  src={baseUrl + images[item.rxcui]._120}
               />
            )
         }
         drugItem.avatar = avatar
         drugItem.textPrimary = item.textPrimary
         drugItem.textSecondary = item.textSecondary
         drugItem.divider = true
         drugItem.secondaryAction = (
            <Button color="default" icon={<Icon>more_vert</Icon>} />
         )
         return drugItem
      })
      content = <List items={drugItems} />
   } else {
      content = (
         <Empty
            description="You have no drugs saved.  Click ADD A DRUG to get started."
            descriptionVariant="body2"
         />
      )
   }

   const propsDrugsTemplate = { actions, content, state }

   return (
      <React.Fragment>
         <DrugsTemplate {...propsDrugsTemplate} />
      </React.Fragment>
   )
}

export default DrugsPage
