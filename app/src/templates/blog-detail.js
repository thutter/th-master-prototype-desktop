import React from "react"
import Markdown from "react-markdown"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query ArticleQuery($Slug: String!) {
    strapiArticle(Slug: { eq: $Slug }) {
      Thumbnail {
        childImageSharp {
          gatsbyImageData(width: 1050)
        }
      }
      Title
      Slug
      categories {
        Name
        Slug
      }
      author {
        Image {
          childImageSharp {
            gatsbyImageData(width: 150)
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
`

const BlogDetail = ({ data }) => {
  const article = data.strapiArticle
  console.log(article)
  return (
    <Layout>
      <SEO title="Blog Archive" />

      <main className="mt-10">
        <div
          className="mb-4 md:mb-0 w-full  mx-auto relative"
          style={{ height: "30em" }}
        >
          <div
            className="absolute left-0 bottom-0 w-full h-full z-10"
            style={{
              backgroundImage:
                "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
            }}
          ></div>
          <GatsbyImage
            className="absolute left-0 top-0 w-full h-full z-0 object-cover object-bottom"
            image={getImage(article.Thumbnail)}
            alt={article.Slug}
          />

          <div className="p-4 absolute bottom-0 left-0 z-20">
            {article.categories.map((category, i) => (
              <Link
                key={i}
                className="px-4 mr-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
                to={`/category/${category.Slug}`}
              >
                {category.Name}
              </Link>
            ))}

            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
              {article.Title}
            </h2>
            <div className="flex mt-3">
              <GatsbyImage
                className="h-10 w-10 rounded-full mr-2 object-cover"
                image={getImage(article.author.Image)}
                alt={article.Slug}
              />
              <div>
                <p className="font-semibold text-gray-200 text-sm">
                  {article.author.Name}
                </p>
                <p className="font-semibold text-gray-400 text-xs">
                  {article.created_at}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 px-4 lg:px-0 mt-12 text-gray-700  mx-auto text-lg leading-relaxed">
          <Markdown source={article.Content} escapeHtml={false} />
        </div>
      </main>
    </Layout>
  )
}

export default BlogDetail
