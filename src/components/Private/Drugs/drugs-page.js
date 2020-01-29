import React from 'react'
import PropTypes from 'prop-types'
import { Button, Empty, Icon, List } from '@34fame/ui-component-lib'

import DrugsTemplate from './drugs-template'

const DrugsPage = ({ actions, state }) => {
   const { handleDrugsDelete } = actions
   const { drugs, drugMenuItems } = state

   let content = null

   console.log('drugs-page', 'drugs', drugs)

   if (drugs.length > 0) {
      let drugItems = drugs.map(item => {
         let drugItem = {}
         drugItem.textPrimary = item.textPrimary
         drugItem.textSecondary = item.textSecondary
         drugItem.divider = true
         drugItem.secondaryAction = (
            <Button color="default" icon={<Icon>more_vert</Icon>} />
         )
         return drugItem
      })

      content = <List items={drugItems} style={{ minWidth: '400px' }} />
   } else {
      content = (
         <Empty
            image="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
            description="No Data"
            descriptionVariant="caption"
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
