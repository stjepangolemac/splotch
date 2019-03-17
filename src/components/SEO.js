import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  twitterImage,
  facebookImage,
  alt,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  console.log(facebookImage)

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
      property: `og:site_name`,
      content: site.siteMetadata.title,
    },
    {
      property: `og:url`,
      content: site.siteMetadata.siteUrl,
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
      property: `twitter:site`,
      content: site.siteMetadata.title,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
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
  if (twitterImage) {
    metas.push({
      name: `twitter:image`,
      content: `${site.siteMetadata.siteUrl}${twitterImage.fixed.src}`,
    })
  }
  if (facebookImage) {
    metas.push({
      name: `og:image`,
      content: `${site.siteMetadata.siteUrl}${facebookImage.fixed.src}`,
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
        prefix: 'og: http://ogp.me/ns#',
      }}
      title={title}
      titleTemplate={`%s • ${site.siteMetadata.title}`}
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
  twitterImage: PropTypes.object,
  facebookImage: PropTypes.object,
  alt: PropTypes.string,
}

export default SEO

export const query = graphql`
  fragment SEOImage on File {
    alt: name
    twitterImage: childImageSharp {
      fixed(
        width: 600
        height: 314
        quality: 75
        toFormat: WEBP
        cropFocus: ATTENTION
      ) {
        src
      }
    }
    facebookImage: childImageSharp {
      fixed(
        width: 1200
        height: 627
        quality: 75
        toFormat: JPG
        cropFocus: ATTENTION
      ) {
        src
      }
    }
  }
`
