import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import faunadb from 'faunadb';
import { SiteQuery, Resources, Resource } from '../interfaces/';
import { FaunaIndex, AnchorVariant } from '../enums/';
import Layout from '../components/Layout/Layout';
import SEO from '../components/Head/SEO';
import Form from '../components/Form';
import Anchor from '../components/Anchor';
import { Paragraph, Heading } from '../emotion/typography';
import GatsbyIcon from '../assets/svg/gatsby.svg';

const IndexPage: React.FC = () => {
  const { site } = useStaticQuery<SiteQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          errorMessage
        }
      }
    }
  `);
  const [token, setToken] = useState<string>('');
  const [resources, setResources] = useState();

  useEffect(() => {
    if (token) {
      const q = faunadb.query;
      const userClient = new faunadb.Client({
        secret: token,
      });

      userClient
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index(FaunaIndex.ALL_RESOURCES))),
            q.Lambda((x: any) => q.Get(x))
          )
        )
        .then((reponse: Resources) => {
          setResources(reponse.data);
        })
        .catch((error: {}) => console.error(error));
    }
  }, [token]);

  const renderForm = () => {
    return (
      <React.Fragment>
        <GatsbyIcon />
        <Form
          setToken={setToken}
          errorMessage={site.siteMetadata.errorMessage}
        />
      </React.Fragment>
    );
  };

  const renderResources = () => {
    return (
      <React.Fragment>
        <Heading>Resources</Heading>
        <ul>
          {resources.map((resource: Resource, key: number) => (
            <li key={key}>
              <Anchor
                title={resource.data.title}
                url={resource.data.url}
                variant={AnchorVariant.EXTERNAL}
              >
                {resource.data.title}
              </Anchor>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <SEO pageTitle={site.siteMetadata.title} />
      <Paragraph>{site.siteMetadata.description}</Paragraph>
      {!token ? renderForm() : resources && renderResources()}
    </Layout>
  );
};

export default IndexPage;
