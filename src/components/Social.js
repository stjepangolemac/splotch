import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ReactComponent as Twitter } from '../../content/assets/twitter.svg'

const Container = styled.div`
  margin: 3rem 0 1.25rem 0;
`

const SocialLink = styled.a`
  display: inline-flex;

  transition: transform ease-in-out 200ms;

  &:hover,
  &:active {
    background-size: 0% 0;

    transform: scale(1.2) rotateZ(15deg);
  }
`

const Social = ({ title, url, hashtags }) => {
  const hashes = ['splotch', ...hashtags]

  return (
    <Container>
      <p>
        <strong>One last thing...</strong> If you like this post be sure to
        share it!
      </p>
      <SocialLink
        target="_blank"
        rel="noopener noreferrer nofollow"
        href={`https://twitter.com/share?text=${title}&url=${url}${
          hashes.length ? `&hashtags=${hashes.join(',')}` : ''
        }`}
      >
        <Twitter height={50} width={50} />
      </SocialLink>
    </Container>
  )
}

Social.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string),
}

Social.defaultProps = {
  hashtags: [],
}

export default Social
