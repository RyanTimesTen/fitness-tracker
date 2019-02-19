import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled, { createGlobalStyle } from 'styled-components';
import SiteHeader from './SiteHeader';
import colors from '../utils/colors';

library.add(faPlus);

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <SiteHeader siteTitle={data.site.siteMetadata.title} />
        <GlobalStyle />
        <Wrapper>{children}</Wrapper>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.robinhoodBlack};
  }
`;

export default Layout;
