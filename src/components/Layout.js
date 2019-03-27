import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { library as fontAwesomeIcons } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faTrashAlt,
  faPencilAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import SiteHeader from './SiteHeader';

fontAwesomeIcons.add([
  faPlus,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faTrashAlt,
  faPencilAlt,
  faTimes,
]);

const theme = {
  robinhoodBlack: '#1b1b1c',
  darkerRobinhoodBlack: '#252525',
  darkRobinhoodBorderBlack: '#0e0d0d',
  robinhoodGreen: '#00ce9a',
  robinhoodRed: '#ec532f',
};

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.robinhoodBlack};
  }
`;

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
