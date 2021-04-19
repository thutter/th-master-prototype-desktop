import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import ArticleCard from "../components/article-card"
import SEO from "../components/seo"

export const query = graphql`
  query Category($Slug: String!) {
    articles: allStrapiArticle(
      filter: { categories: { elemMatch: { Slug: { eq: $Slug } } } }
    ) {
      edges { 
        node {
          Slug
          Title
          Content
          categories {
            Name
          }
          Thumbnail {
            childImageSharp {
              gatsbyImageData(width: 520)
            }
          }
          author {
            Image {
              childImageSharp {
                gatsbyImageData(width: 150)
              }
            }
            Name
          }
        }
      }
    }
    category: strapiCategory(Slug: { eq: $Slug }) {
      Name
    }
  }
`

const IndexPage = ({ data }) => {
  const articles = data.articles.edges
  const category = data.category.name
  return (
    <Layout>
      <SEO title={`Category ${category}`} />
      <main className="grid md:gap-4  lg:gap-6 md:grid-cols-1 lg:grid-cols-2  my-8">
        {articles.map(article => (
          <ArticleCard key={article.node.id} node={article.node} />
        ))}
      </main>
    </Layout>
  )
}

export default IndexPage
