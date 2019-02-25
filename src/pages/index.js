import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Workout from '../components/Workout';
import session from '../session';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from '../components/Card';

const Input = styled.input`
  border: none;
  border-bottom: 2px solid white;
  border-radius: 0;
  background-color: ${props => props.theme.darkerRobinhoodBlack};
  color: white;
  appearance: none;
  text-align: center;
  height: 2.5rem;

  ${props =>
    css`
      ${props.small ? 'width: 3rem;' : ''}
      ${props.error ? `border-bottom-color: ${props.theme.robinhoodRed};` : ''}
    `}
`;

const NumberInput = React.forwardRef((props, ref) => (
  <Input
    small
    type="number"
    ref={ref}
    value={props.value}
    onClick={e => e.stopPropagation()}
    onChange={props.onChange}
    error={props.error && !props.value}
  />
));

NumberInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

const Button = styled.button`
  border: 2px solid ${props => props.theme.robinhoodGreen};
  border-radius: 8px;
  background-color: ${props => props.theme.robinhoodGreen};
  color: white;
  width: 7rem;
  height: 3rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Buttons = styled.section`
  width: 85%;
  display: flex;
  justify-content: space-around;
`;

const Done = styled(Button)``;

const Cancel = styled(Button)`
  background-color: ${props => props.theme.robinhoodRed};
  border-color: ${props => props.theme.robinhoodRed};
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.robinhoodGreen};
  color: white;

  :hover {
    color: white;
  }
`;

function NewWorkout({ onFinish }) {
  const [name, setName] = useState('');
  const [sets, setSets] = useState(5);
  const [reps, setReps] = useState(5);
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(false);

  const nameRef = React.createRef();
  const setsRef = React.createRef();
  const repsRef = React.createRef();
  const weightRef = React.createRef();

  function handleSubmit(event) {
    event.stopPropagation();

    for (let [state, ref] of [
      [name, nameRef],
      [sets, setsRef],
      [reps, repsRef],
      [weight, weightRef],
    ]) {
      if (!state) {
        setError(true);
        ref.current.focus();
        return;
      }
    }

    session.addWorkout({ id: name, display: name, sets, reps, weight });
    onFinish();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Input
            autoFocus
            type="text"
            ref={nameRef}
            placeholder="New Workout"
            value={name}
            onClick={e => e.stopPropagation()}
            onChange={e => setName(e.target.value)}
            onFocus={e => e.target.select()}
            error={error && !name}
          />
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardLabel>Sets</CardLabel>
          <NumberInput
            ref={setsRef}
            value={sets.toString()}
            onChange={e => setSets(e.target.value)}
            error={error && !sets}
          />
        </CardContent>
        <CardContent>
          <CardLabel>Reps</CardLabel>
          <NumberInput
            ref={repsRef}
            value={reps.toString()}
            onChange={e => setReps(e.target.value)}
            error={error && !reps}
          />
        </CardContent>
        <CardContent>
          <CardLabel>Weight</CardLabel>
          <NumberInput
            ref={weightRef}
            value={weight}
            onChange={e => setWeight(e.target.value)}
            pattern="[0-9]*"
            error={error && !weight}
          />
        </CardContent>
      </CardBody>
      <Buttons>
        <Done onClick={handleSubmit}>Done</Done>
        <Cancel onClick={onFinish}>Cancel</Cancel>
      </Buttons>
    </Card>
  );
}

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
        : !creatingNewWorkout && (
            <HeaderWrapper>
              <Header small>It's pretty empty in here</Header>
            </HeaderWrapper>
          )}

      {creatingNewWorkout && (
        <NewWorkout onFinish={() => setCreatingNewWorkout(false)} />
      )}

      <FAB onClick={() => setCreatingNewWorkout(true)}>
        <FontAwesomeIcon icon="plus" />
      </FAB>
    </Layout>
  );
}
