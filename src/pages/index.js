import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/layout';
import WorkoutManager from '../WorkoutManager';

export default function IndexPage() {
  return (
    <Layout>
      <Header>Your Current Session</Header>
      {WorkoutManager.workouts.map(workout => (
        <p key={workout.id}>
          {workout.display}&#58; {workout.weight}
        </p>
      ))}
      <FAB to="/new-workout">
        <FontAwesomeIcon icon="plus" />
      </FAB>
    </Layout>
  );
}

const Header = styled.h2`
  margin: 1rem;
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
