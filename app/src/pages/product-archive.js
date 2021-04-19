import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import ProductCard from "../components/product-card"
import SEO from "../components/seo"

const ProductPage = () => {
  const data = useStaticQuery(query)
  const { allStrapiProduct: products } = data
  return (
    <Layout>
      <SEO title="Product Archive" />
      <main className="grid md:gap-4  lg:gap-6 md:grid-cols-1 lg:grid-cols-2  my-8">
      {products.edges.map(product => (
          <ProductCard key={product.node.id} node={product.node} />
        ))}
      </main>
    </Layout>
  )
}
const query = graphql`
  query {
    allStrapiProduct {
      edges {
        node {
          Gallery {
            childImageSharp {
              gatsbyImageData(width: 520)
            }
          }
          Name
          Price
          Slug
          id
          Description
        }
      }
    }
  }
`

export default ProductPage
