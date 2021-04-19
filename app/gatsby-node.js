/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        articles: allStrapiArticle {
          edges {
            node {
              id
              Slug
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              Name
              Slug
              id
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const articles = result.data.articles.edges
  const categories = result.data.categories.edges

  const ArticleTemplate = require.resolve("./src/templates/blog-detail.js")

  articles.forEach((article, index) => {
    createPage({
      path: `/article/${article.node.Slug}`,
      component: ArticleTemplate,
      context: {
        Slug: article.node.Slug,
      },
    })
  })
  const CategoryTemplate = require.resolve("./src/templates/category.js");

  categories.forEach((category, index) => {
    createPage({
      path: `/category/${category.node.Slug}`,
      component: CategoryTemplate,
      context: {
        Slug: category.node.Slug,
      },
    });
  });
}



module.exports.onCreateNode = async ({ node, actions, createNodeId }) => {
  const crypto = require(`crypto`)

  if (node.internal.type === "StrapiArticle") {
    const newNode = {
      id: createNodeId(`StrapiArticleContent-${node.id}`),
      parent: node.id,
      children: [],
      internal: {
        content: node.content || " ",
        type: "StrapiArticleContent",
        mediaType: "text/markdown",
        contentDigest: crypto
          .createHash("md5")
          .update(node.content || " ")
          .digest("hex"),
      },
    }
    actions.createNode(newNode)
    actions.createParentChildLink({
      parent: node,
      child: newNode,
    })
  }
}
