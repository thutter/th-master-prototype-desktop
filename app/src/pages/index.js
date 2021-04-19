import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import ArticleCard from "../components/article-card"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(query)
  const { allStrapiArticle: articles } = data
  return (
    <Layout>
      <SEO title="Home" />
      <main className="grid md:gap-4  lg:gap-6 md:grid-cols-1 lg:grid-cols-2  my-8">
        {articles.edges.map(article => (
          <ArticleCard key={article.node.id} node={article.node} />
        ))}
      </main>
    </Layout>
  )
}

const query = graphql`
  query {
    allStrapiArticle {
      edges {
        node {
          Thumbnail {
            childImageSharp {
              gatsbyImageData(width: 520)
            }
          }
          Title
          Slug
          author {
            Image {
              childImageSharp {
                gatsbyImageData
              }
            }
            Name
          }
          created_at(formatString: "L")
          Description
          id
          Content
        }
      }
    }
  }
`
export default IndexPage
