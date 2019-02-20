import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Workout from '../components/Workout';
import session from '../session';
import colors from '../utils/colors';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from '../components/Card';

export default function IndexPage() {
  const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
  return (
    <Layout>
      <Header medium>Your Current Session</Header>
      {session.workouts.length > 0
        ? session.workouts.map(workout => (
            <Workout
              key={workout.id}
              display={workout.display}
              sets={workout.sets}
              reps={workout.reps}
              weight={workout.weight}
            />
          ))
        : creatingNewWorkout || (
            <HeaderWrapper>
              <Header small>It's pretty empty in here</Header>
            </HeaderWrapper>
          )}

      {creatingNewWorkout && (
        <NewWorkout
          id="overhead"
          display="Overhead Press"
          handleCompletion={() => setCreatingNewWorkout(false)}
        />
      )}

      <FAB onClick={() => setCreatingNewWorkout(true)}>
        <FontAwesomeIcon icon="plus" />
      </FAB>
    </Layout>
  );
}

function NewWorkout({ id, display, handleCompletion }) {
  const [showInput, setShowInput] = useState(true);
  const [sets, setSets] = useState(5);
  const [reps, setReps] = useState(5);
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(false);
  const [direction, setDirection] = useState('down');
  const weightRef = React.createRef();

  function handleSubmit(event) {
    event.stopPropagation();

    if (!weight) {
      setError(true);
      weightRef.current.focus();
      return;
    }

    session.addWorkout({ id, display, sets, reps, weight });
    handleCompletion();
  }

  return (
    <Card
      onClick={() => {
        setShowInput(!showInput);
        setDirection(direction === 'right' ? 'down' : 'right');
      }}
    >
      <CardHeader>
        <CardTitle>{display}</CardTitle>
        <Chevron direction={direction} />
      </CardHeader>
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
                pattern="[0-9]*"
                value={weight}
                onClick={e => e.stopPropagation()}
                onChange={e => setWeight(e.target.value)}
                name="weight"
                width="medium"
                error={error}
              />
            </CardContent>
          </CardBody>
          <Buttons>
            <Done onClick={handleSubmit}>Done</Done>
            <Cancel onClick={handleCompletion}>Cancel</Cancel>
          </Buttons>
        </>
      )}
    </Card>
  );
}

const Button = styled.button`
  border: 2px solid ${colors.robinhoodGreen};
  border-radius: 8px;
  background-color: ${colors.robinhoodGreen};
  color: white;
  width: 7rem;
  height: 3rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Buttons = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Done = styled(Button)``;

const Cancel = styled(Button)`
  background-color: ${colors.robinhoodRed};
  border-color: ${colors.robinhoodRed};
`;

function Chevron({ direction }) {
  return <StyledFontAwesomeIcon icon={`chevron-${direction}`} />;
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${colors.robinhoodGreen};
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid white;
  background-color: ${colors.darkerRobinhoodBlack};
  color: white;
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

const HeaderWrapper = styled.section`
  margin: 2rem;
`;

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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: ${colors.robinhoodGreen};
  color: white;

  :hover {
    color: white;
  }
`;
