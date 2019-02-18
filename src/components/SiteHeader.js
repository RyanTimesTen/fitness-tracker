import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Header from './header';

const SiteHeader = ({ siteTitle }) => (
  <div
    style={{
      background: `palevioletred`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <Header large thin>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Header>
    </div>
  </div>
);

SiteHeader.propTypes = {
  siteTitle: PropTypes.string,
};

SiteHeader.defaultProps = {
  siteTitle: ``,
};

export default SiteHeader;
