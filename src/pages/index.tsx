import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const instagramPosts = data.allInstaNode.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article className="mb-6" key={node.fields.slug}>
            <header>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  <h2>
                    {title}
                  </h2>
                </Link>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}

      < hr />
      <div>
      {instagramPosts.map((post, i) =>
          <img key={i} src={post.thumbnails[1].src} />
      )}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
      allInstaNode(filter: {thumbnails: {elemMatch: {}}}, limit: 12, sort: {fields: timestamp, order: DESC}) {
      nodes {
        thumbnails {
          src
        }
      }
    }
  }
`
