import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Drawer = ({ siteTitle }) => {
  const [isOpen, setMenuOpen] = React.useState(false)
  const data = useStaticQuery(graphql`
    query {
      allStrapiCategory {
        nodes {
          Slug
          Name
        }
      }
    }
  `)
  const { allStrapiCategory: node } = data

  return (
    <>
      <div className="flex flex-col w-full md:w-64 text-gray-700 bg-gray-100   flex-shrink-0">
        <div className="flex-shrink-0 px-8 py-4 flex flex-row   items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded focus:outline-none focus:shadow-outline"
          >
            {siteTitle}
          </Link>
          <button
            onClick={() => setMenuOpen(!isOpen)}
            className="rounded md:hidden rounded focus:outline-none focus:shadow-outline"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path
                className={isOpen ? " hidden" : " flex"}
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
              <path
                className={!isOpen ? " hidden" : " flex"}
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <nav
          className={`flex-grow   md:block px-4 pb-4 md:pb-0 md:overflow-y-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link
            className="block mt-8 px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded   hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            activeClassName="bg-gray-300 text-gray-900 "

            to="/"
          >
            Categories
          </Link>

          {node.nodes.map((category, i) => (
            <Link
              key={i}
              className="block px-4 pl-8 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded   hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              activeClassName="bg-gray-300 text-gray-900 "
              to={`/category/${category.Slug}`}
            >
              {category.Name}
            </Link>
          ))}

          <Link
            className="block mt-8 px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded   hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            activeClassName="bg-gray-300 text-gray-900 "
            to="/product-archive"
          >
            Products
          </Link>
        </nav>
      </div>
    </>
  )
}

Drawer.propTypes = {
  siteTitle: PropTypes.string,
}

Drawer.defaultProps = {
  siteTitle: ``,
}

export default Drawer
