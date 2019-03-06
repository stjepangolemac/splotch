import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title, image, alt }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  console.log(alt)

  const metaDescription = description || site.siteMetadata.description
  const metas = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ].concat(meta)

  if (keywords.length) {
    metas.push({
      name: `keywords`,
      content: keywords.join(`, `),
    })
  }
  if (image) {
    metas.push({
      name: `twitter:image`,
      content: image.fixed.src,
    })
  }
  if (alt) {
    metas.push({
      name: `twitter:image:alt`,
      content: alt,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={metas}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  alt: PropTypes.string,
}

export default SEO

export const query = graphql`
  fragment SEOImage on File {
    alt: name
    image: childImageSharp {
      fixed(
        width: 144
        height: 144
        quality: 50
        toFormat: WEBP
        cropFocus: ATTENTION
      ) {
        src
      }
    }
  }
`
