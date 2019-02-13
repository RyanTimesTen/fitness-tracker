import React from 'react';
import styled, { css } from 'styled-components';
import StyledLink from '../components/styled-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Layout from '../components/layout';
import WorkoutManager from '../WorkoutManager';
import PlusIcon from '../assets/plus.svg';
import SvgIcon from '../components/svg-icon';

const IndexPage = () => (
  <Layout>
    <Header>Your Current Session</Header>
    {WorkoutManager.workouts.map(workout => (
      <p key={workout.id}>
        {workout.display}&#58; {workout.weight}
      </p>
    ))}
    <FAB primary to="/new-workout">
      <FontAwesomeIcon icon="igloo" />
    </FAB>
  </Layout>
);

const FAB = styled(StyledLink)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

const Header = styled.h2`
  margin: 1rem;
`;

export default IndexPage;
