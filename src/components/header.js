import styled, { css } from 'styled-components';

const Header = styled.header`
  margin: 1rem;
  font-weight: 550;
  text-align: center;

  ${props =>
    props.medium &&
    css`
      font-size: 1.35rem;
    `}
`;

export default Header;
