require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Fauna Resources',
    siteUrl: 'https://fauna-authentication.vercel.app/',
    description: 'User authentication with FaunaDB and GatsbyJS',
    author: 'Lucas Johnson',
    language: 'en',
    banner: {
      image: '',
      alt: '',
    },
    logo: {
      image: '',
      alt: '',
    },
    social: {
      twitter: {
        username: '@_lucasjohnson',
        url: 'https://twitter.com/_lucasjohnson',
        title: 'Twitter',
      },
      github: {
        username: 'lucasjohnson',
        url: 'https://github.com/lucasjohnson/fauna-authentication',
        title: 'GitHub',
      },
    },
    error404: '404: Page not found',
    errorMessage: 'Your form has errors',
    resources: 'Resources',
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `User authentication with FaunaDB and GatsbyJS`,
        short_name: `Fauna Resources`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/assets/images/icon.png`,
        crossOrigin: `use-credentials`,
        cache_busting_mode: `none`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
          options: {
            props: {
              className: 'svg',
            },
          },
        },
      },
    },
  ],
};
