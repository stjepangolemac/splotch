import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { rhythm, scale } from '../utils/typography'

const Description = styled.p`
  margin-top: ${rhythm(-0.5)};

  color: hsla(0, 0%, 54%, 1);
`
const Date = styled.p`
  display: block;

  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-0.5)};

  ${scale(-1 / 5)};
`
const StyledImage = styled(Image)`
  margin: ${rhythm(1.5)}
    calc(-1 * ((100vw - ${rhythm(24)}) / 2) - ${rhythm(3 / 4)});

  @media screen and (max-width: ${rhythm(24)}) {
    margin: ${rhythm(1.5)} -${rhythm(3 / 4)};
  }
`
const Content = styled.div`
  & img[src$='gif'] {
    width: 100%;
    padding: 0 30%;

    @media screen and (max-width: ${rhythm(16)}) {
      padding: unset;
    }
  }

  & pre {
    margin-bottom: ${rhythm(1)};
  }
`
const Hr = styled.hr`
  margin-bottom: ${rhythm(1)};
`
const RecommendedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const pluralMinutes = post.timeToRead > 1
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <Description>{post.frontmatter.description}</Description>
            <Date>
              {`${post.frontmatter.date} • ${post.timeToRead} minute${
                pluralMinutes ? 's' : ''
              }`}
            </Date>
          </header>
          {post.frontmatter.cover && (
            <>
              <a href={post.frontmatter.cover.publicURL}>
                <StyledImage
                  fluid={post.frontmatter.cover.childImageSharp.fluid}
                />
              </a>
            </>
          )}
          <Content dangerouslySetInnerHTML={{ __html: post.html }} />
          <Hr />
          <footer>
            <Bio />
          </footer>
        </article>

        <RecommendedList>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </RecommendedList>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      timeToRead
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        description
        cover {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1440, quality: 100, srcSetBreakpoints:[200, 340, 520, 890, 1440, 1920, 2560, 3840]) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
