import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import session from '../session';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from '../components/Card';
import Header from '../components/Header';
import colors from '../utils/colors';

export default function NewWorkoutPage() {
  return (
    <Layout>
      <HeaderWrapper>
        <Header medium>
          <BackButton />
          Add a new activity
        </Header>
      </HeaderWrapper>
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

const HeaderWrapper = styled(Header)`
  margin: 0;
  a {
    float: left;
  }
`;

function BackButton() {
  return (
    <Link to="/">
      <Chevron direction="left" />
    </Link>
  );
}

function NewWorkout({ id, display }) {
  const [showInput, setShowInput] = useState(false);
  const [sets, setSets] = useState(5);
  const [reps, setReps] = useState(5);
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(false);
  const [direction, setDirection] = useState('right');
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
          <Button onClick={handleSubmit}>Add</Button>
        </>
      )}
    </Card>
  );
}

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

const Button = styled.button`
  border: 2px solid ${colors.robinhoodGreen};
  border-radius: 8px;
  background-color: ${colors.robinhoodGreen};
  color: white;
  width: 17rem;
  height: 3rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
