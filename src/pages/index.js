import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import Header from '../components/Header';
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
  border-radius: 0;
  background-color: ${props => props.theme.darkerRobinhoodBlack};
  color: white;
  appearance: none;
  text-align: center;
  height: 2.5rem;

  ${props =>
    css`
      ${props.small && 'width: 3rem;'}
      ${props.error && `border-bottom-color: ${props.theme.robinhoodRed};`}
      ${!props.disabled && 'border-bottom: 2px solid white;'}
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
    disabled={props.disabled}
    error={props.error && !props.value}
  />
));

NumberInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
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

function NewWorkout({
  name = '',
  sets = 5,
  reps = 5,
  weight = '',
  session,
  setSession,
  onDoneEditing,
}) {
  console.log(name);
  const [currentName, setCurrentName] = useState(name);
  const [currentSets, setSets] = useState(sets);
  const [currentReps, setReps] = useState(reps);
  const [currentWeight, setWeight] = useState(weight);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(name === '');

  const nameRef = React.createRef();
  const setsRef = React.createRef();
  const repsRef = React.createRef();
  const weightRef = React.createRef();

  function handleSubmit(event) {
    event.stopPropagation();

    for (let [state, ref] of [
      [currentName, nameRef],
      [currentSets, setsRef],
      [currentReps, repsRef],
      [currentWeight, weightRef],
    ]) {
      if (!state) {
        setError(true);
        ref.current.focus();
        return;
      }
    }

    setSession([
      ...session,
      {
        name: currentName,
        sets: currentSets,
        reps: currentReps,
        weight: currentWeight,
      },
    ]);
    onDoneEditing();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Input
            autoFocus
            type="text"
            ref={nameRef}
            placeholder="Workout Name"
            disabled={!isEditing}
            value={currentName}
            onClick={e => e.stopPropagation()}
            onChange={e => setCurrentName(e.target.value)}
            onFocus={e => e.target.select()}
            error={error && !currentName}
          />
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardLabel>Sets</CardLabel>
          <NumberInput
            ref={setsRef}
            value={currentSets.toString()}
            onChange={e => setSets(e.target.value)}
            disabled={!isEditing}
            error={error && !currentSets}
          />
        </CardContent>
        <CardContent>
          <CardLabel>Reps</CardLabel>
          <NumberInput
            ref={repsRef}
            value={currentReps.toString()}
            onChange={e => setReps(e.target.value)}
            disabled={!isEditing}
            error={error && !reps}
          />
        </CardContent>
        <CardContent>
          <CardLabel>Weight</CardLabel>
          <NumberInput
            ref={weightRef}
            value={currentWeight}
            onChange={e => setWeight(e.target.value)}
            disabled={!isEditing}
            pattern="[0-9]*"
            error={error && !weight}
          />
        </CardContent>
      </CardBody>
      {isEditing && (
        <Buttons>
          <Done onClick={handleSubmit}>Done</Done>
          <Cancel onClick={onDoneEditing}>Cancel</Cancel>
        </Buttons>
      )}
    </Card>
  );
}

export default function IndexPage() {
  const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
  const [session, setSession] = useState([]);
  console.log(session.length);
  return (
    <Layout>
      <Header medium>Your Current Session</Header>
      {session.length > 0
        ? session.map((workout, index) => (
            <NewWorkout
              key={index}
              name={workout.name}
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
        <NewWorkout
          onDoneEditing={() => setCreatingNewWorkout(false)}
          session={session}
          setSession={setSession}
        />
      )}

      <FAB onClick={() => setCreatingNewWorkout(true)}>
        <FontAwesomeIcon icon="plus" />
      </FAB>
    </Layout>
  );
}
