import React from 'react'
import PropTypes from 'prop-types'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { rhythm } from '../utils/typography'

const StyledImage = styled(Image)`
  margin: ${rhythm(1.5)}
    calc(-1 * ((100vw - ${rhythm(24)}) / 2) - ${rhythm(3 / 4)}) ${rhythm(2.5)}
    calc(-1 * ((100vw - ${rhythm(24)}) / 2) - ${rhythm(3 / 4)});

  @media screen and (max-width: ${rhythm(24)}) {
    margin: ${rhythm(1.5)} -${rhythm(3 / 4)};
  }
`

const CoverImage = ({ image }) => (
  <a href={image.publicURL}>
    <StyledImage fluid={image.childImageSharp.fluid} />
  </a>
)

CoverImage.propTypes = {
  image: PropTypes.shape({
    publicURL: PropTypes.string.isRequired,
    childImageSharp: PropTypes.object.isRequired,
  }).isRequired,
}

export default CoverImage

export const query = graphql`
  fragment CoverImage on File {
    publicURL
    childImageSharp {
      fluid(
        maxWidth: 2880
        quality: 75
        srcSetBreakpoints: [
          640
          750
          828
          1080
          1125
          1242
          1536
          1668
          2048
          2304
          2560
          2880
        ]
      ) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`
