import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import WorkoutManager from '../WorkoutManager';
import {
  Card,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from '../components/Card';
import Header from '../components/Header';

export default function IndexPage() {
  return (
    <Layout>
      <Header medium>Your Current Session</Header>
      {WorkoutManager.workouts.length > 0 ? (
        WorkoutManager.workouts.map(workout => (
          <Workout
            key={workout.id}
            display={workout.display}
            sets={workout.sets}
            reps={workout.reps}
            weight={workout.weight}
          />
        ))
      ) : (
        <Section>
          <Header>It's pretty empty in here</Header>
          <NewWorkoutLink to="/new-workout">Add a workout!</NewWorkoutLink>
        </Section>
      )}

      {WorkoutManager.workouts.length > 0 && (
        <FAB to="/new-workout">
          <FontAwesomeIcon icon="plus" />
        </FAB>
      )}
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

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  background-color: palevioletred;
  color: white;
`;

const NewWorkoutLink = styled(StyledLink)`
  border: 2px solid palevioletred;
  border-radius: 8px;
  background-color: palevioletred;
  color: white;
  width: 17rem;
  text-align: center;
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

const FAB = styled(StyledLink)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  border-radius: 50%;
  border: none;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    color: white;
  }
`;
