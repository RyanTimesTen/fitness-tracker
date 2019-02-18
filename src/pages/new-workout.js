import React, { useState } from 'react';
import { navigate } from 'gatsby';
import styled, { css } from 'styled-components';
import Layout from '../components/Layout';
import session from '../session';
import {
  Card,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from '../components/Card';
import Header from '../components/Header';

export default function NewWorkoutPage() {
  return (
    <Layout>
      <Header medium>Sup, add a new workout bb</Header>
      {session.presetWorkouts.map(workout => (
        <NewWorkout
          key={workout.id}
          id={workout.id}
          display={workout.display}
        />
      ))}
    </Layout>
  );
}

function NewWorkout({ id, display }) {
  const [showInput, setShowInput] = useState(false);
  const [sets, setSets] = useState(5);
  const [reps, setReps] = useState(5);
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(false);
  const weightRef = React.createRef();

  function handleSubmit(event) {
    event.stopPropagation();

    if (!weight) {
      setError(true);
      weightRef.current.focus();
      return;
    }

    session.addWorkout({ id, display, sets, reps, weight });
    navigate('/');
  }

  return (
    <Card onClick={() => setShowInput(!showInput)}>
      <CardTitle>{display}</CardTitle>
      {showInput && (
        <>
          <CardBody>
            <CardContent>
              <CardLabel htmlFor="sets">Sets</CardLabel>
              <Input
                type="number"
                value={sets}
                onClick={e => e.stopPropagation()}
                onChange={e => setSets(e.target.value)}
              />
            </CardContent>
            <CardContent>
              <CardLabel htmlFor="reps">Reps</CardLabel>
              <Input
                type="number"
                value={reps}
                onClick={e => e.stopPropagation()}
                onChange={e => setReps(e.target.value)}
                name="reps"
              />
            </CardContent>
            <CardContent>
              <CardLabel htmlFor="weight">Weight</CardLabel>
              <Input
                autoFocus
                ref={weightRef}
                type="number"
                value={weight}
                onClick={e => e.stopPropagation()}
                onChange={e => setWeight(e.target.value)}
                name="weight"
                width="medium"
                error={error}
              />
            </CardContent>
          </CardBody>
          <Button onClick={handleSubmit}>Add</Button>
        </>
      )}
    </Card>
  );
}

const Input = styled.input`
  border: none;
  border-bottom: 2px solid black;
  border-radius: 0;
  appearance: none;
  text-align: right;
  width: 2rem;
  height: 2rem;

  ${props =>
    css`
      ${props.width === 'medium' ? 'width: 3rem;' : ''}
      ${props.error ? 'border-bottom-color: red;' : ''}
    `}
`;

const Button = styled.button`
  border: 2px solid palevioletred;
  border-radius: 8px;
  background-color: palevioletred;
  color: white;
  width: 17rem;
`;
