import Typography from 'typography'
import gray from 'gray-percentage'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: '1.75',
  scaleRatio: 2.5,
  spacing: '1.00',
  headerFontFamily: ['Fredoka One', 'Comic Sans MS', 'sans-serif'],
  headerWeight: '400',
  headerColor: 'hsla(0, 0%, 15%, 1)',
  bodyFontFamily: ['Merriweather', 'Times New Roman', 'serif'],
  bodyWeight: '400',
  boldWeight: '700',
  bodyColor: 'hsla(0, 0%, 10%, 1)',
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    blockquote: {
      ...scale(1 / 5),
      color: gray(41),
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: rhythm(-1),
      borderLeft: `${rhythm(3 / 16)} solid ${gray(10)}`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    ul: {
      listStyle: 'disc',
    },
    'ul,ol': {
      marginLeft: 0,
    },
    [MOBILE_MEDIA_QUERY]: {
      'ul,ol': {
        marginLeft: rhythm(1),
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(2),
    },
    h4: {
      letterSpacing: '0.140625em',
      textTransform: 'uppercase',
    },
    h6: {
      fontStyle: 'italic',
    },
    a: {
      color: '#d43900',
      textDecoration: 'none',
      backgroundImage: 'linear-gradient(currentColor, currentColor)',
      backgroundPosition: '0% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '0% 0.1em',
      transition: 'background-size ease-in-out 200ms',
    },
    'a:hover,a:active': {
      backgroundSize: '100% 0.1em',
    },
    'mark,ins': {
      background: '#007acc',
      color: 'white',
      padding: `${rhythm(1 / 16)} ${rhythm(1 / 8)}`,
      textDecoration: 'none',
    },
  }),
  overrideThemeStyles: () => {
    return {
      'a.gatsby-resp-image-link': {
        margin: `${typography.rhythm(1.5)} -${typography.rhythm(3 / 4)}`,
        backgroundImage: 'unset',
      },
      'a.gatsby-resp-image-link:hover,a.gatsby-resp-image-link:focus': {
        backgroundSize: 'unset',
      },
    }
  },
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
