import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from './Header.jsx';
import './index.css'
import './MainContent.scss';

const TemplateWrapper = ({ children }) => (
  <div>

    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />

    <Header />

    <div className={'main-content'}>
      {children()}
    </div>
    
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
