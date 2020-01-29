import React from 'react'
import PropTypes from 'prop-types'

import HomeTemplate from './home-template'

const HomePage = ({ actions, content, menus }) => {
   const propsHomeTemplate = {
      actions,
      content,
      menus,
   }

   return <HomeTemplate {...propsHomeTemplate} />
}

HomePage.propTypes = {
   actions: PropTypes.shape({
      handleLogout: PropTypes.func.isRequired,
      handleMenuOpen: PropTypes.func.isRequired,
      handleMenuClose: PropTypes.func.isRequired,
   }).isRequired,
   content: PropTypes.node,
   menus: PropTypes.shape({
      mainMenu: PropTypes.shape({
         items: PropTypes.array,
         button: PropTypes.element,
      }).isRequired,
      profileMenu: PropTypes.shape({
         items: PropTypes.array,
         button: PropTypes.element,
      }).isRequired,
   }).isRequired,
}

export default HomePage
