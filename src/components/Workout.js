import React from 'react';
import styled, { css } from 'styled-components';
import {
  Card,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from '../components/Card';

export default function Workout({ display, sets, reps, weight }) {
  return (
    <Card>
      <CardTitle>{display}</CardTitle>
      <CardBody>
        <CardContent>
          <CardLabel>Sets</CardLabel>
          <Value>{sets}</Value>
        </CardContent>
        <CardContent>
          <CardLabel>Reps</CardLabel>
          <Value>{reps}</Value>
        </CardContent>
        <CardContent>
          <CardLabel>Weight</CardLabel>
          <Value width="medium">{weight}</Value>
        </CardContent>
      </CardBody>
    </Card>
  );
}

const Value = styled.span`
  display: inline-block;
  border: none;
  text-align: right;
  width: 2rem;
  height: 2rem;

  ${props =>
    props.width === 'medium' &&
    css`
      width: 3rem;
    `}
`;
