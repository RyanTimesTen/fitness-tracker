import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';

const HeaderWrapper = styled.div`
  background: #00ce9a;
  margin-bottom: 1.45rem;
  padding: 1rem 1.0875rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export default function SiteHeader({ siteTitle }) {
  return (
    <HeaderWrapper>
      <Header large thin>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </Header>
    </HeaderWrapper>
  );
}

SiteHeader.propTypes = {
  siteTitle: PropTypes.string,
};

SiteHeader.defaultProps = {
  siteTitle: ``,
};
