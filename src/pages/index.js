import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { rhythm } from '../utils/typography'

const Heading = styled.h2`
  margin-bottom: ${rhythm(1 / 4)};

  transform: scale(1);
  transition: transform ease-in-out 200ms;

  &:hover {
    transform: scale(1.01);
  }
`

const BlogIndex = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <Helmet>
        <link rel="canonical" href="https://splotch.dev" />
      </Helmet>
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const pluralMinutes = node.timeToRead > 1

        return (
          <div key={node.fields.slug}>
            <Heading>
              <Link to={node.fields.slug} title={title}>
                {title}
              </Link>
            </Heading>
            <small>{`${node.frontmatter.date} • ${node.timeToRead} minute${
              pluralMinutes ? 's' : ''
            }`}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })}
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
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
