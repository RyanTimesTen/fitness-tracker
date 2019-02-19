import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Workout from '../components/Workout';
import session from '../session';

export default function IndexPage() {
  return (
    <Layout>
      <Header medium>Your Current Session</Header>
      {session.workouts.length > 0 ? (
        session.workouts.map(workout => (
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
          <Header small>It's pretty empty in here</Header>
          <NewWorkoutLink to="/new-workout">Add a workout!</NewWorkoutLink>
        </Section>
      )}

      {session.workouts.length > 0 && (
        <FAB to="/new-workout">
          <FontAwesomeIcon icon="plus" />
        </FAB>
      )}
    </Layout>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  background-color: #00ce9a;
  color: white;
`;

const NewWorkoutLink = styled(StyledLink)`
  border: 2px solid #00ce9a;
  border-radius: 8px;
  background-color: #00ce9a;
  color: white;
  width: 17rem;
  text-align: center;
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

  :hover {
    color: white;
  }
`;
