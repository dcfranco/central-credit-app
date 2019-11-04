import React from 'react'
import PropTypes from 'prop-types'
import { ModuleTemplate } from 'components'

const { Layout } = ModuleTemplate

const CompanyContainer = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

CompanyContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CompanyContainer
