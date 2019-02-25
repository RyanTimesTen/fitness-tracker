import styled from 'styled-components';

const Header = styled.header`
  margin: ${props => props.margin || '0'};
  font-weight: 550;
  text-align: center;
  color: white;

  font-size: ${props =>
    props.large ? '1.8rem' : props.medium ? '1.35rem' : '1rem'};
`;

export default Header;
