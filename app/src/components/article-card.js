import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import PropTypes from "prop-types"
import React from "react"

const ArticleCard = ({ node }) => {
  return (
    <div className=" bg-white shadow-lg rounded-lg md:mx-auto my-3 ">
      <Link to={`/article/${node.Slug}`}>
        <GatsbyImage
          className="w-full h-80 rounded-t"
          image={getImage(node.Thumbnail)}
          alt={node.Slug}
        />
      </Link>
      <div className="flex items-start px-6 py-6">
        <div>
          <GatsbyImage
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            image={getImage(node.author.Image)}
            alt={node.author.Name}
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 mt-1">
              {node.Title}
            </h2>
          </div>
          <p className="text-gray-700"> {node.created_at} </p>
          <p className="mt-3 text-gray-700 text-sm">
            {node.Content.substring(
              0,
              node.Content.length > 160 ? 160 : node.Content.length
            )}
            ...
          </p>
        </div>
      </div>
    </div>
  )
}
ArticleCard.propTypes = {
  node: PropTypes.object.isRequired,
}

export default ArticleCard
