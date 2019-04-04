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
      ${!props.disabled && 'border-bottom: 2px solid white;'}
      ${props.error && `border-bottom-color: ${props.theme.robinhoodRed};`}
    `}
`;

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

function range(start, end) {
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
}

const Select = styled.select`
  border: none;
  border-radius: 0;
  background-color: ${props => props.theme.darkerRobinhoodBlack};
  color: white;
  -webkit-text-fill-color: white;
  appearance: none;
  height: 2.5rem;
  width: 3rem;
  text-align: center;
  text-align-last: center;

  ${props =>
    css`
      ${props.small && 'width: 3rem;'}
      ${props.error && `border-bottom-color: ${props.theme.robinhoodRed};`}
      ${!props.disabled && 'border-bottom: 2px solid white;'}
    `}
`;

export default function Workout({
  initialName = '',
  initialSets = 5,
  initialReps = 5,
  initialWeight = '',
  deleteHandler,
}) {
  const [name, setName] = useState(initialName);
  const [sets, setSets] = useState(initialSets);
  const [reps, setReps] = useState(initialReps);
  const [weight, setWeight] = useState(initialWeight);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(initialName === '');
  const [trashClicked, setTrashClicked] = useState(false);

  const nameRef = React.createRef();
  const weightRef = React.createRef();

  function handleSubmit(event) {
    event.stopPropagation();

    if (!name) {
      setError(true);
      nameRef.current.focus();
      return;
    }

    if (!weight) {
      setError(true);
      weightRef.current.focus();
      return;
    }

    setError(false);
    setEditing(false);
  }

  return (
    <Card>
      <CardHeader>
        {!editing && (
          <Trash
            trashClicked={trashClicked}
            onClick={() => {
              if (trashClicked) {
                deleteHandler();
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
            disabled={!editing}
            value={name}
            onClick={e => e.stopPropagation()}
            onChange={e => setName(e.target.value)}
            onFocus={e => e.target.select()}
            error={error && !name}
          />
        </CardTitle>
        {!editing && <Edit onClick={() => setEditing(true)} />}
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardLabel>Sets</CardLabel>
          <Select
            disabled={!editing}
            value={sets}
            onChange={e => setSets(e.target.value)}
          >
            {range(1, 10).map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </CardContent>
        <CardContent>
          <CardLabel>Reps</CardLabel>
          <Select
            disabled={!editing}
            value={reps}
            onChange={e => setReps(e.target.value)}
          >
            {range(1, 10).map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </CardContent>
        <CardContent>
          <CardLabel>Weight</CardLabel>
          <Input
            type="number"
            small
            ref={weightRef}
            value={weight}
            onChange={e => setWeight(e.target.value)}
            disabled={!editing}
            pattern="[0-9]*"
            error={error && !weight}
          />
        </CardContent>
      </CardBody>
      {editing && (
        <Buttons>
          <DoneButton onClick={handleSubmit}>Done</DoneButton>
          <DeleteButton onClick={deleteHandler}>Delete</DeleteButton>
        </Buttons>
      )}
    </Card>
  );
}
