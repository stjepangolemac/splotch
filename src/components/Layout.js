import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { rhythm, scale } from '../utils/typography'

const Container = styled.div`
  margin: 0 auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`
const StyledLink = styled(({ inheritColor, ...props }) => <Link {...props} />)`
  box-shadow: none;
  text-decoration: none;

  ${({ inheritColor }) => (inheritColor ? { color: 'inherit' } : {})};
`
const Heading = styled.h1`
  margin-top: 0;

  ${({ large }) =>
    large
      ? { ...scale(1.5), marginBottom: rhythm(1.5) }
      : { ...scale(2 / 3), marginBottom: rhythm(2 / 3) }};

  transform: scale(1);
  transition: transform ease-in-out 200ms;

  &:hover {
    transform: scale(1.01);
  }
`

const Layout = props => {
  const { location, title, children } = props
  const isRoot = location.pathname === '/'

  return (
    <Container>
      <header>
        <Heading large={isRoot}>
          <StyledLink inheritColor={isRoot} to={`/`} title="Home">
            {title}
          </StyledLink>
        </Heading>
      </header>
      <main>{children}</main>
      <footer>
        <small>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org" title="Gatsby homepage">
            Gatsby
          </a>
        </small>
      </footer>
    </Container>
  )
}

export default Layout
