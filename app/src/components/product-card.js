import PropTypes from "prop-types"
import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProductCard = ({ node }) => {
  return (
    <div className=" bg-white shadow-lg rounded-lg md:mx-auto my-3 ">
     <GatsbyImage
          className="w-full h-80 rounded-t"
          image={getImage(node.Gallery)}
          alt={node.Slug}
        />{" "}
      <div className="flex items-start px-6 py-6">

        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 mt-1">
              {node.Name}
            </h2>
            <h2 className="text-lg font-semibold text-gray-900 mt-1"> {node.Price}£ </h2>
          </div>
          <p className=" py-4 text-gray-700"> {node.Description.substring(
              0,
              node.Description.length > 160 ? 160 : node.Description.length
            )}
            ... </p>
         
        </div>
      </div>
    </div>
  )
}
ProductCard.propTypes = {
  node: PropTypes.object.isRequired,
}
export default ProductCard
