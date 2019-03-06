import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

import { rhythm } from '../../utils/typography'

const Container = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
`
const StyledImage = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 50px;
  border-radius: 100%;
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata

        return (
          <Container>
            <StyledImage
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              Written by <strong>{author}</strong> who lives and works in
              London. Usually does React but very interested in cloud native
              development and machine learning too.
              {` `}
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href={`https://twitter.com/${social.twitter}`}
              >
                You can follow me on Twitter
              </a>
            </p>
          </Container>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
