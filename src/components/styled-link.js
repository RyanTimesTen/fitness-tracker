import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

const StyledLink = styled(Link)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `}
`;

export default StyledLink;
