import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Drawer from "./drawer"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen   w-full ">
      <Drawer siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="px-6 pb-12">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
