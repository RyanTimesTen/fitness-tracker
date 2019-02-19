import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Workout from '../components/Workout';
import session from '../session';
import colors from '../utils/colors';

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
        </Section>
      )}

      <FAB to="/new-workout">
        <FontAwesomeIcon icon="plus" />
      </FAB>
    </Layout>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FAB = styled(Link)`
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
  background-color: ${colors.robinhoodGreen};
  color: white;

  :hover {
    color: white;
  }
`;
