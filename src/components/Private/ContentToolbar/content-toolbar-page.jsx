import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FilterList from '@material-ui/icons/FilterList'
import SearchIcon from '@material-ui/icons/Search'
import ViewModule from '@material-ui/icons/ViewModule'
import ViewList from '@material-ui/icons/ViewList'

import ContentToolbarTemplate from './content-toolbar-template'

const ContentToolbarPage = ({ actions, state }) => {
   const {
      handleContentToolbarDisplayClick,
      handleContentToolbarSearchChange,
   } = actions

   const { contentToolbarDisplaySetting, contentToolbarSearchTerm } = state

   const cardViewButton = (
      <IconButton
         color={contentToolbarDisplaySetting === 'grid' ? 'primary' : 'default'}
         onClick={() => handleContentToolbarDisplayClick('grid')}
      >
         <ViewModule />
      </IconButton>
   )

   const listViewButton = (
      <IconButton
         color={contentToolbarDisplaySetting === 'list' ? 'primary' : 'default'}
         onClick={() => handleContentToolbarDisplayClick('list')}
      >
         <ViewList />
      </IconButton>
   )

   const searchField = (
      <Input
         name="search"
         startAdornment={<SearchIcon />}
         value={contentToolbarSearchTerm}
         variant="outlined"
         onChange={handleContentToolbarSearchChange}
      />
   )

   const filterButton = (
      <IconButton>
         <FilterList />
      </IconButton>
   )

   const propsContentToolbarTemplate = {
      state: {
         cardViewButton,
         listViewButton,
         searchField,
         filterButton,
      },
   }

   return <ContentToolbarTemplate {...propsContentToolbarTemplate} />
}

ContentToolbarPage.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default ContentToolbarPage
