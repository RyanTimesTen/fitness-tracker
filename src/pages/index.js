import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/layout';
import WorkoutManager from '../WorkoutManager';
import {
  Card,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from '../components/card';

export default function IndexPage() {
  return (
    <Layout>
      <Header>Your Current Session</Header>
      {WorkoutManager.workouts.map(workout => (
        <Workout
          key={workout.id}
          display={workout.display}
          sets={workout.sets}
          reps={workout.reps}
          weight={workout.weight}
        />
      ))}
      <FAB to="/new-workout">
        <FontAwesomeIcon icon="plus" />
      </FAB>
    </Layout>
  );
}

function Workout({ display, sets, reps, weight }) {
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

const Header = styled.h2`
  margin: 1rem;
`;

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

const FAB = styled(Link)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  border-radius: 50%;
  background-color: palevioletred;
  color: white;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
