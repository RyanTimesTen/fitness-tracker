import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Workout from '../components/Workout';

const FAB = styled.button`
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.robinhoodGreen};
  color: white;

  :hover {
    color: white;
  }
`;

export default function IndexPage() {
  const [session, setSession] = useState([]);
  const [lastWorkoutId, setLastWorkoutId] = useState(0);

  return (
    <Layout>
      <Header medium margin="1rem">
        Your Current Session
      </Header>
      {session.length > 0 ? (
        session.map((workout, index) => (
          <Workout
            key={index}
            name={workout.name}
            sets={workout.sets}
            reps={workout.reps}
            weight={workout.weight}
            session={session}
            onDelete={() =>
              setSession([...session.filter(w => w.id !== workout.id)])
            }
          />
        ))
      ) : (
        <Header small margin="2rem">
          It's pretty empty in here
        </Header>
      )}

      <FAB
        onClick={() => {
          setSession([
            ...session,
            {
              id: lastWorkoutId,
              name: '',
              sets: 5,
              reps: 5,
              weight: '',
            },
          ]);
          setLastWorkoutId(lastWorkoutId + 1);
        }}
      >
        <FontAwesomeIcon icon="plus" />
      </FAB>
    </Layout>
  );
}
