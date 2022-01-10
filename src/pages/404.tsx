import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SiteQuery } from '../interfaces';
import Layout from '../components/Layout/Layout';
import SEO from '../components/Head/SEO';

const ErrorPage: React.FC = () => {
  const { site } = useStaticQuery<SiteQuery>(graphql`
    query {
      site {
        siteMetadata {
          error404
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO pageTitle={site.siteMetadata.error404} />
      <h2>{site.siteMetadata.error404}</h2>
    </Layout>
  );
};

export default ErrorPage;
