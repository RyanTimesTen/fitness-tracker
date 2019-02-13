import React, { useState } from 'react';
import { navigate } from 'gatsby';
import styled, { css } from 'styled-components';
import Layout from '../components/layout';
import WorkoutManager from '../WorkoutManager';

export default function NewWorkoutPage() {
  return (
    <Layout>
      <Header>Sup, add a new workout bb</Header>
      {renderPresetWorkouts()}
    </Layout>
  );
}

function renderPresetWorkouts() {
  return WorkoutManager.presetWorkouts.map(workout => (
    <NewWorkout key={workout.id} id={workout.id} display={workout.display} />
  ));
}

function NewWorkout({ id, display }) {
  const [showInput, setShowInput] = useState(false);
  const [sets, setSets] = useState(5);
  const [reps, setReps] = useState(5);
  const [weight, setWeight] = useState(null);
  const [error, setError] = useState(false);
  const weightRef = React.createRef();

  function handleSubmit(event) {
    event.stopPropagation();

    if (!weight) {
      setError(true);
      weightRef.current.focus();
      return;
    }

    WorkoutManager.addWorkout({ id, display, weight });
    navigate('/');
  }

  return (
    <Card onClick={() => setShowInput(!showInput)}>
      <CardTitle>{display}</CardTitle>
      {showInput && (
        <>
          <CardBody>
            <CardInput>
              <Label htmlFor="sets">Sets</Label>
              <Input
                type="number"
                value={sets}
                onClick={e => e.stopPropagation()}
                onChange={e => setSets(e.target.value)}
              />
            </CardInput>
            <CardInput>
              <Label htmlFor="reps">Reps</Label>
              <Input
                type="number"
                value={reps}
                onClick={e => e.stopPropagation()}
                onChange={e => setReps(e.target.value)}
                name="reps"
              />
            </CardInput>
            <CardInput>
              <Label htmlFor="weight">Weight</Label>
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
            </CardInput>
          </CardBody>
          <Button onClick={handleSubmit}>Add</Button>
        </>
      )}
    </Card>
  );
}

const Header = styled.h3`
  margin: 1rem;
`;

const Card = styled.div`
  padding: 1rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.span`
  font-size: 1.25rem;
`;

const CardBody = styled.div``;

const CardInput = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  margin-right: 0.5rem;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid black;
  text-align: center;
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
