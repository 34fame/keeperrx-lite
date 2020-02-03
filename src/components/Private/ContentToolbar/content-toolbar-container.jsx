import React from 'react'

import ContentToolbarPage from './content-toolbar-page'

const ContentToolbar = ({ actions, state }) => {
   const propsContentToolbarPage = { actions, state }

   return <ContentToolbarPage {...propsContentToolbarPage} />
}

export default ContentToolbar
