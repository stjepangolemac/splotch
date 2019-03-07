import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import CoverImage from '../components/CoverImage'
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

  & a:only-child {
    background-image: unset;

    &:hover,
    &:focus {
      backgroundsize: 'unset';
    }
  }

  & hr {
    margin: 0 ${rhythm(2)} ${rhythm(1)} ${rhythm(2)};
  }
`
const Hr = styled.hr`
  margin: 0 ${rhythm(2)} ${rhythm(1)} ${rhythm(2)};
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
          {...post.frontmatter.cover}
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          alt={post.frontmatter.coverAlt}
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
            <CoverImage image={post.frontmatter.cover} />
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
        description
        coverAlt
        date(formatString: "MMMM D, YYYY")
        cover {
          ...SEOImage
          ...CoverImage
        }
      }
    }
  }
`
