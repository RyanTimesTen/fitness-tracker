import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = styled.input`
  border: none;
  border-radius: 0;
  background-color: ${props => props.theme.darkerRobinhoodBlack};
  color: white;
  -webkit-text-fill-color: white;
  opacity: 1;
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

const DoneButton = styled(Button)``;

const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.robinhoodRed};
  border-color: ${props => props.theme.robinhoodRed};
`;

const IconWrapper = styled.button`
  background-color: ${props => props.theme.darkerRobinhoodBlack};
  border: none;
  color: ${props => (props.red ? props.theme.robinhoodRed : 'white')};
`;

function Trash({ trashClicked, onClick }) {
  return (
    <IconWrapper red={trashClicked} onClick={onClick}>
      <FontAwesomeIcon icon={trashClicked ? 'times' : 'trash-alt'} size="lg" />
    </IconWrapper>
  );
}

function Edit({ onClick }) {
  return (
    <IconWrapper onClick={onClick}>
      <FontAwesomeIcon icon="pencil-alt" size="lg" />
    </IconWrapper>
  );
}

export default function Workout({
  name = '',
  sets = 5,
  reps = 5,
  weight = '',
  onDelete,
}) {
  const [currentName, setCurrentName] = useState(name);
  const [currentSets, setSets] = useState(sets);
  const [currentReps, setReps] = useState(reps);
  const [currentWeight, setWeight] = useState(weight);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(name === '');
  const [trashClicked, setTrashClicked] = useState(false);

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

    setIsEditing(false);
  }

  return (
    <Card>
      <CardHeader>
        {!isEditing && (
          <Trash
            trashClicked={trashClicked}
            onClick={() => {
              if (trashClicked) {
                onDelete();
              } else {
                setTrashClicked(true);
              }
            }}
          />
        )}
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
        {!isEditing && <Edit onClick={() => setIsEditing(true)} />}
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
          <DoneButton onClick={handleSubmit}>Done</DoneButton>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        </Buttons>
      )}
    </Card>
  );
}
