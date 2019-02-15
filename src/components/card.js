import styled from 'styled-components';

export const Card = styled.div`
  padding: 1rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

export const CardTitle = styled.span`
  font-size: 1.25rem;
`;

export const CardBody = styled.div``;

export const CardContent = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const CardLabel = styled.label`
  margin-right: 0.5rem;
`;
